import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Play, 
  ArrowRight, 
  MessageCircle, 
  School, 
  Users, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  BookOpen,
  GraduationCap,
  Trophy
} from "lucide-react";

const SurakshaLandingPage = () => {
  const [counts, setCounts] = useState({ schools: 0, students: 0, organizations: 0 });

  // Counter animation effect
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof counts) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(1000, 'schools');
          animateCounter(50000, 'students');
          animateCounter(2000, 'organizations');
        }
      });
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient">SurakshaLMS</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="hover:text-primary">Home</Button>
            <Button variant="ghost" className="hover:text-primary">Features</Button>
            <Button variant="ghost" className="hover:text-primary">About</Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Video Preview */}
            <div className="lg:col-span-2">
              <Card className="glass-card hover-bounce cursor-pointer group">
                <CardContent className="p-0 relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/30 rounded-lg flex items-center justify-center">
                    <Button 
                      size="icon" 
                      className="h-16 w-16 rounded-full bg-background/90 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:scale-110"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                  <img 
                    src="/lovable-uploads/6678135b-8997-4d89-82a1-badde05b90d8.png" 
                    alt="SurakshaLMS Preview" 
                    className="w-full h-full object-cover rounded-lg opacity-50"
                  />
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                  Welcome to SurakshaLMS
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Revolutionizing education through advanced learning management solutions. 
                  Connect students, teachers, and institutions in a seamless digital environment.
                </p>
              </div>
            </div>

            {/* Navigation Card */}
            <div className="lg:col-span-1">
              <Card className="glass-card hover-bounce cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <ArrowRight className="h-12 w-12 mx-auto mb-4 text-primary group-hover:translate-x-2 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">Explore Features</h3>
                  <p className="text-muted-foreground">Discover what makes SurakshaLMS special</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Chat Bot Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Smart Chat Bot</h2>
            <p className="text-lg text-muted-foreground">Connect with your students through popular messaging platforms</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* WhatsApp Bot */}
            <Card className="glass-card hover-bounce group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">WhatsApp Chat Bot</CardTitle>
                    <CardDescription>Instant communication via WhatsApp</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Instant assignment notifications</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Grade updates and feedback</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>24/7 student support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Interactive learning modules</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Telegram Bot */}
            <Card className="glass-card hover-bounce group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Telegram Chat Bot</CardTitle>
                    <CardDescription>Advanced features via Telegram</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>File sharing and downloads</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Group study coordination</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Automated reminders</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Voice message support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats-section" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card text-center hover-bounce animate-counter-up">
              <CardContent className="p-8">
                <School className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-gradient mb-2">
                  {counts.schools.toLocaleString()}+
                </div>
                <p className="text-lg font-medium text-muted-foreground">Schools</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center hover-bounce animate-counter-up">
              <CardContent className="p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-gradient mb-2">
                  {counts.students.toLocaleString()}+
                </div>
                <p className="text-lg font-medium text-muted-foreground">Students</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center hover-bounce animate-counter-up">
              <CardContent className="p-8">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-gradient mb-2">
                  {counts.organizations.toLocaleString()}+
                </div>
                <p className="text-lg font-medium text-muted-foreground">Organizations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SurakshaLMS Info Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Suraksha LMS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@suraksha-lms.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Colombo, Sri Lanka</span>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Online Learning Platforms</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Educational Management</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Student Achievement Tracking</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            2025 Copyright All Right Reserved - SurakshaLMS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SurakshaLandingPage;