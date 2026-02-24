export type Question = {
  id: number;
  question: string;
  type: "single" | "multiple" | "numeric";
  options?: { value: string; label: string; image?: string }[];
  placeholder?: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Qual é o seu gênero?",
    type: "single",
    options: [
      { value: "masculino", label: "Masculino" },
      { value: "feminino", label: "Feminino" },
    ],
  },
  {
    id: 2,
    question: "Como você descreveria seu estilo atual?",
    type: "single",
    options: [
      { value: "nao_definido", label: "Não tenho estilo definido" },
      { value: "ideia_parcial", label: "Tenho uma ideia, mas não sei expressar" },
      { value: "quer_refinar", label: "Quero refinar o que já tenho" },
      { value: "sei_exatamente", label: "Já sei exatamente o que me serve" },
    ],
  },
  {
    id: 3,
    question: "Quais estilos você gosta? Selecione todos que se aplicam.",
    type: "multiple",
    options: [
      { value: "casual", label: "Casual" },
      { value: "classico", label: "Clássico" },
      { value: "street_style", label: "Street Style" },
      { value: "sporty_chic", label: "Sporty Chic" },
      { value: "minimalista", label: "Minimalista" },
      { value: "boho", label: "Boho" },
      { value: "preppy", label: "Preppy" },
      { value: "grunge", label: "Grunge" },
    ],
  },
  {
    id: 4,
    question: "Você usa as mesmas roupas sempre?",
    type: "single",
    options: [
      { value: "uniforme", label: "Sim, é meu uniforme" },
      { value: "varia_pouco", label: "Sim, com pequenas variações" },
      { value: "tenta_variar", label: "Tento variar, mas sempre volto ao mesmo" },
      { value: "variado", label: "Não, tenho bastante variedade" },
    ],
  },
  {
    id: 5,
    question: "Você já evitou um evento por falta de roupa?",
    type: "single",
    options: [
      { value: "frequentemente", label: "Frequentemente" },
      { value: "as_vezes", label: "Às vezes" },
      { value: "raramente", label: "Raramente" },
      { value: "nunca", label: "Nunca" },
    ],
  },
  {
    id: 6,
    question: "Como é comprar roupas para você?",
    type: "single",
    options: [
      { value: "divertido", label: "Divertido e empolgante" },
      { value: "demorado", label: "Okay, mas demorado" },
      { value: "estressante", label: "Estressante" },
      { value: "evito", label: "Evito ao máximo" },
    ],
  },
  {
    id: 7,
    question: "Que tipo de marcas você prefere?",
    type: "single",
    options: [
      { value: "fast_fashion", label: "Fast Fashion (Zara, H&M, C&A)" },
      { value: "premium", label: "Premium (Aramis, Reserva, Osklen)" },
      { value: "luxo", label: "Luxo (Louis Vuitton, Gucci)" },
      { value: "mix", label: "Mix de todas" },
    ],
  },
  {
    id: 8,
    question: "Quanto você gasta em roupas por ano?",
    type: "single",
    options: [
      { value: "ate_1000", label: "Até R$ 1.000" },
      { value: "1000_3000", label: "R$ 1.001 - R$ 3.000" },
      { value: "3000_5000", label: "R$ 3.001 - R$ 5.000" },
      { value: "5000_10000", label: "R$ 5.001 - R$ 10.000" },
      { value: "mais_10000", label: "Mais de R$ 10.000" },
    ],
  },
  {
    id: 9,
    question: "Com que frequência você se arrepende de compras?",
    type: "single",
    options: [
      { value: "raramente", label: "Raramente" },
      { value: "as_vezes", label: "Às vezes" },
      { value: "frequentemente", label: "Frequentemente" },
      { value: "sempre", label: "Sempre" },
    ],
  },
  {
    id: 10,
    question: "Qual melhor descreve seu corpo?",
    type: "single",
    options: [
      { value: "retangulo", label: "Retângulo (mesmo do ombro ao quadril)" },
      { value: "triangulo", label: "Triângulo (quadril mais largo)" },
      { value: "triangulo_invertido", label: "Triângulo Invertido (ombro mais largo)" },
      { value: "oval", label: "Oval (barriga mais cheia)" },
      { value: "trapezio", label: "Trapézio (atlético)" },
    ],
  },
  {
    id: 11,
    question: "Qual sua altura?",
    type: "numeric",
    placeholder: "Ex: 175",
  },
  {
    id: 12,
    question: "Quão confiante você está sobre o que te serve?",
    type: "single",
    options: [
      { value: "muito", label: "Muito - sei exatamente o que funciona" },
      { value: "medio", label: "Médio - é tentativa e erro" },
      { value: "pouco", label: "Pouco - sempre tenho dúvidas" },
      { value: "evito", label: "Evito estilos por não saber se servem" },
    ],
  },
  {
    id: 13,
    question: "Como está seu guarda-roupa?",
    type: "single",
    options: [
      { value: "funciona_ideias", label: "Funciona, mas preciso de ideias novas" },
      { value: "cheio_nada_casa", label: "Tem muita coisa, mas nada combina" },
      { value: "nao_representa", label: "Algumas peças não me representam mais" },
      { value: "nao_serve", label: "Nada serve como antes" },
    ],
  },
  {
    id: 14,
    question: "Você tem roupas guardadas esperando 'o momento'?",
    type: "single",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
    ],
  },
  {
    id: 15,
    question: "Quanto do seu guarda-roupa você realmente usa?",
    type: "single",
    options: [
      { value: "menos_25", label: "Menos de 25%" },
      { value: "cerca_50", label: "Cerca de 50%" },
      { value: "mais_75", label: "Mais de 75%" },
      { value: "nao_sei", label: "Não sei" },
    ],
  },
];
