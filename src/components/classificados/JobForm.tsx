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

interface JobFormData {
  title: string;
  company_name: string;
  job_type: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  description?: string;
  requirements?: string;
  contact_phone?: string;
  contact_email?: string;
}

interface JobFormProps {
  editId?: string;
  onClose: () => void;
}

const JobForm = ({ editId, onClose }: JobFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<JobFormData>();

  useEffect(() => {
    if (editId) {
      loadJobData();
    }
  }, [editId]);

  const loadJobData = async () => {
    if (!editId) return;
    
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', editId)
        .single();

      if (error) throw error;

      if (data) {
        setValue('title', data.title);
        setValue('company_name', data.company_name);
        setValue('job_type', data.job_type);
        setValue('location', data.location);
        setValue('salary_min', data.salary_min || undefined);
        setValue('salary_max', data.salary_max || undefined);
        setValue('description', data.description || '');
        setValue('requirements', data.requirements || '');
        setValue('contact_phone', data.contact_phone || '');
        setValue('contact_email', data.contact_email || '');
      }
    } catch (error) {
      console.error('Erro ao carregar vaga:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados da vaga",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: JobFormData) => {
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

      const jobData = {
        ...data,
        user_id: user.id,
      };

      let result;
      if (editId) {
        result = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', editId);
      } else {
        result = await supabase
          .from('jobs')
          .insert([jobData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Sucesso",
        description: editId ? "Vaga atualizada com sucesso!" : "Vaga cadastrada com sucesso!",
      });

      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar vaga:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar vaga. Tente novamente.",
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
          <CardTitle>{editId ? 'Editar Vaga' : 'Cadastrar Nova Vaga'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Vaga *</Label>
              <Input
                id="title"
                {...register("title", { required: "Título é obrigatório" })}
                placeholder="Ex: Motorista de Caminhão"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Nome da Empresa *</Label>
              <Input
                id="company_name"
                {...register("company_name", { required: "Nome da empresa é obrigatório" })}
                placeholder="Ex: Transportadora ABC"
              />
              {errors.company_name && (
                <p className="text-sm text-destructive">{errors.company_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_type">Tipo de Emprego *</Label>
              <Input
                id="job_type"
                {...register("job_type", { required: "Tipo de emprego é obrigatório" })}
                placeholder="Ex: CLT, Freelancer, Temporário"
              />
              {errors.job_type && (
                <p className="text-sm text-destructive">{errors.job_type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                {...register("location", { required: "Localização é obrigatória" })}
                placeholder="Ex: São Paulo - SP"
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_min">Salário Mínimo (R$)</Label>
              <Input
                id="salary_min"
                type="number"
                step="0.01"
                {...register("salary_min")}
                placeholder="Ex: 3000.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_max">Salário Máximo (R$)</Label>
              <Input
                id="salary_max"
                type="number"
                step="0.01"
                {...register("salary_max")}
                placeholder="Ex: 5000.00"
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
                placeholder="Ex: rh@empresa.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição da Vaga</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva as responsabilidades e benefícios da vaga..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos</Label>
            <Textarea
              id="requirements"
              {...register("requirements")}
              placeholder="Liste os requisitos necessários para a vaga..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editId ? 'Atualizar' : 'Cadastrar'} Vaga
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

export default JobForm;