
// src/App.tsx

import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import { calculateMMS, processData, ProcessedDataItem } from './utils/processData';

const App: React.FC = () => {
  const [chartType, setChartType] = useState<'Absoluto' | 'Media Móvel'>('Absoluto');
  const [subsequenceRange, setSubsequenceRange] = useState<number>(1);
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

  return (
    <div>
      <h1>Normalized Stacked Area Chart</h1>
      <div>
        <label>
          Selecione o tipo de gráfico:
          <select value={chartType} onChange={(e) => setChartType(e.target.value as 'Absoluto' | 'Media Móvel')}>
            <option value="Absoluto">Absoluto</option>
            <option value="Media Móvel">Media Móvel</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Subsequências (anos):
          <select value={subsequenceRange} onChange={(e) => setSubsequenceRange(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
      </div>
      <Timeline data={data} fonteKeys={fonteKeys} chartType={chartType} subsequenceRange={subsequenceRange} />
    </div>
  );
};

export default App;