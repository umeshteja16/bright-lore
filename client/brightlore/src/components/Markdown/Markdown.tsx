import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

const Markdown = ({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert max-w-none text-base leading-relaxed break-words [&>*]:overflow-visible">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { strict: false }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
