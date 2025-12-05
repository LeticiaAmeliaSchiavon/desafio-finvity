export interface Member {
  uuid: string;
  name: string;
  age: number;
  retirement_age: number;
  life_expectancy: number;
  net_income: number;
  has_inss: boolean;
  inss: number;
  expenses_decline_rate: number;
  judicial_inventory_costs: number | string;
  extrajudicial_inventory_costs: number | string;
  inventory_costs: number | string;
}

export interface CashFlowDataset {
  name: string;
  type: string;
  data: number[];
}

export interface CashFlow {
  labels: number[];
  datasets: CashFlowDataset[];
}

export interface Projection {
  cash_flow: CashFlow;
}

export interface Simulation {
  uuid: string;
  active_income_members: Member[];
  events: FinancialEvent[];
}

export interface InitialData {
  simulation: Simulation;
  projection: Projection;
}

export type EventType = "renda" | "despesa";
export type EventFrequency = "unica" | "mensal";

export interface FinancialEvent {
  id: string;
  type: EventType;
  frequency: EventFrequency;
  year?: number;
  startYear?: number;
  endYear?: number;
  value: number;
  createdAt: string;
}

export interface EventFormData {
  type: EventType;
  frequency: EventFrequency;
  year: number;
  startYear: number;
  endYear: number;
  value: string;
}

export interface ChartDataPoint {
  year: number;
  Despesas: number;
  Renda: number;
}
