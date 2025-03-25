import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 dark:bg-black">
      <div className="container w-8/12 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-400">
            Sinta-se à vontade para entrar em contato se você deseja se conectar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-900/5 dark:bg-gray-900 p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-semibold mb-6">
              Informações de Contato
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Linkedin className="h-5 w-5 text-green-500 dark:text-green-400 mr-4" />
                <a
                  href="https://www.linkedin.com/in/fabi0dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  linkedin.com/in/fabi0dev/
                </a>
              </div>
              <div className="flex items-center">
                <Github className="h-5 w-5 text-green-500 dark:text-green-400 mr-4" />
                <a
                  href="https://github.com/fabi0dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  github.com/fabi0dev
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/5 dark:bg-gray-900 p-8 rounded-2xl border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-2 dark:bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 dark:bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Seu e-mail"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Assunto
                </label>
                <input
                  id="subject"
                  type="text"
                  className="w-full px-4 py-2 dark:bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Assunto"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 dark:bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <Button className="w-full bg-green-400 hover:bg-green-500 text-black">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
