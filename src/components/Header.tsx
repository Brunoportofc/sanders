import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logoSanders from "@/img/logo-sanders.png";

const Header = () => {
  // const [cartItems, setCartItems] = useState(0);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Produtos", path: "/produtos" }
  ];

  // const socialLinks = [
  //   { name: "Facebook", icon: Facebook, url: "#" },
  //   { name: "Instagram", icon: Instagram, url: "#" },
  //   { name: "LinkedIn", icon: Linkedin, url: "#" },
  // ];

  return (
    <header className="sticky top-0 z-50 w-full border-b overflow-hidden relative">
      {/* Clean background - same as HeroSection */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60" />
      </div>
      

      
      <div className="container mx-auto px-4 relative z-[3]">
        <div className="flex h-16 items-center justify-between">
			{/* Logo */}
			<Link to="/" className="flex items-center space-x-2">
				<img src={logoSanders} alt="Sanders Medical" className="h-10 w-auto" />
			</Link>

          {/* Desktop Navigation - Centralizada */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative text-sm font-medium transition-all duration-300 hover:text-sanders-blue group px-4 py-2 rounded-lg hover:bg-sanders-blue/5 hover:shadow-md hover:scale-105"
                >
                  {item.name}
                  {/* Efeito de linha animada */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-sanders-blue transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
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
              <div className="flex flex-col space-y-6 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative text-lg font-medium transition-all duration-300 hover:text-sanders-blue group px-4 py-3 rounded-xl hover:bg-sanders-blue/10 hover:shadow-lg hover:scale-105 text-center"
                  >
                    {item.name}
                    {/* Efeito de linha animada para mobile */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-sanders-blue transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
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