import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data to replace later
const graphData = [...]; // your weekly values
const streaks = [...];   // streak objects
const heatmap = [...];   // daily records

export default function TaskDashboard() {
  return (
    <div className="space-y-6">
      {/* Heatmap Calendar UI */}
      <div>...heatmap layout here...</div>

      {/* Streaks */}
      <div>...streaks bar layout here...</div>

      {/* Yearly overview */}
      <div>...block-style heatmap here...</div>

      {/* Progress Graph */}
      <div>
        <h2 className="text-lg font-semibold">Daily Average</h2>
        <p className="text-2xl font-bold">35g</p>
        <p className="text-green-600">▼ 50% vs May</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={graphData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
