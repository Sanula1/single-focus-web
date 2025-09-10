import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StudentID = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const phoneRef = useRef(null);
  const [phonePosition, setPhonePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations on load
    setTimeout(() => setIsVisible(true), 300);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update phone position when scroll changes
    if (phoneRef.current) {
      const rect = phoneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPhonePosition({ 
        x: centerX - window.innerWidth / 2, 
        y: centerY - window.innerHeight / 2 
      });
    }
  }, [scrollY]);

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
    const vw = window.innerWidth;
    const isMobile = vw < 768;
    
    let translateX = 0;
    let translateY = 0;
    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;
    let scale = 1;
    let opacity = 1;
    
    // Section 1: Hero (0-100vh) - CENTER with subtle float animation
    if (scrollY < vh) {
      const progress = scrollY / vh;
      translateX = Math.sin(scrollY * 0.003) * 20;
      translateY = Math.cos(scrollY * 0.002) * 15 + scrollY * 0.05;
      rotateX = Math.sin(scrollY * 0.002) * 3;
      rotateY = Math.cos(scrollY * 0.003) * 5;
      rotateZ = Math.sin(scrollY * 0.001) * 2;
      scale = 1 + Math.sin(scrollY * 0.002) * 0.05;
      opacity = 1;
    }
    // Section 2: No Fees (100vh-200vh) - Smooth move to RIGHT side
    else if (scrollY >= vh && scrollY < vh * 2) {
      const sectionProgress = (scrollY - vh) / vh;
      const easeProgress = Math.pow(sectionProgress, 0.7); 
      
      translateX = easeProgress * (isMobile ? 100 : vw / 4);
      translateY = 50 + Math.sin(sectionProgress * Math.PI) * 20;
      rotateY = easeProgress * 20;
      rotateX = Math.sin(sectionProgress * Math.PI) * 5;
      rotateZ = easeProgress * -5;
      scale = 1.05 + easeProgress * 0.1;
      opacity = 1;
    }
    // Section 3: Phone Section (200vh-300vh) - Move into phone screen with precise alignment
    else if (scrollY >= vh * 2 && scrollY < vh * 3) {
      const sectionProgress = (scrollY - vh * 2) / vh;
      const easeProgress = Math.pow(sectionProgress, 0.5);
      
      const startX = isMobile ? 100 : vw / 4;
      const startY = 50;
      const phoneX = phonePosition.x + (isMobile ? 0 : -50); // Align with phone screen center
      const phoneY = phonePosition.y - 100; // Align with phone screen top
      
      translateX = startX + (phoneX - startX) * easeProgress;
      translateY = startY + (phoneY - startY) * easeProgress;
      
      rotateY = 20 - easeProgress * 20;
      rotateX = 5 - easeProgress * 5;
      rotateZ = -5 + easeProgress * 5;
      scale = 1.15 - easeProgress * 0.55; // Shrink to fit phone screen
      opacity = 1;
    }
    // Section 4: Blazing Fast (300vh-400vh) - Centered with smooth spin
    else if (scrollY >= vh * 3 && scrollY < vh * 4) {
      const sectionProgress = (scrollY - vh * 3) / vh;
      const easeProgress = Math.pow(sectionProgress, 0.8);
      
      translateX = 0; // Perfectly centered horizontally
      translateY = -100 + Math.sin(easeProgress * Math.PI) * -30; // Centered with slight oscillation
      rotateX = easeProgress * 360;
      rotateY = -10 + easeProgress * 360;
      rotateZ = 5 + easeProgress * 180;
      scale = 0.6 + easeProgress * 0.4;
      opacity = 0.8 + easeProgress * 0.2;
    }
    // Section 5: Get ID (400vh+) - Float to LEFT side with gentle animation
    else if (scrollY >= vh * 4) {
      const sectionProgress = Math.min((scrollY - vh * 4) / vh, 1);
      const easeProgress = 1 - Math.pow(1 - sectionProgress, 3); 
      
      translateX = easeProgress * (isMobile ? -100 : - (vw / 4));
      translateY = Math.sin(sectionProgress * Math.PI * 2) * 15;
      rotateY = easeProgress * -25;
      rotateX = Math.sin(sectionProgress * Math.PI) * 8;
      rotateZ = easeProgress * -10;
      scale = 1.1 + Math.sin(sectionProgress * Math.PI) * 0.1;
      opacity = 1;
    }

    return {
      transform: `
        perspective(1200px)
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        translateZ(50px)
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `,
      opacity: opacity,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease'
    };
  };

  const cardStyle = getCardTransform();

  return (
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* 3D Container for better depth perception */}
      <div className="fixed inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        {/* Single Floating Student ID Card */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{
            ...cardStyle,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          <Card className="w-[380px] h-[240px] bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-black shadow-2xl border-0 overflow-hidden relative md:w-[400px] md:h-[250px]">
            {/* Holographic effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
            
            {/* Institution Name */}
            <div className="absolute top-4 left-4 text-xl font-bold">Suraksha LMS</div>
            
            {/* Logo */}
            <div className="absolute top-4 right-4">
              <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-10 h-10 drop-shadow-lg" />
            </div>
            
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex gap-4">
                <img 
                  src={studentData.photo} 
                  alt="Student" 
                  className="w-20 h-20 rounded object-cover border-2 border-white shadow-lg"
                />
                <div>
                  <p className="font-bold text-lg">{studentData.name.toUpperCase()}</p>
                  <p className="text-sm text-gray-600 font-medium">Student ID Card</p>
                  <p className="text-xs mt-1">ID: {studentData.id}</p>
                  <p className="text-xs">Course: {studentData.course}</p>
                  <p className="text-xs">Year: {studentData.year}</p>
                </div>
              </div>
              
              <div className="mt-4 text-xs grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  DOB: {studentData.dateOfBirth}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Gender: {studentData.gender}
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <MapPin className="w-3 h-3" />
                  Address: {studentData.address}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {studentData.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {studentData.email}
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <GraduationCap className="w-3 h-3" />
                  Faculty: {studentData.faculty}
                </div>
              </div>
              
              <div className="mt-auto flex justify-between text-xs text-gray-500">
                <p>Issued: {studentData.dateOfIssue}</p>
                <p className="italic">Signature: {studentData.signature}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-shift" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
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
              className="gap-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              SurakshaLMS
            </Button>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Home</Button>
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Product</Button>
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">Features</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg">
              Get Student ID
            </Button>
          </nav>
        </header>

        {/* Main Hero Content */}
        <div className="text-center z-10 px-4 pt-32">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-gradient-x">
            The Only Student ID
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
            Probably the best digital student ID for educational institutions
          </p>

          {/* Dynamic space for floating card */}
          <div className="h-[40vh] mb-12"></div>

          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Second Section - No Fees */}
      <section className="min-h-screen relative flex items-center bg-gradient-to-br from-gray-900 via-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              No Joining Fees.<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                No Annual Fees.
              </span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-lg">
              While many digital ID systems come with hidden costs, SurakshaLMS provides a comprehensive 
              student identification platform without charging any setup or annual maintenance fees.
            </p>
            
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white/60">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-white/60">No Hidden Costs</span>
              </div>
            </div>
          </div>
          
          {/* Dynamic space for card */}
          <div className="h-[40vh] flex items-center justify-center">
            {/* Placeholder adjusted to card height */}
          </div>
        </div>
      </section>

      {/* Third Section - Instant Features with Phone */}
      <section className="min-h-screen relative flex items-center bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1" ref={phoneRef}>
            {/* Phone mockup */}
            <div className="relative">
              <div className="w-72 h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl md:w-80 md:h-[640px]">
                {/* Phone notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full"></div>
                
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone screen content */}
                  <div className="p-6 h-full flex flex-col justify-center">
                    {/* Space for the moving card */}
                    <div className="w-full h-48 mb-6 flex items-center justify-center md:h-52">
                      <div className="text-white/20 text-sm">Card animates here</div>
                    </div>
                    
                    {/* App UI elements */}
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-xl p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold">✓</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">Library Access</p>
                              <p className="text-white/60 text-xs">Verified</p>
                            </div>
                          </div>
                          <span className="text-green-400 text-xs">Active</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">⚡</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">Campus Entry</p>
                              <p className="text-white/60 text-xs">Last: 2 min ago</p>
                            </div>
                          </div>
                          <span className="text-blue-400 text-xs">Granted</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-4 backdrop-blur">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">$</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">Cafeteria Payment</p>
                              <p className="text-white/60 text-xs">Balance: $45.00</p>
                            </div>
                          </div>
                          <span className="text-purple-400 text-xs">Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phone glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl -z-10"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 z-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Instant<br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Verification
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Link your digital student ID to your mobile device for instant verification 
              and seamless access to campus facilities.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                <span className="text-white/80">Bank-level security encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <span className="text-white/80">Lightning-fast NFC technology</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="text-white/80">Works globally at any campus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Blazing Fast */}
      <section className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
        {/* Animated aurora background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 animate-aurora"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-green-600/10 via-transparent to-pink-600/10 animate-aurora-reverse"></div>
        </div>

        {/* Speed lines */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                top: `${Math.random() * 100}%`,
                left: '-100%',
                right: '-100%',
                animation: `speedline ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-20 px-4">
          {/* Dynamic space for centered card */}
          <div className="h-[40vh] mb-12 flex items-center justify-center"></div>

          <h2 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x">
            Blazing Fast
          </h2>
          
          <p className="text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
            Experience the future of student identification with our ultra-fast verification system
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <Calendar className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
              <p className="text-white font-semibold">10 sec</p>
              <p className="text-white/60 text-sm">Verification Time</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <Shield className="w-8 h-8 text-green-400 mb-3 mx-auto" />
              <p className="text-white font-semibold">99.9%</p>
              <p className="text-white/60 text-sm">Success Rate</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
              <p className="text-white font-semibold">Auto</p>
              <p className="text-white/60 text-sm">Verification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section - Get Your ID */}
      <section className="min-h-screen relative flex items-center justify-center bg-gradient-to-t from-purple-900/20 via-black to-black">
        {/* Animated background mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRhNWQ4MyIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] animate-grid-float"></div>
        </div>

        <div className="text-center z-20 px-4 max-w-5xl">
          <h2 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Get your Student ID in<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              just 5 minutes
            </span>
          </h2>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Simple 3-step verification with online identity verification 
            and instant digital student ID unlock
          </p>

          {/* Steps */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center font-bold">1</div>
              <span className="text-white/80">Upload Documents</span>
            </div>
            <div className="hidden md:block text-white/30">→</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center font-bold">2</div>
              <span className="text-white/80">Verify Identity</span>
            </div>
            <div className="hidden md:block text-white/30">→</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold">3</div>
              <span className="text-white/80">Get Your ID</span>
            </div>
          </div>

          <Button 
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-16 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Get Student ID Now
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

      <style jsx>{`
        @keyframes speedline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes aurora {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes aurora-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-120deg); }
          66% { transform: translate(20px, -20px) rotate(-240deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes grid-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
      `}</style>
    </div>
  );
};

export default StudentID;