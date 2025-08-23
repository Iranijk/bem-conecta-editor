import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VehicleForm from "@/components/classificados/VehicleForm";
import FreightForm from "@/components/classificados/FreightForm";
import JobForm from "@/components/classificados/JobForm";
import VehiclesList from "@/components/classificados/VehiclesList";
import FreightsList from "@/components/classificados/FreightsList";
import JobsList from "@/components/classificados/JobsList";

const Classificados = () => {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [showForm, setShowForm] = useState<{
    type: "vehicle" | "freight" | "job" | null;
    editId?: string;
  }>({ type: null });

  const handleNewClick = (type: "vehicle" | "freight" | "job") => {
    setShowForm({ type });
  };

  const handleEdit = (type: "vehicle" | "freight" | "job", id: string) => {
    setShowForm({ type, editId: id });
  };

  const handleFormClose = () => {
    setShowForm({ type: null });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Classificados MRH</h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie seus anúncios de veículos, fretes e empregos
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vehicles">Veículos</TabsTrigger>
            <TabsTrigger value="freights">Fretes</TabsTrigger>
            <TabsTrigger value="jobs">Empregos</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Veículos</CardTitle>
                    <CardDescription>
                      Anuncie e encontre veículos para compra e venda
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => handleNewClick("vehicle")}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Veículo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showForm.type === "vehicle" ? (
                  <VehicleForm 
                    editId={showForm.editId} 
                    onClose={handleFormClose}
                  />
                ) : (
                  <VehiclesList onEdit={(id) => handleEdit("vehicle", id)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freights">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Fretes</CardTitle>
                    <CardDescription>
                      Ofereça ou procure serviços de frete
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => handleNewClick("freight")}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Frete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showForm.type === "freight" ? (
                  <FreightForm 
                    editId={showForm.editId} 
                    onClose={handleFormClose}
                  />
                ) : (
                  <FreightsList onEdit={(id) => handleEdit("freight", id)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Empregos</CardTitle>
                    <CardDescription>
                      Divulgue vagas ou encontre oportunidades de trabalho
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => handleNewClick("job")}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Vaga
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showForm.type === "job" ? (
                  <JobForm 
                    editId={showForm.editId} 
                    onClose={handleFormClose}
                  />
                ) : (
                  <JobsList onEdit={(id) => handleEdit("job", id)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Classificados;