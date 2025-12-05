'use client';

import { MemberCard } from '@/components/MemberCard';
import { CashFlowChart } from '@/components/CashFlowChart';
import { EventForm } from '@/components/EventForm';
import { EventList } from '@/components/EventList';
import { useFinancialEvents } from '@/hooks/useFinancialEvents';
import { initialData } from '@/data/initialData';

export default function Home() {
  const { events, chartData, addEvent, removeEvent, years } = useFinancialEvents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Projeções Financeiras
          </h1>
          <p className="text-gray-600">
            Visualize e gerencie seu planejamento financeiro de longo prazo
          </p>
        </div>

        {/* Membros */}
        <div className="grid md:grid-cols-2 gap-6">
          {initialData.simulation.active_income_members.map((member) => (
            <MemberCard key={member.uuid} member={member} />
          ))}
        </div>

        {/* Gráfico */}
        <CashFlowChart data={chartData} />

        {/* Formulário e Lista de Eventos */}
        <div className="grid lg:grid-cols-2 gap-6">
          <EventForm years={years} onAddEvent={addEvent} />
          <EventList events={events} onRemoveEvent={removeEvent} />
        </div>
      </div>
    </div>
  );
}