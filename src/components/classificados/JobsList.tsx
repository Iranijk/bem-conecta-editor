import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Phone, Mail, MapPin, Calendar, Building2, Briefcase, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Job {
  id: string;
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
  created_at: string;
}

interface JobsListProps {
  onEdit: (id: string) => void;
}

const JobsList = ({ onEdit }: JobsListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Erro ao carregar vagas:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar vagas",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Vaga excluída com sucesso!",
      });

      loadJobs();
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir vaga",
        variant: "destructive",
      });
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salário a combinar';
    
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    if (min) {
      return `A partir de ${formatter.format(min)}`;
    }
    if (max) {
      return `Até ${formatter.format(max)}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma vaga cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {job.company_name}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(job.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(job.id)}
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
                  {formatSalary(job.salary_min, job.salary_max)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(job.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.job_type}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
              </div>

              {job.description && (
                <div>
                  <h4 className="font-medium text-sm mb-1">Descrição:</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                </div>
              )}

              {job.requirements && (
                <div>
                  <h4 className="font-medium text-sm mb-1">Requisitos:</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.requirements}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                {job.contact_phone && (
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="h-4 w-4 mr-1" />
                    {job.contact_phone}
                  </div>
                )}
                {job.contact_email && (
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-1" />
                    {job.contact_email}
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

export default JobsList;