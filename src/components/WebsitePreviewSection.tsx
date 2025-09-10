import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Play, Users, GraduationCap, Building, TrendingUp, Music, Briefcase, Video } from "lucide-react";

const WebsitePreviewSection = () => {
  const categories = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "enterprise", label: "Enterprise", icon: Building },
    { id: "startup", label: "Startup", icon: TrendingUp },
    { id: "music", label: "Music", icon: Music },
    { id: "freelance", label: "Freelance", icon: Briefcase },
    { id: "content", label: "Content Creator", icon: Video }
  ];

  const testimonials = {
    education: {
      name: "Priya Sharma",
      role: "Mathematics Teacher",
      institute: "Colombo International School",
      avatar: "PS",
      rating: 5,
      quote: "SurakshaLMS has transformed how I manage my classes. The integrated whiteboard and video tools make remote teaching incredibly engaging for my students.",
      preview: "math-dashboard"
    },
    enterprise: {
      name: "Rajesh Fernando",
      role: "Training Director",
      institute: "Tech Solutions Ltd",
      avatar: "RF",
      rating: 5,
      quote: "Our corporate training programs have never been more efficient. The analytics and progress tracking help us identify skill gaps instantly.",
      preview: "corporate-training"
    },
    startup: {
      name: "Amara Wickramasinghe",
      role: "Founder & CEO",
      institute: "EduTech Innovations",
      avatar: "AW",
      rating: 5,
      quote: "From prototype to production, SurakshaLMS scaled with our growing team. The customizable forms and user management are game-changers.",
      preview: "startup-dashboard"
    },
    music: {
      name: "Dinesh Jayawardene",
      role: "Music Instructor",
      institute: "Melody Music Academy",
      avatar: "DJ",
      rating: 5,
      quote: "Teaching music online seemed impossible until I found SurakshaLMS. The video integration and assignment features work perfectly for practical lessons.",
      preview: "music-platform"
    },
    freelance: {
      name: "Lakshika Perera",
      role: "Independent Tutor",
      institute: "Private Tutoring Services",
      avatar: "LP",
      rating: 5,
      quote: "Managing multiple students and their progress was overwhelming. Now I have everything organized in one place with professional-grade tools.",
      preview: "tutor-dashboard"
    },
    content: {
      name: "Kamal Bandara",
      role: "Educational Content Creator",
      institute: "Knowledge Hub YouTube",
      avatar: "KB",
      rating: 5,
      quote: "Creating structured learning paths for my YouTube audience became seamless. The text-to-video features save me hours of content creation.",
      preview: "content-studio"
    }
  };

  const previewMockups = {
    "math-dashboard": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-blue-600 text-white p-2 rounded text-sm font-medium mb-3">Mathematics Dashboard</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 rounded text-xs">Algebra</div>
          <div className="bg-green-50 p-2 rounded text-xs">Geometry</div>
          <div className="bg-purple-50 p-2 rounded text-xs">Calculus</div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
          </div>
          <div className="text-xs text-gray-600">Class Progress: 75%</div>
        </div>
      </div>
    ),
    "corporate-training": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-gray-800 text-white p-2 rounded text-sm font-medium mb-3">Corporate Training Hub</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-50 p-2 rounded">
            <div className="text-xs font-medium">Leadership</div>
            <div className="text-xs text-gray-600">24 employees</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-xs font-medium">Skills Dev</div>
            <div className="text-xs text-gray-600">18 completed</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-600" />
          <div className="text-xs">156 Active Learners</div>
        </div>
      </div>
    ),
    "startup-dashboard": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded text-sm font-medium mb-3">
          Startup Learning Platform
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs">Team Onboarding</span>
            <Badge className="text-xs">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs">Product Training</span>
            <Badge variant="outline" className="text-xs">Draft</Badge>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-gray-600 mb-1">Growth Metrics</div>
          <div className="flex gap-2">
            <div className="w-4 h-8 bg-purple-200 rounded"></div>
            <div className="w-4 h-12 bg-purple-400 rounded"></div>
            <div className="w-4 h-16 bg-purple-600 rounded"></div>
          </div>
        </div>
      </div>
    ),
    "music-platform": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded text-sm font-medium mb-3">
          Music Academy Portal
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-50 p-2 rounded text-center">
            <Music className="w-6 h-6 mx-auto text-red-500 mb-1" />
            <div className="text-xs">Piano Lessons</div>
          </div>
          <div className="bg-orange-50 p-2 rounded text-center">
            <Play className="w-6 h-6 mx-auto text-orange-500 mb-1" />
            <div className="text-xs">Practice Videos</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          Next Session: Guitar Basics - 2:00 PM
        </div>
      </div>
    ),
    "tutor-dashboard": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-green-600 text-white p-2 rounded text-sm font-medium mb-3">Private Tutor Dashboard</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs">Sarah - Mathematics</span>
            <span className="text-xs text-green-600">Completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">John - Physics</span>
            <span className="text-xs text-yellow-600">In Progress</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Maya - Chemistry</span>
            <span className="text-xs text-blue-600">Scheduled</span>
          </div>
        </div>
        <div className="mt-3 bg-green-50 p-2 rounded">
          <div className="text-xs font-medium">Today's Earnings: Rs. 2,500</div>
        </div>
      </div>
    ),
    "content-studio": (
      <div className="bg-white rounded-lg shadow-lg p-4 w-full h-48 relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-2 rounded text-sm font-medium mb-3">
          Content Creation Studio
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-50 p-2 rounded">
            <Video className="w-4 h-4 text-blue-600 mb-1" />
            <div className="text-xs">Video Courses</div>
            <div className="text-xs text-gray-600">12 Published</div>
          </div>
          <div className="bg-cyan-50 p-2 rounded">
            <TrendingUp className="w-4 h-4 text-cyan-600 mb-1" />
            <div className="text-xs">Engagement</div>
            <div className="text-xs text-gray-600">89% Rate</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="text-xs">Next Upload: </div>
          <Badge className="text-xs">React Basics</Badge>
        </div>
      </div>
    )
  };

  return (
    <div className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            See how professionals across different industries are transforming their teaching and training with SurakshaLMS
          </p>
        </div>

        <Tabs defaultValue="education" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-12 bg-muted/50 p-1 rounded-lg">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex flex-col gap-1 py-3 px-2 text-xs"
              >
                <category.icon className="w-4 h-4" />
                <span className="hidden md:block">{category.label}</span>
                <span className="md:hidden">{category.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(testimonials).map(([key, testimonial]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Preview Mockup */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full"></div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/10 rounded-full"></div>
                  <Card className="overflow-hidden border-2 border-primary/10 shadow-2xl">
                    <CardContent className="p-0">
                      {previewMockups[testimonial.preview as keyof typeof previewMockups]}
                    </CardContent>
                  </Card>
                  
                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg">
                    <div className="w-3 h-1 bg-green-500 rounded-full mb-1"></div>
                    <div className="w-2 h-1 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-4 h-1 bg-gray-200 rounded-full"></div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-lg font-semibold text-primary">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {testimonial.institute}
                      </div>
                    </div>
                  </div>

                  <Button className="group" size="lg">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Teaching?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of educators who have already revolutionized their teaching experience with SurakshaLMS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
                <Button variant="outline" size="lg">
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsitePreviewSection;