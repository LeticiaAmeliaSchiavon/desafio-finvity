import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDataPoint } from "@/types";
import { CustomTooltip } from "./CustomTooltip";
import { formatCurrency } from "@/utils/formatters";

interface CashFlowChartProps {
  data: ChartDataPoint[];
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Fluxo de Caixa Projetado
      </h2>
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ dy: 5 }} />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Despesas" fill="#ef4444" />
            <Bar dataKey="Renda" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
