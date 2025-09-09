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
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-10 w-10" />
              <div>
                <span className="text-2xl font-bold text-gradient">SurakshaLMS</span>
                <p className="text-sm text-muted-foreground italic">One LMS, One Nation, One Future</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" className="hover:text-primary text-sm">Home</Button>
              <Button variant="ghost" className="hover:text-primary text-sm">Features</Button>
              <Button variant="ghost" className="hover:text-primary text-sm">About</Button>
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                LMS Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-blue-50 to-background relative overflow-hidden">
        {/* Abstract Learning Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-blue-400/10 animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 rotate-45 bg-gradient-to-br from-blue-400/10 to-primary/10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-green-400/10 to-primary/10 animate-ping"></div>
          <div className="absolute top-20 right-1/3 w-8 h-8 rotate-12 bg-gradient-to-br from-purple-400/10 to-blue-400/10 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Video Preview */}
            <div className="lg:col-span-2">
              <Card className="glass-card hover-bounce cursor-pointer group shadow-2xl">
                <CardContent className="p-0 relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-blue-400/20 to-primary-dark/40 rounded-lg flex items-center justify-center">
                    <Button 
                      size="icon" 
                      className="h-20 w-20 rounded-full bg-background/95 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 shadow-lg"
                    >
                      <Play className="h-10 w-10 ml-1" />
                    </Button>
                  </div>
                  <img 
                    src="/lovable-uploads/6678135b-8997-4d89-82a1-badde05b90d8.png" 
                    alt="SurakshaLMS Preview" 
                    className="w-full h-full object-cover rounded-lg opacity-60"
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

      {/* Function Preview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video/Feature Preview */}
            <div className="order-2 lg:order-1">
              <Card className="glass-card hover-bounce group overflow-hidden">
                <CardContent className="p-0 relative">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0">
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-primary/20 animate-pulse"></div>
                      <div className="absolute top-1/3 right-8 w-6 h-6 rounded-full bg-blue-400/20 animate-bounce"></div>
                      <div className="absolute bottom-8 left-1/3 w-4 h-4 rounded-full bg-primary/30 animate-ping"></div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="relative z-10 text-center p-8">
                      <div className="mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-gradient mb-2">Interactive Learning</h3>
                        <p className="text-muted-foreground">Experience the future of education</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-xs">Smart Learning</p>
                        </div>
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-xs">Collaboration</p>
                        </div>
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-purple-600" />
                          </div>
                          <p className="text-xs">Achievements</p>
                        </div>
                        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-orange-600" />
                          </div>
                          <p className="text-xs">Resources</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Title, Paragraph & Logo */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <img 
                    src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" 
                    alt="SurakshaLMS Logo" 
                    className="w-24 h-24 mx-auto lg:mx-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" 
                  />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
                  Revolutionizing 
                  <span className="block text-primary">Digital Learning</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SurakshaLMS empowers educational institutions with cutting-edge technology, 
                  seamless integration, and intelligent features that transform traditional 
                  learning into an engaging digital experience. From automated assessments 
                  to real-time collaboration, we're building the future of education.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="glass-card p-4 text-center hover-bounce">
                    <div className="text-2xl font-bold text-primary mb-1">98%</div>
                    <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
                  </Card>
                  <Card className="glass-card p-4 text-center hover-bounce">
                    <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                    <p className="text-xs text-muted-foreground">Support Available</p>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started Today
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Chat Bot Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/20 via-primary/5 to-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-400/5 animate-bounce"></div>
        </div>
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
      <section id="stats-section" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/10 relative">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-primary/40 animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 rounded-full bg-blue-400/40 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-primary/60 animate-bounce"></div>
        </div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card text-center hover-bounce animate-counter-up group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <School className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform">
                  {counts.schools.toLocaleString()}+
                </div>
                <p className="text-lg font-medium text-muted-foreground">Schools</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center hover-bounce animate-counter-up group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                  <Users className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform">
                  {counts.students.toLocaleString()}+
                </div>
                <p className="text-lg font-medium text-muted-foreground">Students</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center hover-bounce animate-counter-up group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Building2 className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-105 transition-transform">
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
      <footer className="py-12 px-4 border-t bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left side - SurakshaLMS Contact */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4 flex items-center space-x-2">
                <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-8 w-8" />
                <span>SurakshaLMS – Contact</span>
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@suraksha-lms.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Right side - Categories */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>Online Learning Platforms</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  <GraduationCap className="h-4 w-4" />
                  <span>Educational Management</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                  <Trophy className="h-4 w-4" />
                  <span>Student Achievement Tracking</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom copyright */}
          <div className="border-t pt-8 text-center">
            <p className="text-muted-foreground">
              2025 © Copyright All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SurakshaLandingPage;