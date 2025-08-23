import Navigation from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Target, Eye, Shield } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Nossa História</span>
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Nas estradas do Brasil, milhões de caminhoneiros e trabalhadores rodoviários enfrentam 
              desafios diários para manter o país em movimento. Longas jornadas, condições adversas 
              e a solidão da estrada fazem parte da rotina de quem transporta tudo o que chega até nós. 
              Mas quem cuida de quem nunca para?
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Foi com essa preocupação que nasceu o <span className="text-primary font-semibold">MRH – Movimento Rodoviário Humanitário</span>. 
              Uma iniciativa solidária que tem como missão levar apoio, dignidade e esperança para 
              aqueles que dedicam suas vidas ao transporte e logística no Brasil.
            </p>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Missão */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser um porto seguro para os trabalhadores rodoviários, oferecendo assistência social, 
                alimentação, saúde e suporte emocional. Queremos garantir que cada caminhoneiro saiba 
                que não está sozinho.
              </p>
            </CardContent>
          </Card>

          {/* Visão */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Construir uma rede de solidariedade que alcance cada vez mais pessoas nas estradas, 
                promovendo impacto positivo e transformando vidas por meio do voluntariado e da união.
              </p>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card className="card-hover">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Valores</h3>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos na força da empatia, na união como resposta às dificuldades e no poder 
                transformador do amor em ação. Nosso trabalho é guiado por integridade, acolhimento, 
                respeito e compromisso com quem mais precisa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nosso Compromisso */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-card via-card/80 to-card border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="gradient-text">Nosso Compromisso</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  O MRH não é apenas uma organização, é um movimento de pessoas que acreditam na 
                  força da solidariedade. Cada ação que realizamos é pensada para criar um impacto 
                  real e duradouro na vida de quem dedica sua existência às estradas brasileiras.
                </p>
                <p className="text-primary font-semibold text-xl">
                  Juntos, construímos uma rede de apoio que vai além da assistência emergencial. 
                  Oferecemos esperança, dignidade e a certeza de que ninguém precisa enfrentar 
                  os desafios da estrada sozinho.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2000+</div>
            <div className="text-sm text-muted-foreground font-medium">Vidas Transformadas</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">120+</div>
            <div className="text-sm text-muted-foreground font-medium">Voluntários Ativos</div>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground font-medium">Campanhas Realizadas</div>
          </div>

          <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border card-hover">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground font-medium">Apoio Disponível</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;