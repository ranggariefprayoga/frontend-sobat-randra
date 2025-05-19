"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

type Props = {
  lines: string[]; // array of lines (multi-paragraph)
  className?: string;
};

const config = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
};

export default function MathRenderer({ lines, className }: Props) {
  return (
    <MathJaxContext version={3} config={config}>
      <div className={className}>
        {lines.map((line, index) => {
          const parts = line.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);

          return (
            <div key={index} className="mb-2">
              {parts.map((part, idx) => {
                if (/^\$\$[^$]+\$\$/.test(part)) {
                  const formula = part.slice(2, -2);
                  return (
                    <div key={idx} className="my-2">
                      <MathJax dynamic>{`\\[${formula}\\]`}</MathJax>
                    </div>
                  );
                } else if (/^\$[^$]+\$/.test(part)) {
                  const formula = part.slice(1, -1);
                  return (
                    <MathJax key={idx} inline dynamic>
                      {formula}
                    </MathJax>
                  );
                } else {
                  return <span key={idx}>{part}</span>;
                }
              })}
            </div>
          );
        })}
      </div>
    </MathJaxContext>
  );
}
