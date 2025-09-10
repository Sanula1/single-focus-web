import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Eye, Edit, Share2, IdCard, Calendar, User, MapPin, Phone, Mail, GraduationCap, Shield, Zap, Globe } from "lucide-react";
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

  // Sample student data
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

  // Calculate card transform based on scroll
  const cardTransform = {
    transform: `
      translateY(${scrollY * 0.5}px) 
      translateX(${Math.sin(scrollY * 0.01) * 50}px)
      rotateX(${scrollY * 0.05}deg) 
      rotateY(${scrollY * 0.02}deg)
      rotateZ(${Math.sin(scrollY * 0.005) * 5}deg)
      scale(${1 + scrollY * 0.0002})
    `,
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section - Similar to credit card site */}
      <section className="min-h-screen relative flex items-center justify-center perspective-1000">
        {/* Animated Background */}
        <div className="absolute inset-0 background-pulse" />
        
        {/* Falling Meteors */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-t from-primary to-transparent meteor"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="gap-2 text-white/80 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              SurakshaLMS
            </Button>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-white/80 hover:text-white">Home</Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">Product</Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">Features</Button>
            <Button className="bg-primary hover:bg-primary/80">Get Student ID</Button>
          </nav>
        </header>

        {/* Main Hero Content */}
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            The Only Student ID
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12">
            Probably the best digital student ID for educational institutions
          </p>

          {/* Floating Student ID Card */}
          <div 
            className="mx-auto preserve-3d scroll-transform card-float"
            style={cardTransform}
          >
            <Card className="w-96 h-60 bg-gradient-to-br from-slate-100 to-slate-300 text-black shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute top-4 right-4">
                <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-8 h-8" />
              </div>
              
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={studentData.photo} 
                      alt="Student" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-bold text-lg">{studentData.name.toUpperCase()}</p>
                      <p className="text-sm text-gray-600">Student ID</p>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-mono tracking-wider mb-2">
                    {studentData.id.replace(/-/g, '  ')}
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">VALID THRU</p>
                    <p className="font-mono">{studentData.dateOfIssue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">SURAKSHA</p>
                    <p className="font-bold">LMS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="mt-12 bg-primary hover:bg-primary/80 text-white px-8 py-3 text-lg"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Second Section - No Fees */}
      <section className="min-h-screen relative flex items-center bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              No Joining Fees.<br />
              No Annual Fees.
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              While many digital ID systems come with hidden costs, SurakshaLMS provides a comprehensive 
              student identification platform without charging any setup or annual maintenance fees.
            </p>
          </div>
          
          <div 
            className="flex justify-center"
            style={{
              transform: `
                translateY(${(scrollY - 800) * 0.3}px) 
                rotateY(${(scrollY - 800) * 0.1}deg)
                scale(${1 + (scrollY - 800) * 0.0001})
              `
            }}
          >
            <Card className="w-80 h-52 bg-gradient-to-br from-slate-200 to-slate-400 text-black shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{studentData.name.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">Digital Student ID</p>
                  </div>
                  <IdCard className="w-6 h-6 text-gray-700" />
                </div>
                
                <div className="text-xl font-mono tracking-wider text-center">
                  {studentData.id}
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">ISSUED</p>
                    <p className="font-mono text-sm">{studentData.dateOfIssue}</p>
                  </div>
                  <p className="font-bold text-lg">SURAKSHA LMS</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Third Section - Instant Features */}
      <section className="min-h-screen relative flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className="flex justify-center order-2 lg:order-1"
            style={{
              transform: `
                translateY(${(scrollY - 1600) * -0.2}px) 
                rotateX(${(scrollY - 1600) * 0.05}deg)
                rotateZ(${Math.sin((scrollY - 1600) * 0.01) * 10}deg)
              `
            }}
          >
            <div className="relative">
              {/* Phone mockup */}
              <div className="w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Student ID in phone */}
                  <div className="p-6 h-full flex flex-col justify-center">
                    <Card className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-300 text-black shadow-lg border-0">
                      <CardContent className="p-4 h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={studentData.photo} 
                            alt="Student" 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold text-sm">{studentData.name}</p>
                            <p className="text-xs text-gray-600">{studentData.course}</p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-lg font-mono">{studentData.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{studentData.faculty}</div>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span>{studentData.dateOfIssue}</span>
                          <span>VALID</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* App features */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Grocery Shop - $34</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Patrol - $49</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Experience - $258</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Instant<br />
              Verification
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Link your digital student ID to your mobile device for instant verification 
              and seamless access to campus facilities.
            </p>
            <div className="w-16 h-1 bg-primary mb-8"></div>
            
            {/* Feature icons */}
            <div className="flex gap-6">
              <Shield className="w-8 h-8 text-white/60" />
              <Zap className="w-8 h-8 text-white/60" />
              <Globe className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Fast Transactions */}
      <section className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
        {/* Animated background rays */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-full bg-gradient-to-t from-purple-500/20 via-pink-500/20 to-transparent"
              style={{
                left: `${i * 5}%`,
                transform: `rotate(${15 + i * 2}deg) translateY(${Math.sin(scrollY * 0.01 + i) * 20}px)`,
                transformOrigin: 'bottom center'
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-4">
          <div 
            className="mb-8"
            style={{
              transform: `
                translateY(${(scrollY - 2400) * 0.3}px)
                rotateX(${(scrollY - 2400) * 0.02}deg)
                scale(${1 + (scrollY - 2400) * 0.0001})
              `
            }}
          >
            <Card className="w-80 h-52 mx-auto bg-gradient-to-br from-slate-100 to-slate-300 text-black shadow-2xl border-0">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{studentData.name.toUpperCase()}</p>
                    <p className="text-sm text-gray-600">Student Access Card</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-sm flex items-center justify-center">
                    <div className="w-4 h-6 bg-white rounded-sm"></div>
                  </div>
                </div>
                
                <div className="text-xl font-mono tracking-wider text-center">
                  {studentData.id}
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500">EXP</p>
                    <p className="font-mono text-sm">09/30</p>
                  </div>
                  <p className="font-bold text-lg">VISA</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Blazing Fast Verification
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-white/70">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <span>Verify in 10 seconds</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" />
              <span>99.9% Success rate</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              <span>Auto Verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section - Get Your ID */}
      <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-t from-black via-gray-900 to-black">
        <div className="text-center z-10 px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Get your Student ID in<br />
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              just 5min
            </span>
          </h2>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Simple 3 step verification with online identity verification 
            and instant digital student ID unlock
          </p>

          <div 
            className="mb-12"
            style={{
              transform: `
                translateY(${(scrollY - 3200) * 0.2}px)
                rotateY(${(scrollY - 3200) * 0.05}deg)
              `
            }}
          >
            <Card className="w-72 h-44 mx-auto bg-gradient-to-br from-slate-100 to-slate-300 text-black shadow-2xl border-0">
              <CardContent className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={studentData.photo} 
                    alt="Student" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-bold text-sm">{studentData.name.toUpperCase()}</p>
                    <p className="text-xs text-gray-600">Digital Student ID</p>
                  </div>
                </div>
                
                <div className="text-lg font-mono tracking-wider text-center">
                  {studentData.id}
                </div>
                
                <div className="flex justify-between items-end text-xs">
                  <span>EXP: {studentData.dateOfIssue}</span>
                  <span className="font-bold">SURAKSHA LMS</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="bg-primary hover:bg-primary/80 text-white px-12 py-4 text-lg rounded-full"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-6 h-6" />
              <span className="font-bold">SurakshaLMS</span>
            </div>
            
            <div className="text-center mb-4 md:mb-0">
              <p className="text-white/60">Design by SurakshaLMS Team</p>
            </div>
            
            <div className="flex gap-6">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">LinkedIn</Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">Know More</Button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-white/40 text-sm">All copyright reserved to @surakshalms</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentID;