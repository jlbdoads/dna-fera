"use client";

import { useState } from "react";
import { questions, type Question } from "@/lib/questions";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [email, setEmail] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    if (question.type === "multiple") {
      const current = (answers[question.id.toString()] as string[]) || [];
      const newValue = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [question.id.toString()]: newValue });
    } else {
      setAnswers({ ...answers, [question.id.toString()]: value });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Salvar no banco de dados
    // TODO: Enviar email com resultado
    console.log("Answers:", answers);
    console.log("Email:", email);
    alert("Quiz concluído! Em breve você receberá seu resultado por email.");
  };

  const isAnswered = () => {
    const answer = answers[question.id.toString()];
    if (question.type === "multiple") {
      return answer && (answer as string[]).length > 0;
    }
    return !!answer;
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Quase lá!</h2>
          <p className="text-gray-600 mb-6">
            Digite seu email para receber seu guia de estilo personalizado.
          </p>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleSubmit}
            disabled={!email}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Receber Meu Resultado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

          {question.type === "numeric" ? (
            <input
              type="number"
              placeholder={question.placeholder}
              value={(answers[question.id.toString()] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          ) : question.type === "multiple" ? (
            <div className="space-y-3">
              {question.options?.map((option) => {
                const selected = (
                  (answers[question.id.toString()] as string[]) || []
                ).includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full px-4 py-3 text-left border rounded-lg transition-all ${
                      selected
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="flex items-center">
                      <span
                        className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                          selected ? "border-primary-500 bg-primary-500" : "border-gray-400"
                        }`}
                      >
                        {selected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {question.options?.map((option) => {
                const selected =
                  answers[question.id.toString()] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full px-4 py-3 text-left border rounded-lg transition-all ${
                      selected
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered()}
              className="px-8 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? "Finalizar" : "Próximo →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
