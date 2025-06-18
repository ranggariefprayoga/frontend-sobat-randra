/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/StackedBarChart.tsx

"use client";

import React from "react";
import { YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, LabelList } from "recharts";

interface DataPoint {
  name: string;
  score: number; // Total score untuk keseluruhan bar
  TWK: number;
  TIU: number;
  TKP: number;
}

interface StackedBarChartProps {
  data: DataPoint[];
}

// Custom Tooltip untuk menampilkan nama produk saat hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, score, TWK, TIU, TKP } = payload[0].payload; // Ambil nama produk dari data payload
    return (
      <div className="bg-gradient-to-r from-[#f7fafc] to-[#edf2f7] p-5 border border-gray-300 rounded-lg shadow-lg max-w-[250px]">
        <p className="font-semibold text-xl text-gray-800">{name}</p>
        <p className="font-semibold base mt-4 text-gray-800">Nilai Kamu: {score}</p>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <p>
            TWK: <span className="font-semibold text-[#E53E3E]">{TWK}</span>
          </p>
          <p>
            TIU: <span className="font-semibold text-[#3182CE]">{TIU}</span>
          </p>
          <p>
            TKP: <span className="font-semibold text-[#48BB78]">{TKP}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const StackedBarChart = ({ data }: StackedBarChartProps) => {
  // Membatasi hanya 10 data
  const limitedData = data.slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        className="w-full h-full"
        data={limitedData}
        barCategoryGap="15%" // Menambah jarak antar bar
        barSize={window.innerWidth <= 768 ? 25 : 80} // Ukuran bar lebih kecil di perangkat mobile
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* Menyesuaikan ukuran Y-Axis dan Legend di perangkat mobile */}
        <YAxis tickSize={window.innerWidth <= 768 ? 10 : 20} className="text-sm" />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: window.innerWidth <= 768 ? "10px" : "12px", marginTop: "10px" }} />
        {/* Stacked Bars dengan warna kontras */}
        <Bar dataKey="TWK" stackId="a" fill="#E53E3E">
          <LabelList
            dataKey="score" // Menampilkan total score di atas bar
            position="top"
            className="text-sm font-semibold text-gray-800"
          />
        </Bar>
        <Bar dataKey="TIU" stackId="a" fill="#3182CE">
          <LabelList
            dataKey="score" // Menampilkan total score di atas bar
            position="top"
            className="text-sm font-semibold text-gray-800"
          />
        </Bar>
        <Bar dataKey="TKP" stackId="a" fill="#48BB78">
          <LabelList
            dataKey="score" // Menampilkan total score di atas bar
            position="top"
            className="text-sm font-semibold text-gray-800"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
