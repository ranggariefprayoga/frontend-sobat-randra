"use client";

import React, { useState } from "react";

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

  const convertInput = () => {
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
      {/* Format Guide */}
      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-4 border border-blue-300 shadow-sm">
        <h4 className="font-semibold mb-3 text-sm">Format Guide</h4>
        <div className="flex flex-col gap-3 text-xs sm:text-sm">
          {formulas.map(({ symbol, desc, example, result }, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="font-bold text-blue-700 whitespace-nowrap w-16">{symbol}</span>
              <span>
                {desc} → <code className="bg-gray-100 px-1 rounded">{example}</code> → <span className="font-mono" dangerouslySetInnerHTML={{ __html: `\\(${result}\\)` }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <textarea
        rows={4}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setIsPreviewed(false); // reset preview kalau input berubah
        }}
        placeholder="Contoh: 3/10 - 1/2 x (0.75 - 2/5)"
        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 bg-white text-black"
      />

      {/* Preview Button */}
      <div className="flex justify-start mt-4">
        <button onClick={convertInput} className="px-5 py-2 text-sm bg-[#081737] text-white hover:bg-[#102245] font-medium rounded-md shadow transition">
          Cek Preview
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
