import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, Facebook, Instagram, Linkedin } from "lucide-react";
import logoSanders from "@/img/logo-sanders.png";

const Header = () => {
  const [cartItems, setCartItems] = useState(0);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Empresa", path: "/empresa" },
    { name: "Produtos", path: "/produtos" },
    // Itens temporariamente removidos
    // { name: "Blog", path: "/blog" },
    // { name: "Contato", path: "/contato" },
    // { name: "Quero Comprar", path: "/quero-comprar" },
    // { name: "Assistência Técnica", path: "/assistencia-tecnica" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b overflow-hidden relative">
      {/* Clean background - same as HeroSection */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60" />
      </div>
      
      {/* Dark mode only: Soft blue ambient lights */}
      <div className="absolute inset-0 z-[2] pointer-events-none dark:block hidden overflow-hidden">
        {/* Subtle header glow */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[100px] bg-gradient-radial from-blue-500/6 via-blue-400/2 to-transparent rounded-full blur-[40px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[80px] bg-gradient-radial from-blue-400/4 via-blue-300/1 to-transparent rounded-full blur-[30px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-[3]">
        <div className="flex h-16 items-center justify-between">
			{/* Logo */}
			<Link to="/" className="flex items-center space-x-2">
				<img src={logoSanders} alt="Sanders Medical" className="h-10 w-auto" />
			</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium transition-colors hover:text-sanders-blue"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons & Cart - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-muted-foreground hover:text-sanders-blue transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <ModeToggle />
            
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-lg font-medium transition-colors hover:text-sanders-blue"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center space-x-4 pt-4 border-t">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="text-muted-foreground hover:text-sanders-blue transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <ModeToggle />
                
                <Button variant="outline" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrinho ({cartItems})
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;