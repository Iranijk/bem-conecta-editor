import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Phone, Mail, MapPin, Calendar, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price?: number;
  description?: string;
  contact_phone?: string;
  contact_email?: string;
  location?: string;
  created_at: string;
}

interface VehiclesListProps {
  onEdit: (id: string) => void;
}

const VehiclesList = ({ onEdit }: VehiclesListProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Erro ao carregar veículos:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar veículos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Veículo excluído com sucesso!",
      });

      loadVehicles();
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir veículo",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Preço a consultar';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum veículo cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                <CardDescription>
                  {vehicle.brand} {vehicle.model} • {vehicle.year}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(vehicle.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-lg font-semibold">
                  {formatPrice(vehicle.price)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(vehicle.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>

              {vehicle.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {vehicle.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                {vehicle.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vehicle.location}
                  </div>
                )}
                {vehicle.contact_phone && (
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-1" />
                    {vehicle.contact_phone}
                  </div>
                )}
                {vehicle.contact_email && (
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    {vehicle.contact_email}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VehiclesList;