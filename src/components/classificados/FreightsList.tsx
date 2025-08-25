import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Phone, Mail, MapPin, Calendar, Truck, Package, Loader2, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Freight {
  id: string;
  title: string;
  origin_city: string;
  destination_city: string;
  cargo_type: string;
  weight?: number;
  price?: number;
  departure_date?: string;
  description?: string;
  contact_phone?: string;
  contact_email?: string;
  vehicle_type?: string;
  created_at: string;
}

interface FreightsListProps {
  onEdit: (id: string) => void;
}

const FreightsList = ({ onEdit }: FreightsListProps) => {
  const [freights, setFreights] = useState<Freight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    loadFreights();
    // Check authentication status
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const loadFreights = async () => {
    try {
      const { data, error } = await supabase
        .from('freights')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFreights(data || []);
    } catch (error) {
      console.error('Erro ao carregar fretes:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar fretes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este frete?')) return;

    try {
      const { error } = await supabase
        .from('freights')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Frete excluído com sucesso!",
      });

      loadFreights();
    } catch (error) {
      console.error('Erro ao excluir frete:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir frete",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Valor a consultar';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatWeight = (weight?: number) => {
    if (!weight) return '';
    return `${weight.toLocaleString('pt-BR')} kg`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (freights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum frete cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {freights.map((freight) => (
        <Card key={freight.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{freight.title}</CardTitle>
                <CardDescription>
                  {freight.origin_city} → {freight.destination_city}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(freight.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(freight.id)}
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
                  {formatPrice(freight.price)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(freight.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{freight.cargo_type}</span>
                </div>
                {freight.weight && (
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Peso:</span>
                    <span>{formatWeight(freight.weight)}</span>
                  </div>
                )}
                {freight.vehicle_type && (
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{freight.vehicle_type}</span>
                  </div>
                )}
                {freight.departure_date && (
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">Partida:</span>
                    <span>{formatDate(freight.departure_date)}</span>
                  </div>
                )}
              </div>

              {freight.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {freight.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                {user ? (
                  <>
                    {freight.contact_phone && (
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        {freight.contact_phone}
                      </div>
                    )}
                    {freight.contact_email && (
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        {freight.contact_email}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm">Faça login para ver contatos</span>
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

export default FreightsList;