import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag } from "lucide-react";
import solidarityImage from "@/assets/solidarity-image.jpg";
import transportImage from "@/assets/transport-help.jpg";

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Ajuda a Famílias de Caminhoneiros",
      category: "Ação Social",
      year: "2025",
      location: "Nacional",
      description: "Distribuição de cestas básicas para famílias de caminhoneiros em situação de dificuldade financeira, oferecendo suporte alimentar essencial.",
      image: solidarityImage,
      categoryColor: "bg-green-500/10 text-green-500"
    },
    {
      id: 2,
      title: "Apoio com Diárias e Fretes",
      category: "Suporte",
      year: "2025",
      location: "Nacional", 
      description: "Auxílio financeiro com diárias e agilização no carregamento e entrega de fretes para motoristas em situação de emergência.",
      image: transportImage,
      categoryColor: "bg-blue-500/10 text-blue-500"
    },
    {
      id: 3,
      title: "Aulas de Informática e Capacitação",
      category: "Educação",
      year: "2025",
      location: "São Paulo, SP",
      description: "Cursos gratuitos de informática e capacitação profissional para caminhoneiros, ampliando suas oportunidades no mercado de trabalho.",
      image: solidarityImage,
      categoryColor: "bg-purple-500/10 text-purple-500"
    }
  ];

  return (
    <section id="projetos" className="py-24 bg-gradient-to-br from-background via-card/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conheça as iniciativas que estão transformando vidas e fortalecendo 
            comunidades através da solidariedade e do apoio mútuo.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.categoryColor} backdrop-blur-sm border border-current/20`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Ver Todos os Projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;