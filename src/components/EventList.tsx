import { Calendar, Trash2 } from 'lucide-react';
import { FinancialEvent } from '@/types';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface EventListProps {
  events: FinancialEvent[];
  onRemoveEvent: (id: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onRemoveEvent }) => {
  const getEventDescription = (event: FinancialEvent): string => {
    const typeLabel = event.type === 'renda' ? 'Renda' : 'Despesa';
    const freqLabel = event.frequency === 'unica' ? 'única' : 'mensal';

    if (event.frequency === 'unica' && event.year) {
      return `${typeLabel} ${freqLabel} em ${event.year}: ${formatCurrency(event.value)}`;
    } else if (event.frequency === 'mensal' && event.startYear && event.endYear) {
      return `${typeLabel} ${freqLabel} de ${event.startYear} a ${event.endYear}: ${formatCurrency(event.value)}`;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Eventos Cadastrados</h2>
      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum evento cadastrado</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      event.type === 'renda'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {event.type === 'renda' ? 'Renda' : 'Despesa'}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                    {event.frequency === 'unica' ? 'Única' : 'Mensal'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{getEventDescription(event)}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(event.createdAt)}</p>
              </div>
              <button
                onClick={() => onRemoveEvent(event.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remover evento"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};