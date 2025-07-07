import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sanders-gray-light border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="h-10 w-32 bg-sanders-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Sanders</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Equipamentos hospitalares e odontológicos de excelência. 
              Soluções completas para esterilização e limpeza profissional.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-sanders-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sanders-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-sanders-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/empresa" className="text-muted-foreground hover:text-sanders-blue transition-colors">Sobre Nós</Link></li>
              <li><Link to="/produtos" className="text-muted-foreground hover:text-sanders-blue transition-colors">Produtos</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-sanders-blue transition-colors">Blog</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-sanders-blue transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quero-comprar" className="text-muted-foreground hover:text-sanders-blue transition-colors">Quero Comprar</Link></li>
              <li><Link to="/assistencia-tecnica" className="text-muted-foreground hover:text-sanders-blue transition-colors">Assistência Técnica</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-sanders-blue transition-colors">Garantia</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-sanders-blue transition-colors">Peças e Acessórios</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-sanders-blue" />
                <span>
                  Rua Industrial, 123<br />
                  Santa Rita do Sapucaí - MG<br />
                  37540-000
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-sanders-blue" />
                <span>(35) 3471-9000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-sanders-blue" />
                <span>contato@sandersdobrasil.com.br</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificações e LGPD */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-sanders-success rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ISO</span>
                </div>
                <span className="text-xs text-muted-foreground">ISO 13485</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-sanders-success rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-xs text-muted-foreground">ANVISA</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>&copy; 2024 Sanders do Brasil. Todos os direitos reservados.</p>
              <p className="mt-1">
                <a href="#" className="hover:text-sanders-blue transition-colors">Política de Privacidade</a> |{" "}
                <a href="#" className="hover:text-sanders-blue transition-colors">Termos de Uso</a> |{" "}
                <a href="#" className="hover:text-sanders-blue transition-colors">LGPD</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;