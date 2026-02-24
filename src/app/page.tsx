import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            DNA <span className="text-primary-600">FERA</span>
          </div>
          <Link
            href="/quiz"
            className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Começar Quiz
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Descubra Seu{" "}
            <span className="text-primary-600">Estilo Pessoal</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Um quiz personalizado que usa IA para analisar suas preferências e
            te ajudar a encontrar o estilo perfeito para você.
          </p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-4 bg-primary-600 text-white text-lg rounded-full font-medium hover:bg-primary-700 transition-colors"
          >
            Começar Agora - É Grátis →
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cores Personalizadas</h3>
            <p className="text-gray-600">
              Descubra a paleta de cores que combina com seu tom de pele e
              estilo.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👔</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Recomendações de Looks</h3>
            <p className="text-gray-600">
              Receba sugestões de roupas e combinações exclusivas para você.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Stylist</h3>
            <p className="text-gray-600">
              Tire dúvidas com nosso assistente de estilo powered by IA.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="text-gray-600 mb-4">Já usado por +1.000 pessoas</p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-4 bg-gray-900 text-white text-lg rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Quero Descobrir Meu Estilo →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>© 2026 DNA FERA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
