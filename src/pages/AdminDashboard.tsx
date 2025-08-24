import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Car, 
  Truck, 
  Briefcase, 
  FileText, 
  Upload,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Plus
} from "lucide-react";
import Navigation from "@/components/ui/navigation";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    volunteers: 0,
    vehicles: 0,
    freights: 0,
    jobs: 0,
  });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    summary: "",
    cover_image_url: "",
  });

  useEffect(() => {
    fetchStats();
    fetchBlogPosts();
  }, []);

  const fetchStats = async () => {
    try {
      const [volunteers, vehicles, freights, jobs] = await Promise.all([
        supabase.from("volunteers").select("id", { count: "exact" }),
        supabase.from("vehicles").select("id", { count: "exact" }),
        supabase.from("freights").select("id", { count: "exact" }),
        supabase.from("jobs").select("id", { count: "exact" }),
      ]);

      setStats({
        volunteers: volunteers.count || 0,
        vehicles: vehicles.count || 0,
        freights: freights.count || 0,
        jobs: jobs.count || 0,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("blog_posts")
        .insert([{
          ...newPost,
          is_published: false,
          author_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!",
      });

      setNewPost({ title: "", content: "", summary: "", cover_image_url: "" });
      setShowNewPost(false);
      fetchBlogPosts();
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar post.",
        variant: "destructive",
      });
    }
  };

  const togglePostStatus = async (postId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ 
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq("id", postId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `Post ${!currentStatus ? 'publicado' : 'despublicado'} com sucesso!`,
      });

      fetchBlogPosts();
    } catch (error) {
      console.error("Erro ao alterar status do post:", error);
      toast({
        title: "Erro",
        description: "Erro ao alterar status do post.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Área Administrativa
          </h1>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="ads">Anúncios</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Voluntários</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.volunteers}</div>
                    <p className="text-xs text-muted-foreground">
                      Total de voluntários cadastrados
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Veículos</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.vehicles}</div>
                    <p className="text-xs text-muted-foreground">
                      Anúncios de veículos ativos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fretes</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.freights}</div>
                    <p className="text-xs text-muted-foreground">
                      Fretes disponíveis
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Empregos</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.jobs}</div>
                    <p className="text-xs text-muted-foreground">
                      Vagas de emprego ativas
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ads" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Anúncios</CardTitle>
                  <CardDescription>
                    Aprovar, editar ou remover anúncios da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Funcionalidade em desenvolvimento - Em breve você poderá gerenciar todos os anúncios aqui.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gerenciar Blog</h2>
                <Button onClick={() => setShowNewPost(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Post
                </Button>
              </div>

              {showNewPost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Criar Novo Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreatePost} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="summary">Resumo</Label>
                        <Textarea
                          id="summary"
                          value={newPost.summary}
                          onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cover_image_url">URL da Imagem de Capa</Label>
                        <Input
                          id="cover_image_url"
                          type="url"
                          value={newPost.cover_image_url}
                          onChange={(e) => setNewPost({ ...newPost, cover_image_url: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="content">Conteúdo</Label>
                        <Textarea
                          id="content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          rows={8}
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit">Criar Post</Button>
                        <Button type="button" variant="outline" onClick={() => setShowNewPost(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription>{post.summary}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={post.is_published ? "default" : "secondary"}>
                            {post.is_published ? "Publicado" : "Rascunho"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePostStatus(post.id, post.is_published)}
                          >
                            {post.is_published ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            {post.is_published ? "Despublicar" : "Publicar"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Financeiros</CardTitle>
                  <CardDescription>
                    Upload de documentos para transparência
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Fazer Upload de Relatório
                    </Button>
                    <p className="text-center text-muted-foreground py-4">
                      Funcionalidade em desenvolvimento - Em breve você poderá fazer upload de relatórios financeiros.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;