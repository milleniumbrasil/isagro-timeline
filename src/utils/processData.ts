// src/utils/processData.ts

interface DataItem {
    geocodigo: number;
    data: string;
    fonte: string;
    valor: number;
}

export interface ProcessedDataItem {
    date: string;
    [key: string]: string | number;
}

interface ProcessedData {
    processedData: ProcessedDataItem[];
    fontes: string[];
}

export const processData = (data: DataItem[], subsequenceRange: number = 1): ProcessedData => {
    const grouped: Record<string, ProcessedDataItem> = {};

    // Agrupar os dados por ano, considerando o intervalo de subsequência
    data.forEach((item) => {
        const year = new Date(item.data).getFullYear();
        const adjustedYear = Math.floor(year / subsequenceRange) * subsequenceRange;
        const endYear = adjustedYear + subsequenceRange - 1;
        const period = subsequenceRange > 1 ? `${adjustedYear}-${endYear}` : `${year}`;

        if (!grouped[period]) {
            grouped[period] = { date: period };
        }
        if (!grouped[period][item.fonte]) {
            grouped[period][item.fonte] = 0;
        }
        grouped[period][item.fonte] = (grouped[period][item.fonte] as number) + item.valor;
    });

    const processedData = Object.values(grouped);

    // Normalize the data to percentages for "Absoluto" mode
    processedData.forEach((item) => {
        const total = Object.keys(item)
            .filter((key) => key !== 'date')
            .reduce((acc, key) => acc + (item[key] as number), 0);

        Object.keys(item)
            .filter((key) => key !== 'date')
            .forEach((key) => {
                item[key] = (item[key] as number) / total; // Normaliza para porcentagem
            });
    });

    const fontes = Object.keys(processedData[0]).filter((key) => key !== 'date');

    return { processedData, fontes };
};

// Função para calcular média móvel simples (MMS)
export function calculateMMS(data: DataItem[], subsequenceRange: number = 5): ProcessedDataItem[] {
    const groupedData: { [fonte: string]: DataItem[] } = data.reduce((acc: { [key: string]: DataItem[] }, item) => {
        const fonte = item.fonte;
        if (!acc[fonte]) {
            acc[fonte] = [];
        }
        acc[fonte].push(item);
        return acc;
    }, {});

    const mmsResults: ProcessedDataItem[] = [];

    Object.keys(groupedData).forEach(fonte => {
        const values = groupedData[fonte];
        values.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        for (let i = 0; i <= values.length - subsequenceRange; i++) {
            const subArray = values.slice(i, i + subsequenceRange);
            const sum = subArray.reduce((acc, item) => acc + item.valor, 0);
            const avg = sum / subsequenceRange;

            const startYear = new Date(subArray[0].data).getFullYear();
            const endYear = new Date(subArray[subArray.length - 1].data).getFullYear();

            const period = subsequenceRange > 1 ? `${startYear}-${endYear}` : `${startYear}`;

            const entry: ProcessedDataItem = {
                date: period,
                [fonte]: avg
            };
            mmsResults.push(entry);
        }
    });

    return mmsResults;
}