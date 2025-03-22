import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="container py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Meu Blog. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/sobre" className="hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link
              to="/contato"
              className="hover:text-primary transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
