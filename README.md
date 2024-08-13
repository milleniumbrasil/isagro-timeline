# Isagro-Timeline

Isagro-Timeline é um componente React para criar gráficos de área empilhada, ideal para visualização de séries temporais. Ele permite a análise de dados ao longo do tempo, com suporte para modos 'Absoluto' e 'Média Móvel'. Os gráficos podem exibir tanto percentuais quanto valores reais, e os intervalos de tempo podem ser ajustados conforme necessário.

## Instalação

Este componente está disponível no [NPM](https://www.npmjs.com/package/isagro-timeline) e pode ser facilmente instalado via CLI:

```bash
npm install isagro-timeline@latest
```

## Parâmetros

O componente `Timeline` aceita os seguintes parâmetros:

- **`chartType`** (`'Absoluto' | 'Media Móvel'`): Define o tipo de gráfico a ser exibido. No modo 'Absoluto', o gráfico exibe os dados anuais, normalizados para percentuais. No modo 'Média Móvel', o gráfico exibe médias móveis com base no intervalo de anos informado.
- **`subsequenceRange`** (`number`): Especifica o número de anos a serem considerados em cada subsequência. Este parâmetro é usado tanto no modo 'Absoluto' quanto no modo 'Média Móvel'.

## Exemplo de Uso

Aqui está um exemplo básico de como utilizar o componente `Timeline` em um projeto React:

```jsx
import React, { useState } from 'react';
import Timeline from 'isagro-timeline';

const App: React.FC = () => {
  const [chartType, setChartType] = useState<'Absoluto' | 'Media Móvel'>('Absoluto');
  const [subsequenceRange, setSubsequenceRange] = useState<number>(1);

  return (
    <div>
      <h1>Isagro Timeline</h1>
      <div>
        <label>
          Selecione o tipo de gráfico:
          <select value={chartType} onChange={(e) => setChartType(e.target.value as 'Absoluto' | 'Media Móvel')}>
            <option value="Absoluto">Absoluto</option>
            <option value="Media Móvel">Média Móvel</option>
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
```

## Exemplo de Dados (JSON)

O componente espera um array de objetos JSON como entrada de dados, com o seguinte formato:

```json
[
  {
    "geocodigo": 11,
    "data": "1990-01-01T00:00:00",
    "fonte": "Emissão de CO2e",
    "valor": 3901.5649837277
  },
  {
    "geocodigo": 11,
    "data": "1990-01-01T00:00:00",
    "fonte": "Emissão de CO2",
    "valor": 3.5339235136
  },
  {
    "geocodigo": 11,
    "data": "1991-01-01T00:00:00",
    "fonte": "Emissão de CH4",
    "valor": 132.8399390375
  },
  ...
]
```

## Contribuição

Sinta-se à vontade para contribuir com o Isagro-Timeline. Se encontrar algum problema ou tiver sugestões de melhorias, abra uma issue ou envie um pull request.
