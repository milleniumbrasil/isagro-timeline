
// src/components/Timeline.tsx 

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { processData, calculateMMS, ProcessedDataItem } from '../utils/processData';

interface TimelineProps {
  chartType: 'Absoluto' | 'Media Móvel';
  subsequenceRange: number;
}

const Timeline: React.FC<TimelineProps> = ({ chartType, subsequenceRange }) => {
  const [data, setData] = useState<ProcessedDataItem[]>([]);
  const [fonteKeys, setFonteKeys] = useState<string[]>([]);

  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        let finalData;

        if (chartType === 'Media Móvel') {
          finalData = calculateMMS(jsonData, subsequenceRange);
        } else {
          const { processedData, fontes } = processData(jsonData, subsequenceRange);
          finalData = processedData;
          setFonteKeys(fontes);
        }

        setData(finalData);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, [chartType, subsequenceRange]);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]; // Colors for the areas

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis 
          tickFormatter={(value) => 
            chartType === 'Absoluto' 
              ? `${(value * 100).toFixed(0)}%` 
              : value.toFixed(0)
          } 
        />
        <Tooltip />
        <Legend />
        {fonteKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stackId="1"
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Timeline;