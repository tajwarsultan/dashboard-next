import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const TestChart = () => {
  const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
  ];

  return (
    <BarChart width={300} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
};

export default TestChart;
