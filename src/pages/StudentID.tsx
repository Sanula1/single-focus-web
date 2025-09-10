import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Eye, Edit, Share2, IdCard, Calendar, User, MapPin, Phone, Mail, GraduationCap, Shield, Zap, Globe, Building } from "lucide-react";
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

  // Calculate card position and transform based on scroll
  const getCardTransform = () => {
    const vh = window.innerHeight;
    
    let translateX = 0;
    let translateY = 0;
    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;
    let scale = 1;
    
    // Section 1: Hero (0-100vh) - CENTER
    if (scrollY < vh) {
      translateX = 0;
      translateY = scrollY * 0.1;
      rotateX = Math.sin(scrollY * 0.01) * 5;
      rotateY = Math.cos(scrollY * 0.008) * 10;
      rotateZ = Math.sin(scrollY * 0.005) * 3;
      scale = 1 + Math.sin(scrollY * 0.01) * 0.1;
    }
    // Section 2: No Fees (100vh-200vh) - Move to SIDE (right)
    else if (scrollY >= vh && scrollY < vh * 2) {
      const sectionProgress = (scrollY - vh) / vh;
      translateX = sectionProgress * 400; // Move to right side
      translateY = vh * 0.1;
      rotateY = sectionProgress * 25;
      rotateX = sectionProgress * 10;
      scale = 1 + sectionProgress * 0.1;
    }
    // Section 3: Instant Features (200vh-300vh) - Move into PHONE
    else if (scrollY >= vh * 2 && scrollY < vh * 3) {
      const sectionProgress = (scrollY - vh * 2) / vh;
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      
      if (isMobile) {
        // On mobile: move from right side to center-left (phone is centered)
        translateX = 400 - sectionProgress * 500; // Move to left but not too far
        translateY = vh * 0.1 - sectionProgress * 100; // Move up to align with phone
      } else {
        // On desktop: move from right side to left side (phone is on left)
        translateX = 400 - sectionProgress * 700; // Move further left for desktop
        translateY = vh * 0.1 + sectionProgress * 20;
      }
      
      rotateY = 25 - sectionProgress * 35;
      rotateZ = sectionProgress * 5;
      scale = 1.1 - sectionProgress * 0.5; // Shrink more to fit phone screen
    }
    // Section 4: Blazing Fast (300vh-400vh) - Back to CENTER
    else if (scrollY >= vh * 3 && scrollY < vh * 4) {
      const sectionProgress = (scrollY - vh * 3) / vh;
      const isMobile = window.innerWidth < 1024;
      
      // Start from the phone position and move back to center
      const startX = isMobile ? -100 : -300; // Starting position from section 3
      translateX = startX + sectionProgress * Math.abs(startX); // Move back to center (0)
      translateY = vh * 0.1 + (isMobile ? -100 : 20) - sectionProgress * (isMobile ? -100 : 70);
      rotateX = sectionProgress * 180; // Rotate while moving
      rotateY = -10 + sectionProgress * 20;
      rotateZ = sectionProgress * 90;
      scale = 0.6 + sectionProgress * 0.4; // Scale back up
    }
    // Section 5: Get ID (400vh+) - Move to SIDE again
    else if (scrollY >= vh * 4) {
      const sectionProgress = Math.min((scrollY - vh * 4) / vh, 1);
      translateX = sectionProgress * -350; // Move to left side
      translateY = vh * 0.2;
      rotateY = sectionProgress * -20;
      rotateX = sectionProgress * 10;
      scale = 1 + sectionProgress * 0.1;
    }

    return {
      transform: `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `,
    };
  };

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* Single Floating Student ID Card - Fixed positioned and moves through sections */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 preserve-3d transition-transform duration-75 ease-out perspective-1000"
        style={getCardTransform()}
      >
        <Card className="w-96 h-60 bg-gradient-to-br from-slate-100 to-slate-300 text-black shadow-2xl border-0 overflow-hidden relative">
          {/* Logo */}
          <div className="absolute top-4 right-4">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-8 h-8" />
          </div>
          
          {/* Lightning bolt */}
          <div className="absolute top-4 right-16">
            <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded transform rotate-12">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={studentData.photo} 
                  alt="Student" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="text-left">
                  <p className="font-bold text-lg">{studentData.name.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">Student ID Card</p>
                </div>
              </div>
              
              <div className="text-2xl font-mono tracking-[0.3em] mb-2 text-center">
                5304 4641 1234 5678
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500 uppercase">Valid Thru</p>
                <p className="font-mono text-sm">09/30</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Suraksha</p>
                <p className="font-bold text-lg">LMS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hero Section */}
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
          <div className="flex items-center gap-3">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="SurakshaLMS Logo" className="h-8 w-8" />
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-white/80 hover:text-white transition-colors duration-300" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white transition-colors duration-300">
              Customers
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white transition-colors duration-300">
              Pricing
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white transition-colors duration-300" onClick={() => navigate('/guidance')}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Guidance
            </Button>
            <Button variant="outline" className="gap-2 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <IdCard className="w-4 h-4" />
              Login to SurakshaLMS
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="outline" size="sm" className="backdrop-blur-sm border-primary/20 text-white/80">
              <Building className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="text-center z-10 px-4 pt-32">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
            The Only Student ID
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12">
            Probably the best digital student ID for educational institutions
          </p>

          {/* Space for floating card - it will appear here via fixed positioning */}
          <div className="h-60 mb-12"></div>

          <Button 
            className="bg-primary hover:bg-primary/80 text-white px-8 py-3 text-lg"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Second Section - No Fees */}
      <section className="min-h-screen relative flex items-center bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              No Joining Fees.<br />
              No Annual Fees.
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              While many digital ID systems come with hidden costs, SurakshaLMS provides a comprehensive 
              student identification platform without charging any setup or annual maintenance fees.
            </p>
          </div>
          
          {/* Empty space for card to move into */}
          <div className="flex justify-center">
            <div className="w-80 h-52 opacity-0">
              {/* Placeholder space for the moving card */}
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Instant Features */}
      <section className="min-h-screen relative flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            {/* Phone mockup */}
            <div className="w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl z-20">
              <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                {/* Phone content - card will move into here */}
                <div className="p-6 h-full flex flex-col justify-center">
                  {/* Space for the moving card */}
                  <div className="w-full h-40 mb-4 opacity-0">
                    {/* Placeholder for card */}
                  </div>
                  
                  {/* App features */}
                  <div className="space-y-2">
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
          
          <div className="order-1 lg:order-2 z-20">
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

        <div className="text-center z-20 px-4">
          {/* Space for the rotating card */}
          <div className="mb-8 h-52"></div>

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
        <div className="text-center z-20 px-4 max-w-4xl">
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

          <Button 
            className="bg-primary hover:bg-primary/80 text-white px-12 py-4 text-lg rounded-full"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 z-20 relative">
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