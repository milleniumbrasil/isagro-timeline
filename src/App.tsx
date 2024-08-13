
// src/App.tsx

import React, { useState } from 'react';
import Timeline from './components/Timeline';

const App: React.FC = () => {
  const [chartType, setChartType] = useState<'Absoluto' | 'Media Móvel'>('Absoluto');
  const [subsequenceRange, setSubsequenceRange] = useState<number>(1);

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
      <Timeline chartType={chartType} subsequenceRange={subsequenceRange} />
    </div>
  );
};

export default App;