import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 py-24 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Simple & Beautiful
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Sometimes the most powerful solutions are the simplest ones. 
              Clean design, clear purpose, perfect execution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>

          <Card className="mt-16 p-8 bg-card border border-border">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Clean Design</h3>
                <p className="text-muted-foreground">
                  Focused on what matters most, without unnecessary complexity.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Fast Performance</h3>
                <p className="text-muted-foreground">
                  Optimized for speed and efficiency in every interaction.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">User Focused</h3>
                <p className="text-muted-foreground">
                  Built with the user experience as the top priority.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Index;
