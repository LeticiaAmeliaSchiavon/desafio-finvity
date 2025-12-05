# 💰 Sistema de Projeções Financeiras

Sistema completo para visualização e gestão de projeções financeiras com gráficos interativos, cadastro de eventos e cálculos em tempo real.

## 🚀 Tecnologias

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos interativos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

## 📦 Instalação

```bash
# Clone o repositório (ou crie manualmente)
cd financial-projection

# Instale as dependências
npm install

# Execute o projeto em desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout raiz
│   └── globals.css           # Estilos globais
├── components/
│   ├── CashFlowChart.tsx     # Gráfico de fluxo de caixa
│   ├── MemberCard.tsx        # Card de informações do membro
│   ├── EventForm.tsx         # Formulário de cadastro de eventos
│   ├── EventList.tsx         # Lista de eventos cadastrados
│   └── CustomTooltip.tsx     # Tooltip personalizado para o gráfico
├── hooks/
│   └── useFinancialEvents.ts # Lógica de gerenciamento de eventos
├── types/
│   └── index.ts              # Definições TypeScript
├── utils/
│   └── formatters.ts         # Funções auxiliares (formatação)
└── data/
    └── initialData.ts        # Dados iniciais da simulação
```

## 🎯 Funcionalidades

### 1. Dashboard de Membros
- Visualização de informações demográficas
- Idade atual, aposentadoria e expectativa de vida
- Renda líquida formatada

### 2. Gráfico de Fluxo de Caixa
- Projeção visual de receitas e despesas
- Responsivo e interativo
- Tooltip com valores formatados em R$
- Atualização em tempo real

### 3. Cadastro de Eventos
- Adicionar receitas ou despesas
- Frequência única ou mensal
- Validação com Zod e React Hook Form
- Aplicação imediata no gráfico

### 4. Gestão de Eventos
- Lista de todos os eventos cadastrados
- Remoção com recálculo automático
- Badges identificando tipo e frequência
- Ordenação cronológica

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

## 📝 Personalização

### Adicionar novos membros
Edite `src/data/initialData.ts` e adicione novos objetos no array `active_income_members`.

### Modificar períodos
Altere o array `labels` em `cash_flow` para adicionar ou remover anos da projeção.

### Customizar estilos
Todos os componentes usam Tailwind CSS. Modifique as classes diretamente ou estenda em `tailwind.config.js`.

## 🧪 Validações

- ✅ Valores devem ser positivos
- ✅ Ano final ≥ ano inicial (eventos mensais)
- ✅ Todos os campos obrigatórios
- ✅ Formatação monetária brasileira

## 📊 Tipos de Eventos

### Evento Único
Impacta apenas o ano selecionado.

### Evento Mensal
Aplica o valor mensalmente do ano inicial até o final (inclusive).

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request


---

Desenvolvido com ❤️ usando Next.js e TypeScript