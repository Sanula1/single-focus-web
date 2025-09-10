import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Eye, Edit, Share2, IdCard, Calendar, User, MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentID = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations on load
    setTimeout(() => setIsVisible(true), 300);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample student data - in real app this would come from API/database
  const studentData = {
    id: "123-456-879",
    name: "Martha Petersen", 
    dateOfBirth: "11/02/1987",
    gender: "Female",
    dateOfIssue: "01/02/2020",
    signature: "Martha",
    photo: "/lovable-uploads/4dd5ef0e-aca6-4da1-b2b8-a00536175721.png",
    email: "martha.petersen@surakshalms.edu.lk",
    phone: "+94 77 123 4567",
    address: "123 Galle Road, Colombo 03",
    course: "Software Engineering",
    year: "3rd Year",
    faculty: "Computing & Technology"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary-light/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5}) translateY(${scrollY * 0.1}px)`
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full animate-spin"
          style={{
            animationDuration: '20s',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        <div 
          className="absolute bottom-32 right-32 w-24 h-24 border border-primary/50 rounded-full animate-pulse"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="gap-2 text-primary hover:text-primary-dark transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-6 w-6" />
            <span className="font-semibold text-primary">SurakshaLMS</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" className="gap-2 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent mb-4">
              Student ID Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access and manage your digital student identification with advanced security features
            </p>
          </div>

          {/* Student ID Cards Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Digital ID Card */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <Card className="relative bg-gradient-to-br from-primary/5 to-primary-light/10 border-primary/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-light/5" />
                
                {/* Card Header */}
                <div className="relative p-6 bg-gradient-to-r from-primary to-primary-dark text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="h-8 w-8" />
                      <div>
                        <h3 className="font-bold text-lg">SurakshaLMS</h3>
                        <p className="text-primary-light text-sm">Student ID Card</p>
                      </div>
                    </div>
                    <IdCard className="w-6 h-6 text-primary-light" />
                  </div>
                </div>

                <CardContent className="relative p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Student Photo & Basic Info */}
                    <div className="text-center">
                      <div className="relative mx-auto w-32 h-32 mb-4">
                        <img 
                          src={studentData.photo} 
                          alt="Student Photo" 
                          className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent" />
                      </div>
                      
                      <h2 className="text-xl font-bold text-foreground mb-2">{studentData.name}</h2>
                      <p className="text-sm text-muted-foreground mb-1">ID: {studentData.id}</p>
                      <p className="text-sm text-primary font-medium">{studentData.course}</p>
                    </div>

                    {/* Student Details */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Date of Birth</p>
                          <p className="font-medium text-sm">{studentData.dateOfBirth}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Gender</p>
                          <p className="font-medium text-sm">{studentData.gender}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Issue Date</p>
                          <p className="font-medium text-sm">{studentData.dateOfIssue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Year</p>
                          <p className="font-medium text-sm">{studentData.year}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Faculty</p>
                        <p className="font-medium text-sm">{studentData.faculty}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Digital Signature</p>
                        <p className="font-signature text-lg text-primary italic">{studentData.signature}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {/* Card Footer with Security Features */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Digitally Verified
                    </div>
                    <div className="text-xs text-muted-foreground">
                      QR Code Authentication
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Student Information Panel */}
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Contact Information */}
              <Card className="bg-gradient-to-r from-background to-muted/20 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{studentData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{studentData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{studentData.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card className="bg-gradient-to-r from-background to-muted/20 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Academic Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Year</p>
                      <p className="font-medium">{studentData.year}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Faculty</p>
                      <p className="font-medium">{studentData.faculty}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Program</p>
                      <p className="font-medium">{studentData.course}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-r from-primary/5 to-primary-light/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                      <Eye className="w-4 h-4" />
                      View Full Profile
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                      <Edit className="w-4 h-4" />
                      Edit Details
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary hover:text-primary-foreground">
                      <Calendar className="w-4 h-4" />
                      Class Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Grid */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
              Digital ID Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "QR Code Verification", 
                  description: "Instant verification with secure QR code technology",
                  icon: "🔍"
                },
                {
                  title: "Blockchain Security", 
                  description: "Immutable records protected by blockchain technology", 
                  icon: "🔐"
                },
                {
                  title: "Real-time Updates", 
                  description: "Automatic synchronization with academic records",
                  icon: "⚡"
                }
              ].map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="bg-gradient-to-br from-background to-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{
                    transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentID;