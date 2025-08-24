import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Users, Sparkles, CheckCircle } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import { toast } from "@/hooks/use-toast";

const VolunteerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("volunteers")
        .insert([formData]);

      if (error) throw error;

      setShowThankYou(true);
      setFormData({ name: "", email: "", phone: "", city: "" });
    } catch (error) {
      console.error("Erro ao cadastrar voluntário:", error);
      toast({
        title: "Erro",
        description: "Erro ao realizar cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Seja um Voluntário
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Junte-se à nossa causa e faça a diferença na vida de muitas pessoas. 
            Cada gesto de solidariedade transforma vidas e constrói um futuro melhor.
          </p>

          {/* Vantagens */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Impacto Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sua contribuição gera mudanças reais na vida de pessoas que precisam de ajuda.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Comunidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Faça parte de uma rede de pessoas comprometidas com o bem social.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Desenvolva novas habilidades e cresça pessoalmente através do voluntariado.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Formulário */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Cadastre-se como Voluntário</CardTitle>
              <CardDescription>
                Preencha seus dados para se juntar ao nosso time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                    placeholder="Sua cidade"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Cadastrando..." : "Quero ser Voluntário"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pop-up de Agradecimento */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="text-center max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <DialogTitle className="text-2xl mb-4">Obrigado!</DialogTitle>
            <DialogDescription className="text-base space-y-4">
              <p>
                Seu cadastro foi realizado com sucesso! Sua participação é fundamental 
                para o crescimento da nossa ONG e para ajudarmos mais pessoas.
              </p>
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="font-semibold mb-2">Ajude ainda mais com uma doação via PIX:</p>
                <p className="text-2xl font-bold text-primary">mrhdobem@gmail.com</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Entraremos em contato em breve com mais informações sobre como você pode contribuir.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default VolunteerSignup;