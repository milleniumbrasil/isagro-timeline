declare module 'isagro-timeline' {
    export interface ProcessedDataItem {
      date: string;
      [key: string]: string | number;
    }
  
    export interface TimelineProps {
      data: ProcessedDataItem[];
      fonteKeys: string[];
      chartType: 'Absoluto' | 'Media Móvel';
      subsequenceRange: number;
    }
  
    const Timeline: React.FC<TimelineProps>;
    export { Timeline };
  }