"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Module-level so React keeps one subscription instead of resubscribing on every render.
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// An external store, so turning Reduce Motion on or off while the page is open takes effect.
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Survives effect re-runs so the pattern doesn't re-randomize on scroll, theme change or resize.
  const squaresRef = useRef<Float32Array<ArrayBuffer>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const reduceMotion = useReducedMotion();
  const [resolvedColor, setResolvedColor] = useState<string>("rgb(0, 0, 0)");

  const resolveColor = useCallback((colorValue: string | undefined): string => {
    if (typeof window === "undefined") {
      return "rgb(0, 0, 0)";
    }

    const colorToResolve = colorValue || "var(--foreground)";

    if (colorToResolve.startsWith("var(")) {
      const tempEl = document.createElement("div");
      tempEl.style.color = colorToResolve;
      tempEl.style.position = "absolute";
      tempEl.style.visibility = "hidden";
      document.body.appendChild(tempEl);
      const computedColor = window.getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
      return computedColor || "rgb(0, 0, 0)";
    }

    return colorToResolve;
  }, []);

  useEffect(() => {
    const updateColor = () => {
      const resolved = resolveColor(color);
      setResolvedColor(resolved);
    };

    updateColor();

    const observer = new MutationObserver(() => {
      updateColor();
    });

    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [color, resolveColor]);

  const memoizedColor = useMemo(() => {
    const toRGBA = (colorValue: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = colorValue;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(resolvedColor);
  }, [resolvedColor]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: ReturnType<typeof setupCanvas>;
    // With reduced motion, draw one still frame instead of animating forever.

    const draw = () =>
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      gridParams = setupCanvas(canvas, newWidth, newHeight);
      if (squaresRef.current?.length === gridParams.squares.length) {
        gridParams.squares = squaresRef.current;
      } else {
        squaresRef.current = gridParams.squares;
      }
      // Resizing the canvas cleared it; redraw now rather than waiting for the next throttled frame.
      draw();
    };

    updateCanvasSize();

    // Every frame fills one rect per cell (about 130k on a 1080p screen), so redraw at about
    // 15fps. flickerChance is scaled by the real elapsed time, so the flicker rate is unchanged.
    const FRAME_MS = 1000 / 15;
    let lastTime: number | undefined;
    const animate = (time: number) => {
      if (!isInView) return;

      animationFrameId = requestAnimationFrame(animate);
      lastTime ??= time;
      const elapsed = time - lastTime;
      if (elapsed < FRAME_MS) return;
      lastTime = time;

      // Cap the step: after a hidden tab one huge delta would flip every square at once.
      updateSquares(gridParams.squares, Math.min(elapsed, 100) / 1000);
      draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView && !reduceMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView, reduceMotion]);

  return (
    <div ref={containerRef} className={cn(`h-full w-full ${className}`)} {...props}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};
