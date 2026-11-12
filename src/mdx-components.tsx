import { CodeBlock } from "@/components/mdx/code-block";
import { MediaContainer } from "@/components/mdx/media-container";
import type { ComponentProps } from "react";

export const mdxComponents = {
  MediaContainer,
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  hr: (props: ComponentProps<"hr">) => (
    <hr
      className="my-10! h-px w-full border-0 bg-border"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-hidden rounded-xl border border-border">
      <div className="w-full overflow-x-auto">
        <table className="m-0! w-full min-w-full border-separate border-spacing-0" {...props} />
      </div>
    </div>
  ),
} as const;
