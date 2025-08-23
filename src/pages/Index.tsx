import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import ProjectsSection from "@/components/ui/projects-section";
import ClassificadosSection from "@/components/ui/classificados-section";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <ClassificadosSection />
    </main>
  );
};

export default Index;
