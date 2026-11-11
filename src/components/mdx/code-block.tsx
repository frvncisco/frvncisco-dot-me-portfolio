"use client";

import { useState, useRef, useEffect, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre">;

function extractLanguage(className?: string): string {
  if (!className) return "plaintext";
  const match = className.match(/language-([a-z0-9-]+)/i);
  return match ? match[1] : "plaintext";
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const [{ html, className, title }, setRenderState] = useState<{
    html: string;
    className: string;
    title: string | null;
  }>({ html: "", className: "", title: null });
  const preRef = useRef<HTMLPreElement>(null);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      clearTimeout(copyResetRef.current ?? undefined);
      clearTimeout(announceRef.current ?? undefined);
    },
    [],
  );

  useEffect(() => {
    const pre = preRef.current;
    const codeEl = pre?.querySelector("code");
    if (!pre || !codeEl) return;

    const codeText = codeEl.textContent || "";
    const lang = extractLanguage(codeEl.className);
    const nextTitle = codeEl.getAttribute("data-title");
    const nextClassName = codeEl.className || "";

    void codeToHtml(codeText, {
      lang: lang as any,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        setRenderState({
          html: doc.querySelector("code")?.innerHTML ?? "",
          className: nextClassName,
          title: nextTitle,
        });
      })
      .catch((error) => {
        console.error("Failed to highlight code:", error);
        setRenderState({ html: "", className: nextClassName, title: nextTitle });
      });
  }, [children]);

  // Screen readers only announce a live region when its text changes, so clear it first and
  // set the message a moment later. Otherwise a second copy within 2s would be silent.
  const announce = (message: string) => {
    setStatus("");
    clearTimeout(announceRef.current ?? undefined);
    announceRef.current = setTimeout(() => setStatus(message), 100);
  };

  const handleCopy = async () => {
    // Read from <code>, not <pre>: the <pre> also holds the title bar.
    const code = preRef.current?.querySelector("code")?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      announce("Copied to clipboard");
      // Restart the timer on repeat clicks so the check stays for 2s after the last copy.
      clearTimeout(copyResetRef.current ?? undefined);
      copyResetRef.current = setTimeout(() => {
        setCopied(false);
        setStatus("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      announce("Couldn't copy code");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border">
      <pre ref={preRef} {...props} className={cn("m-0! overflow-x-auto p-0!", props.className)}>
        {title && (
          <div className="rounded-t-xl border-b border-border bg-muted/50 p-3 text-xs font-medium text-foreground">
            {title}
          </div>
        )}

        <Button
          onClick={handleCopy}
          variant="outline"
          size="icon"
          className={cn(
            "absolute right-3 size-8 cursor-pointer rounded-md border border-border text-primary opacity-100 shadow-none transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100",
            title ? "top-13" : "top-3",
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
        {html && (
          <div className="p-3">
            <code className={`shiki ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}

        {!html && <div className="p-4">{children}</div>}
      </pre>
      {/* Always mounted so screen readers pick up the text change. */}
      <span role="status" className="sr-only">
        {status}
      </span>
    </div>
  );
}
