'use client';

import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EventFormData, FinancialEvent } from '@/types';
import { generateUUID } from '@/utils/formatters';

const eventSchema = z.object({
  type: z.enum(['renda', 'despesa']),
  frequency: z.enum(['unica', 'mensal']),
  year: z.number(),
  startYear: z.number(),
  endYear: z.number(),
  value: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'Valor deve ser maior que zero'
  })
}).refine((data) => {
  if (data.frequency === 'mensal') {
    return data.endYear >= data.startYear;
  }
  return true;
}, {
  message: 'Ano final deve ser maior ou igual ao ano inicial',
  path: ['endYear']
});

interface EventFormProps {
  years: number[];
  onAddEvent: (event: FinancialEvent) => void;
}

export const EventForm: React.FC<EventFormProps> = ({ years, onAddEvent }) => {
  const [frequency, setFrequency] = useState<'unica' | 'mensal'>('unica');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: 'renda',
      frequency: 'unica',
      year: years[0],
      startYear: years[0],
      endYear: years[0],
      value: ''
    }
  });

  const onSubmit = (data: EventFormData) => {
    const newEvent: FinancialEvent = {
      id: generateUUID(),
      type: data.type,
      frequency: data.frequency,
      value: parseFloat(data.value),
      createdAt: new Date().toISOString(),
      ...(data.frequency === 'unica'
        ? { year: data.year }
        : { startYear: data.startYear, endYear: data.endYear })
    };

    onAddEvent(newEvent);
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="w-6 h-6 mr-2" />
        Adicionar Evento
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Evento
          </label>
          <select
            {...register('type')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="renda">Adicionar renda</option>
            <option value="despesa">Adicionar despesas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequência
          </label>
          <select
            {...register('frequency')}
            onChange={(e) => setFrequency(e.target.value as 'unica' | 'mensal')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="unica">Única</option>
            <option value="mensal">Mensal</option>
          </select>
        </div>

        {frequency === 'unica' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ano
            </label>
            <select
              {...register('year', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ano Inicial
              </label>
              <select
                {...register('startYear', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ano Final
              </label>
              <select
                {...register('endYear', { valueAsNumber: true })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.endYear ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.endYear && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.endYear.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('value')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.value ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0,00"
          />
          {errors.value && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.value.message}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Evento
        </button>
      </div>
    </div>
  );
};