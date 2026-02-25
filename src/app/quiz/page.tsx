"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import { supabase } from "@/lib/supabase";

type UserData = {
  name: string;
  phone: string;
  email: string;
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [userData, setUserData] = useState<UserData>({
    name: "",
    phone: "",
    email: "",
  });
  const [step, setStep] = useState<"form" | "quiz" | "finished">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleUserDataChange = (field: keyof UserData, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const startQuiz = () => {
    if (userData.name && userData.email) {
      setStep("quiz");
    }
  };

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
      setStep("finished");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (!userData.email) return;

    setIsLoading(true);

    try {
      // 1. Criar ou encontrar usuário
      let userId: string | null = null;

      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", userData.email)
        .single();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: userError } = await supabase
          .from("users")
          .insert({ 
            email: userData.email,
            name: userData.name 
          })
          .select("id")
          .single();

        if (userError) throw userError;
        userId = newUser?.id;
      }

      // 2. Salvar respostas do quiz
      const { error: quizError } = await supabase
        .from("quiz_responses")
        .insert({
          user_id: userId,
          answers: { ...answers, userData },
        });

      if (quizError) throw quizError;

      // 3. Enviar email com resultado
      try {
        await fetch("/api/send-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email: userData.email, 
            name: userData.name,
            answers 
          }),
        });
      } catch (emailError) {
        console.error("Erro ao enviar email:", emailError);
      }

      setIsSaved(true);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAnswered = () => {
    const answer = answers[question.id.toString()];
    if (question.type === "multiple") {
      return answer && (answer as string[]).length > 0;
    }
    return !!answer;
  };

  // Tela inicial - Coleta de dados
  if (step === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">DNA FERA</h1>
            <p className="text-gray-600">Descubra seu estilo pessoal</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Seu nome"
                value={userData.name}
                onChange={(e) => handleUserDataChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={userData.phone}
                onChange={(e) => handleUserDataChange("phone", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={userData.email}
                onChange={(e) => handleUserDataChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <strong>⚠️ Importante:</strong> Por ser um serviço gratuito, 
                limitamos o resultado a <strong>1 por usuário</strong>. 
                Não fazemos envio de mensagens, e-mails ou marketing sem seu consentimento.
              </p>
            </div>

            <button
              onClick={startQuiz}
              disabled={!userData.name || !userData.email}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Começar Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela final - Email
  if (step === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Quiz Concluído!</h2>
          <p className="text-gray-700 mb-6">
            Obrigado, {userData.name}! Seu resultado está sendo preparado.
          </p>
          <p className="text-gray-600 mb-6">
            Enviaremos o resultado para: <strong className="text-gray-900">{userData.email}</strong>
          </p>
          
          {isSaved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-medium">
                ✅ Verifique sua caixa de entrada (ou spam) em poucos minutos!
              </p>
            </div>
          )}

          {!isSaved && (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Receber Meu Resultado"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Tela do Quiz
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
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
          <h2 className="text-xl font-semibold mb-6 text-gray-900">{question.question}</h2>

          {question.type === "numeric" ? (
            <input
              type="number"
              placeholder={question.placeholder}
              value={(answers[question.id.toString()] as string) || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
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
                        ? "border-primary-500 bg-primary-50 text-gray-900"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 text-gray-900"
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
                        ? "border-primary-500 bg-primary-50 text-gray-900"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 text-gray-900"
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
              className="px-6 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
