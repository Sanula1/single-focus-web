import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, LogIn, MessageCircle, Users, GraduationCap, Building, Sparkles, User, UserCheck, Clock, Shield } from "lucide-react";
import { useState } from "react";
import LMSCharacter from "./LMSCharacter";
import SecurityElement from "./SecurityElement";
import WhiteboardSection from "./WhiteboardSection";
import TextToVideoSections from "./TextToVideoSections";
import WebsitePreviewSection from "./WebsitePreviewSection";
const LMSHomepage = () => {
  const [isTransformed, setIsTransformed] = useState(false);
  const handleLMSClick = () => {
    setIsTransformed(true);
    // Reset after animation completes
    setTimeout(() => setIsTransformed(false), 4000);
  };
  return (
    <>
      {/* Main LMS Homepage Section */}
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary-light/10 relative overflow-hidden">
        {/* Sri Lankan Flag Accent */}
        <div className="absolute top-4 right-4 w-8 h-6 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-sm opacity-60 z-20 shadow-lg"></div>
        
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            transform: `scale(${0.5 + Math.random() * 1.5})`
          }} />)}
        </div>

        {/* Geometric Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full animate-spin" style={{
            animationDuration: '20s'
          }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-primary/50 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-primary rotate-45 animate-bounce" style={{
            animationDuration: '3s'
          }}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-primary/30 rounded-full animate-ping" style={{
            animationDuration: '4s'
          }}></div>
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-8 w-8" />
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-primary hover:text-primary-dark transition-colors duration-300" onClick={() => window.location.href = '/student-id'}>
              Student ID
            </Button>
            <Button variant="ghost" className="text-primary hover:text-primary-dark transition-colors duration-300">
              Customers
            </Button>
            <Button variant="ghost" className="text-primary hover:text-primary-dark transition-colors duration-300">
              Pricing
            </Button>
            <Button variant="ghost" className="text-primary hover:text-primary-dark transition-colors duration-300" onClick={() => window.location.href = '/guidance'}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Guidance
            </Button>
            <Button variant="outline" className="gap-2 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <LogIn className="w-4 h-4" />
              Login to SurakshaLMS
            </Button>
          </nav>
        </header>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute top-6 right-6 z-20">
          <Button variant="outline" size="sm" className="backdrop-blur-sm border-primary/20">
            <Building className="w-4 h-4" />
          </Button>
        </div>

        {/* Blue Characters Moving Toward LMS */}
        <LMSCharacter type="student" color="blue" position="top-left" isMovingToward={!isTransformed} />
        <LMSCharacter type="teacher" color="blue" position="top-right" isMovingToward={!isTransformed} />
        <LMSCharacter type="institute" color="blue" position="top-center" isMovingToward={!isTransformed} />

        {/* Central LMS Portal */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {/* Mission Statement */}
          <div className="text-center mb-8 z-10">
            <img alt="SurakshaLMS" className="h-16 md:h-24 w-auto mb-4 animate-fade-in" src="/lovable-uploads/6678135b-8997-4d89-82a1-badde05b90d8.png" />
            <h2 style={{
              animationDelay: '0.5s'
            }} className="text-2xl font-semibold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent mb-2 animate-fade-in md:text-2xl">One LMS. One Nation. One Future</h2>
            
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto animate-fade-in" style={{
              animationDelay: '1.5s'
            }}>
            </p>
          </div>

          <div className="relative">
            {/* Security Elements */}
            <SecurityElement position="top" />
            <SecurityElement position="right" />
            <SecurityElement position="bottom" />
            <SecurityElement position="left" />
            
            {/* Main LMS Button */}
            <div className="relative mb-8">
              <Button size="lg" onClick={handleLMSClick} className="
                  px-12 py-6 md:px-16 md:py-8 text-2xl md:text-4xl font-bold rounded-3xl
                  bg-primary hover:bg-primary-dark
                  text-primary-foreground
                  lms-glow
                  transform hover:scale-105 transition-all duration-300
                  shadow-2xl
                  border-4 border-primary-light/50
                  animate-fade-in
                " style={{
              animationDelay: '2s'
            }}>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 mr-3" />
                LMS LOGIN
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3" />
              </Button>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl -z-10 animate-pulse"></div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{
              animationDelay: '2.5s'
            }}>
              <Button variant="outline" size="lg" className="gap-2 px-8 py-3 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Users className="w-5 h-5" />
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Evolution Characters Moving Away from LMS */}
        <LMSCharacter type="student" color="evolution" position="bottom-left" isMovingToward={isTransformed} />
        <LMSCharacter type="teacher" color="evolution" position="bottom-right" isMovingToward={isTransformed} />
        <LMSCharacter type="institute" color="evolution" position="bottom-center" isMovingToward={isTransformed} />

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--lms-blue))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--lms-blue))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--evolution-dark))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--evolution-dark))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Lines from top corners to center */}
          <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="url(#blueGradient)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="90%" y1="20%" x2="50%" y2="50%" stroke="url(#blueGradient)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
          </line>
          
          {/* Lines from center to bottom corners */}
          <line x1="50%" y1="50%" x2="10%" y2="80%" stroke="url(#evolutionGradient)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="50%" x2="90%" y2="80%" stroke="url(#evolutionGradient)" strokeWidth="2" strokeDasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Floating Chatbot */}
        <div className="fixed bottom-6 right-6 z-30 animate-bounce">
          <Button size="icon" className="w-12 h-12 rounded-full bg-primary hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>

        {/* Footer Stats */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8 text-xs text-muted-foreground opacity-60">
          <div className="text-center">
            <div className="font-semibold text-primary">10K+</div>
            <div>Students</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-primary">500+</div>
            <div>Teachers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-primary">50+</div>
            <div>Institutes</div>
          </div>
        </div>
      </div>

      {/* User Roles Tabs Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Role
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access your personalized dashboard and features based on your role in the education system
            </p>
          </div>

          <Tabs defaultValue="student" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="student" className="flex flex-col gap-2 py-4 px-2 text-xs md:text-sm">
                <User className="w-5 h-5" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger value="parent" className="flex flex-col gap-2 py-4 px-2 text-xs md:text-sm">
                <Users className="w-5 h-5" />
                <span>Parent</span>
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex flex-col gap-2 py-4 px-2 text-xs md:text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>Teacher</span>
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex flex-col gap-2 py-4 px-2 text-xs md:text-sm">
                <Clock className="w-5 h-5" />
                <span className="hidden md:block">Attendance Marker</span>
                <span className="md:hidden">Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex flex-col gap-2 py-4 px-2 text-xs md:text-sm">
                <Shield className="w-5 h-5" />
                <span className="hidden md:block">Institute Admin</span>
                <span className="md:hidden">Admin</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-6">
              <div className="bg-card rounded-lg p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Student Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Access your courses, assignments, grades, and communicate with teachers and classmates.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">My Courses</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Assignments</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Grades</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Schedule</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parent" className="space-y-6">
              <div className="bg-card rounded-lg p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Parent Dashboard</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor your child's academic progress, attendance, and communicate with teachers.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Child's Progress</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Attendance</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Messages</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Events</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-6">
              <div className="bg-card rounded-lg p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Teacher Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Manage your classes, create assignments, track student progress, and communicate with parents.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">My Classes</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Grade Book</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Lesson Plans</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Reports</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <div className="bg-card rounded-lg p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Attendance Management</h3>
                <p className="text-muted-foreground mb-6">
                  Mark student attendance, track patterns, and generate attendance reports.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Daily Marking</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Reports</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Analytics</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Notifications</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-6">
              <div className="bg-card rounded-lg p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Institute Administration</h3>
                <p className="text-muted-foreground mb-6">
                  Manage the entire institution, users, courses, and system settings.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">User Management</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Course Setup</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">System Settings</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="font-semibold text-primary">Analytics</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Whiteboard Animation Section */}
      <WhiteboardSection />

      {/* Text to Video Sections */}
      <TextToVideoSections />

      {/* Website Preview Section */}
      <WebsitePreviewSection />
    </>
  );
};
export default LMSHomepage;