import { Button } from "@/components/ui/button";
import { Search, Truck, Package, Heart, MapPin, Clock } from "lucide-react";

const ClassificadosSection = () => {
  const categories = [
    {
      icon: Truck,
      title: "Fretes",
      description: "Cargas disponíveis e caminhões para frete",
      count: "120+ anúncios",
      color: "text-blue-500"
    },
    {
      icon: Package,
      title: "Cargas",
      description: "Cargas para transporte em todo o Brasil",
      count: "85+ anúncios", 
      color: "text-green-500"
    },
    {
      icon: Heart,
      title: "Doações",
      description: "Pedidos de ajuda e ofertas de doações",
      count: "45+ anúncios",
      color: "text-red-500"
    }
  ];

  const recentAds = [
    {
      id: 1,
      title: "Carga São Paulo → Rio de Janeiro",
      type: "Frete",
      location: "São Paulo, SP",
      time: "2 horas atrás",
      description: "Carga seca, 15 toneladas. Urgente para entrega amanhã.",
      tags: ["Urgente", "Carga Seca"]
    },
    {
      id: 2,
      title: "Doação de Cestas Básicas",
      type: "Doação",
      location: "Campinas, SP",
      time: "4 horas atrás",
      description: "Família de caminhoneiro precisa de ajuda com alimentação.",
      tags: ["Ajuda", "Emergencial"]
    },
    {
      id: 3,
      title: "Caminhão Disponível para Frete",
      type: "Frete",
      location: "Belo Horizonte, MG",
      time: "6 horas atrás",
      description: "Caminhão truck disponível para qualquer destino no Sudeste.",
      tags: ["Disponível", "Sudeste"]
    }
  ];

  return (
    <section id="classificados" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Classificados</span> do Bem
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Um espaço dedicado para conectar caminhoneiros, oferecendo oportunidades 
            de frete, cargas e apoio mútuo na estrada.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar fretes, cargas ou ajuda..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-lg"
              />
            </div>
            <Button 
              size="lg" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6"
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group text-center p-8 bg-card rounded-2xl border border-border card-hover cursor-pointer"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <category.icon className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-muted-foreground mb-3">
                {category.description}
              </p>
              <span className="text-sm font-semibold text-primary">
                {category.count}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Ads */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Anúncios <span className="gradient-text">Recentes</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAds.map((ad) => (
              <div 
                key={ad.id}
                className="bg-card p-6 rounded-2xl border border-border card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                    {ad.type}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {ad.time}
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-2 hover:text-primary transition-colors">
                  {ad.title}
                </h4>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {ad.location}
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {ad.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {ad.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="px-8 py-4 text-lg font-semibold mr-4 mb-4"
          >
            Publicar Anúncio
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-2"
          >
            Ver Todos os Classificados
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClassificadosSection;