import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, code }) => {
  return (
    <div className="codeblock-warp">
        <SyntaxHighlighter language={language} style={coy} showLineNumbers>
            {code} 
        </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
