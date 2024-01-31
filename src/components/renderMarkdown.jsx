import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import katex from "katex";
import "katex/dist/katex.min.css";

const KaTeX = ({ math, inline }) => {
  const mathString = String(math); // Convert math to string
  return React.createElement(inline ? "span" : "div", {
    dangerouslySetInnerHTML: {
      __html: katex.renderToString(mathString, { throwOnError: false }),
    },
  });
};

const RenderMarkdown = ({ childrenRender, className = "" }) => {
  return (
    <ReactMarkdown
      children={childrenRender}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        math: ({ value }) => <KaTeX math={value} />,
        inlineMath: ({ value }) => <KaTeX math={value} inline />,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {children}
          </a>
        ),
        paragraph: ({ node, ...props }) => {
          if (
            node.children &&
            node.children.length === 1 &&
            node.children[0].type === "inlineMath"
          ) {
            // Check if the paragraph contains only inline math
            return <KaTeX math={node.children[0].value} />;
          }
          return <p {...props}>{props.children}</p>;
        },
      }}
      className={className}
    />
  );
};

export default RenderMarkdown;
