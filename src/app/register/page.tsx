"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-white text-xl font-bold flex items-center gap-2 hover:text-purple-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar
          </Link>
          <div className="text-white text-xl font-bold">Chemical Analyzer</div>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Criar sua conta
              </h1>
              <p className="text-white/80">
                Preencha os dados abaixo para começar
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Nome
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Seu sobrenome"
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Confirmar Senha
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-300 focus:ring-purple-300"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-300"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-white"
                >
                  Eu concordo com os{" "}
                  <Link
                    href="/terms"
                    className="text-purple-200 hover:text-purple-100"
                  >
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-200 hover:text-purple-100"
                  >
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-800 hover:bg-purple-600 text-white py-6 text-lg font-semibold"
              >
                Criar Conta
              </Button>

              <div className="text-center text-white/80">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-purple-800 underline hover:text-purple-900 font-medium"
                >
                  Fazer login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
