import React, { useEffect, useRef } from "react";

interface LatexRendererProps {
  latexStrings: string[];
  className?: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ latexStrings, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      window.MathJax.typesetPromise([containerRef.current]).catch(console.error);
    }
  }, [latexStrings]);

  return (
    <div ref={containerRef} className={className}>
      {latexStrings.map((latex, idx) => (
        <div
          key={idx}
          className="text-base sm:text-xl" // kecil di hp (sekitar 10.4px), standar di layar sm ke atas
          dangerouslySetInnerHTML={{ __html: `\\(${latex}\\)` }}
        />
      ))}
    </div>
  );
};

export default LatexRenderer;
