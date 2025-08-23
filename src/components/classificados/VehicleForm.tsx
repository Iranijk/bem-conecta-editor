import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X } from "lucide-react";

interface VehicleFormData {
  title: string;
  brand: string;
  model: string;
  year: number;
  price?: number;
  description?: string;
  contact_phone?: string;
  contact_email?: string;
  location?: string;
}

interface VehicleFormProps {
  editId?: string;
  onClose: () => void;
}

const VehicleForm = ({ editId, onClose }: VehicleFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<VehicleFormData>();

  useEffect(() => {
    if (editId) {
      loadVehicleData();
    }
  }, [editId]);

  const loadVehicleData = async () => {
    if (!editId) return;
    
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', editId)
        .single();

      if (error) throw error;

      if (data) {
        setValue('title', data.title);
        setValue('brand', data.brand);
        setValue('model', data.model);
        setValue('year', data.year);
        setValue('price', data.price || undefined);
        setValue('description', data.description || '');
        setValue('contact_phone', data.contact_phone || '');
        setValue('contact_email', data.contact_email || '');
        setValue('location', data.location || '');
      }
    } catch (error) {
      console.error('Erro ao carregar veículo:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do veículo",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: VehicleFormData) => {
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

      const vehicleData = {
        ...data,
        user_id: user.id,
      };

      let result;
      if (editId) {
        result = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', editId);
      } else {
        result = await supabase
          .from('vehicles')
          .insert([vehicleData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Sucesso",
        description: editId ? "Veículo atualizado com sucesso!" : "Veículo cadastrado com sucesso!",
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar veículo:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar veículo. Tente novamente.",
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
          <CardTitle>{editId ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Anúncio *</Label>
              <Input
                id="title"
                {...register("title", { required: "Título é obrigatório" })}
                placeholder="Ex: Caminhão Mercedes 2015"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marca *</Label>
              <Input
                id="brand"
                {...register("brand", { required: "Marca é obrigatória" })}
                placeholder="Ex: Mercedes, Volvo, Scania"
              />
              {errors.brand && (
                <p className="text-sm text-destructive">{errors.brand.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                {...register("model", { required: "Modelo é obrigatório" })}
                placeholder="Ex: Atego 2426"
              />
              {errors.model && (
                <p className="text-sm text-destructive">{errors.model.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Ano *</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { 
                  required: "Ano é obrigatório",
                  min: { value: 1900, message: "Ano inválido" },
                  max: { value: new Date().getFullYear() + 1, message: "Ano inválido" }
                })}
                placeholder="Ex: 2015"
              />
              {errors.year && (
                <p className="text-sm text-destructive">{errors.year.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="Ex: 150000.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Ex: São Paulo - SP"
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
              placeholder="Descreva as características do veículo, estado de conservação, etc."
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
              {editId ? 'Atualizar' : 'Cadastrar'} Veículo
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

export default VehicleForm;