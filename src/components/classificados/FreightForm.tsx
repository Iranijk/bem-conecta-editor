import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";

interface FreightFormData {
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
}

interface FreightFormProps {
  editId?: string;
  onClose: () => void;
}

const FreightForm = ({ editId, onClose }: FreightFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FreightFormData>();

  useEffect(() => {
    if (editId) {
      loadFreightData();
    }
  }, [editId]);

  const loadFreightData = async () => {
    if (!editId) return;
    
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('freights')
        .select('*')
        .eq('id', editId)
        .single();

      if (error) throw error;

      if (data) {
        setValue('title', data.title);
        setValue('origin_city', data.origin_city);
        setValue('destination_city', data.destination_city);
        setValue('cargo_type', data.cargo_type);
        setValue('weight', data.weight || undefined);
        setValue('price', data.price || undefined);
        setValue('departure_date', data.departure_date || '');
        setValue('description', data.description || '');
        setValue('contact_phone', data.contact_phone || '');
        setValue('contact_email', data.contact_email || '');
        setValue('vehicle_type', data.vehicle_type || '');
      }
    } catch (error) {
      console.error('Erro ao carregar frete:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do frete",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: FreightFormData) => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para criar um anúncio",
          variant: "destructive",
        });
        return;
      }

      const freightData = {
        ...data,
        user_id: user.id,
        departure_date: data.departure_date || null,
      };

      let result;
      if (editId) {
        result = await supabase
          .from('freights')
          .update(freightData)
          .eq('id', editId);
      } else {
        result = await supabase
          .from('freights')
          .insert([freightData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Sucesso",
        description: editId ? "Frete atualizado com sucesso!" : "Frete cadastrado com sucesso!",
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar frete:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar frete. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{editId ? 'Editar Frete' : 'Cadastrar Novo Frete'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Frete *</Label>
              <Input
                id="title"
                {...register("title", { required: "Título é obrigatório" })}
                placeholder="Ex: Carga de São Paulo para Rio de Janeiro"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo_type">Tipo de Carga *</Label>
              <Input
                id="cargo_type"
                {...register("cargo_type", { required: "Tipo de carga é obrigatório" })}
                placeholder="Ex: Eletrônicos, Alimentos, Móveis"
              />
              {errors.cargo_type && (
                <p className="text-sm text-destructive">{errors.cargo_type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin_city">Cidade de Origem *</Label>
              <Input
                id="origin_city"
                {...register("origin_city", { required: "Cidade de origem é obrigatória" })}
                placeholder="Ex: São Paulo - SP"
              />
              {errors.origin_city && (
                <p className="text-sm text-destructive">{errors.origin_city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination_city">Cidade de Destino *</Label>
              <Input
                id="destination_city"
                {...register("destination_city", { required: "Cidade de destino é obrigatória" })}
                placeholder="Ex: Rio de Janeiro - RJ"
              />
              {errors.destination_city && (
                <p className="text-sm text-destructive">{errors.destination_city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                {...register("weight")}
                placeholder="Ex: 1500.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Valor do Frete (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="Ex: 2500.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure_date">Data de Partida</Label>
              <Input
                id="departure_date"
                type="date"
                {...register("departure_date")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle_type">Tipo de Veículo</Label>
              <Input
                id="vehicle_type"
                {...register("vehicle_type")}
                placeholder="Ex: Caminhão, Carreta, Van"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone">Telefone para Contato</Label>
              <Input
                id="contact_phone"
                {...register("contact_phone")}
                placeholder="Ex: (11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_email">Email para Contato</Label>
              <Input
                id="contact_email"
                type="email"
                {...register("contact_email")}
                placeholder="Ex: contato@exemplo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva detalhes sobre a carga, condições especiais, etc."
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editId ? 'Atualizar' : 'Cadastrar'} Frete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreightForm;