import React from 'react';
import { Scatter, ResponsiveContainer, XAxis, YAxis, ZAxis, ScatterChart, Tooltip, CartesianGrid } from 'recharts';

export const ScatterPlot = ({ data, color = "#00ff9d" }: { data: any[], color?: string }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid stroke="#2A2A4A" />
      <XAxis type="number" dataKey="x" name="Metric A" stroke="#888" />
      <YAxis type="number" dataKey="y" name="Metric B" stroke="#888" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="Data" data={data} fill={color} />
    </ScatterChart>
  </ResponsiveContainer>
);

// Heatmap implementation with Recharts might be complex without a dedicated heatmap component,
// using simple bars/grid as approximation or dedicated component if needed.
// For now, Scatter represents the requested visualization expansion.
