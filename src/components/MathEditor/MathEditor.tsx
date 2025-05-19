"use client";

import { useState, useEffect } from "react";
import LatexRenderer from "../LatexRendered/LatexRendered";

interface MathEditorProps {
  onChange: (mathTextArray: string[]) => void;
}

const formulas = [
  { symbol: "/", desc: "Pecahan", example: "3/4", result: "\\frac{3}{4}" },
  { symbol: "x", desc: "Perkalian", example: "2x3", result: "2 \\times 3" },
  { symbol: ":", desc: "Pembagian", example: "6:2", result: "6 \\div 2" },
  { symbol: "^", desc: "Pangkat", example: "2^3", result: "2^3" },
  { symbol: "sqrt()", desc: "Akar Kuadrat", example: "sqrt(9)", result: "\\sqrt{9}" },
  { symbol: "%", desc: "Persentase", example: "50%", result: "50\\%" },
];

const MathEditor: React.FC<MathEditorProps> = ({ onChange }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isPreviewed, setIsPreviewed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setIsPreviewed(false);
  };

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [output]);

  const handlePreview = () => {
    const lines = input.split("\n").map((line) =>
      line
        .replace(/(\d+)\/(\d+)/g, "\\frac{$1}{$2}")
        .replace(/x/g, "\\times")
        .replace(/:/g, "\\div")
        .replace(/(\w+)\^(\w+)/g, "$1^{ $2 }")
        .replace(/sqrt\((.*?)\)/g, "\\sqrt{$1}")
        .replace(/%/g, "\\%")
        .trim()
    );

    setOutput(lines);
    onChange(lines);
    setIsPreviewed(true);
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <div className="bg-blue-50 text-blue-800 px-4 py-4 rounded-lg mb-4 border border-blue-300 shadow-sm">
        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          {formulas.map(({ symbol, desc, example, result }, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="font-bold text-blue-700 whitespace-nowrap w-12 flex-shrink-0">{symbol}</span>
              <span className="flex flex-wrap items-center gap-1 text-gray-900">
                <span>{desc} →</span>
                <code className="bg-gray-100 px-1 py-0.5 rounded text-[0.75rem] sm:text-xs">{example}</code>
                <span>→</span>
                <LatexRenderer latexStrings={[result]} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <textarea
        rows={4}
        value={input}
        onChange={handleInputChange}
        placeholder="Contoh: 3/10 - 1/2 x (0.75 - 2/5)"
        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 bg-white text-black"
      />

      {/* Preview Button */}
      <div className="flex mt-4">
        <button onClick={handlePreview} className="px-5 py-2 text-sm bg-[#081737] text-white hover:bg-[#102245] font-medium rounded-md shadow transition">
          Cek Hasil
        </button>
      </div>

      {/* Output Preview */}
      {isPreviewed && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">Preview:</h3>
          {output.map((line, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: `\\(${line}\\)` }} className="mb-1" />
          ))}
        </div>
      )}
    </div>
  );
};

export default MathEditor;
