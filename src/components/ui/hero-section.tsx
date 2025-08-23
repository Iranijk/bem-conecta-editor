import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";
import heroImage from "@/assets/mrh-hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl scale-150 animate-pulse"></div>
            <img 
              src="/lovable-uploads/727f7dba-5a7f-4097-884d-e20de561db35.png" 
              alt="MRH do Bem Logo" 
              className="relative h-32 w-auto md:h-48 md:w-auto shadow-hero mx-auto"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Solidariedade</span>
          <br />
          <span className="gradient-text">que transforma</span>
          <br />
          <span className="text-foreground">vidas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Conectamos pessoas através da generosidade, criando uma rede de apoio 
          que fortalece comunidades e transforma realidades.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold group transition-all duration-300 hover:scale-105"
          >
            <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Quero Ser Voluntário
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            <Users className="mr-2 h-5 w-5" />
            Fazer Doação
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2000+</div>
            <div className="text-sm text-muted-foreground font-medium">Vidas Transformadas</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">120+</div>
            <div className="text-sm text-muted-foreground font-medium">Voluntários Ativos</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 7V17L12 22L23 17V7L12 2Z"/>
              </svg>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground font-medium">Campanhas Realizadas</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;