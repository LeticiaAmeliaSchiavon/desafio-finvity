import { useState, useMemo } from 'react';
import { FinancialEvent, ChartDataPoint } from '@/types';
import { initialData } from '@/data/initialData';

export const useFinancialEvents = () => {
  const [events, setEvents] = useState<FinancialEvent[]>([]);

  const years = initialData.projection.cash_flow.labels;

  // Calcula os dados do gráfico com os eventos aplicados
  const chartData = useMemo((): ChartDataPoint[] => {
    const despesasBase = [...initialData.projection.cash_flow.datasets[0].data];
    const rendaBase = [...initialData.projection.cash_flow.datasets[1].data];

    events.forEach((event) => {
      if (event.frequency === 'unica' && event.year) {
        const yearIndex = years.indexOf(event.year);
        if (yearIndex !== -1) {
          if (event.type === 'renda') {
            rendaBase[yearIndex] += event.value;
          } else {
            despesasBase[yearIndex] += event.value;
          }
        }
      } else if (event.frequency === 'mensal' && event.startYear && event.endYear) {
        const startIndex = years.indexOf(event.startYear);
        const endIndex = years.indexOf(event.endYear);
        for (let i = startIndex; i <= endIndex; i++) {
          if (event.type === 'renda') {
            rendaBase[i] += event.value;
          } else {
            despesasBase[i] += event.value;
          }
        }
      }
    });

    return years.map((year, index) => ({
      year,
      Despesas: despesasBase[index],
      Renda: rendaBase[index]
    }));
  }, [events, years]);

  const addEvent = (event: FinancialEvent) => {
    setEvents((prev) => [event, ...prev]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return {
    events,
    chartData,
    addEvent,
    removeEvent,
    years
  };
};