export const expenseCategories = [
  'Comidas & Bebidas',
  'Compras',
  'Transporte',
  'Casa',
  'Entretenimento',
  'Assistência médica',
  'Educação',
  'Utilidades',
  'Viagem',
  'Seguro',
  'Cuidados Pessoais',
  'Presentes',
  'Investimentos',
  'Outros'
];

export const incomeCategories = [
  'Salário',
  'Negócios',
  'Investimentos',
  'Freelance',
  'Presentes',
  'Aluguel',
  'Reembolsos',
  'Outros'
];

//Função auxiliar para obter categorias com base no tipo de transação
export const getCategoriesByType = (type: 'renda' | 'despesa' | 'tudo') => {
  switch (type) {
    case 'renda':
      return incomeCategories;
    case 'despesa':
      return expenseCategories;
    case 'tudo':
      return [...new Set([...incomeCategories, ...expenseCategories])];
    default:
      return [];
  }
}; 