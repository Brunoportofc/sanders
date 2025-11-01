import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logoSanders from "@/img/logo-sanders.png";

const Header = () => {
  // const [cartItems, setCartItems] = useState(0);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Produtos", path: "/produtos" },
    { name: "Empresa", path: "/empresa" },
    { name: "Blog", path: "/blog" },
    { name: "Suporte", path: "/assistencia-tecnica" },
    { name: "Contato", path: "/contato" }
  ];

  // const socialLinks = [
  //   { name: "Facebook", icon: Facebook, url: "#" },
  //   { name: "Instagram", icon: Instagram, url: "#" },
  //   { name: "LinkedIn", icon: Linkedin, url: "#" },
  // ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b overflow-hidden transition-all duration-300">
      {/* Clean background - same as HeroSection */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80" />
      </div>
      

      
      <div className="container mx-auto px-4 relative z-[3]">
        <div className="flex h-16 items-center justify-between">
			{/* Logo */}
			<Link to="/" className="flex items-center space-x-2">
				<img src={logoSanders} alt="Sanders Medical" className="h-10 w-auto" />
			</Link>

          {/* Desktop Navigation - Centralizada com Liquid Glass Design */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1.5 bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-1.5 shadow-[0_8px_32px_rgba(6,107,164,0.15)]">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:text-white group rounded-xl overflow-hidden whitespace-nowrap"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sanders-blue via-blue-500 to-sanders-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Text */}
                  <span className="relative z-10 tracking-wide">{item.name}</span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-lg bg-sanders-blue/40 transition-opacity duration-300 -z-10"></div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Espaço vazio para balancear o layout */}
          <div className="hidden lg:block w-[120px]"></div>

          {/* Social Icons & Cart - Desktop REMOVIDOS */}
          {/*
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
          */}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-3 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative px-6 py-4 text-base font-semibold text-gray-700 transition-all duration-300 hover:text-white group rounded-xl overflow-hidden bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-xl border border-white/30 shadow-[0_4px_16px_rgba(6,107,164,0.1)] hover:shadow-[0_8px_24px_rgba(6,107,164,0.2)]"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sanders-blue via-blue-500 to-sanders-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-95"></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                    
                    {/* Text */}
                    <span className="relative z-10 tracking-wide text-center block">{item.name}</span>
                  </Link>
                ))}

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;