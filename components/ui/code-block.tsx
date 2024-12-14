import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Check, ClipboardCopy, Code2 } from 'lucide-react';

const CodeBlock = ({
                     code,
                     language = 'jsx',
                     filename = 'Example.jsx',
                     showLineNumbers = true,
                     className = ''
                   }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative my-8 ${className}`}>
      <div className="rounded-lg bg-zinc-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <Code2 size={16} className="text-zinc-400"/>
            <span className="text-sm font-medium text-zinc-400">{filename}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
              {language}
            </span>
          </div>
          <button
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-zinc-800 transition-colors"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400"/>
                <span className="text-xs text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardCopy size={14} className="text-zinc-400"/>
                <span className="text-xs text-zinc-400">Copy code</span>
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <Highlight
          theme={themes.nightOwl}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-4 overflow-x-auto text-sm" style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 text-zinc-600 select-none w-12">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {/* Bottom decoration */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"/>
      </div>
    </div>
  );
};

export default CodeBlock;