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
    
    // Section 1: Hero (0-100vh) - CENTER with subtle float
    if (scrollY < vh) {
      const progress = scrollY / vh;
      translateX = Math.sin(progress * Math.PI) * 20;
      translateY = Math.cos(progress * Math.PI) * 15;
      rotateZ = Math.sin(progress * Math.PI) * 2;
      scale = 1 + Math.sin(progress * Math.PI) * 0.05;
      opacity = 1;
    }
    // Section 2: No Fees (100vh-200vh) - Move to RIGHT
    else if (scrollY >= vh && scrollY < vh * 2) {
      const sectionProgress = (scrollY - vh) / vh;
      translateX = sectionProgress * (isMobile ? 100 : vw / 4);
      translateY = 50;
      rotateY = sectionProgress * 15;
      scale = 1.05;
      opacity = 1;
    }
    // Section 3: Phone Section (200vh-300vh) - Align with phone
    else if (scrollY >= vh * 2 && scrollY < vh * 3) {
      const sectionProgress = (scrollY - vh * 2) / vh;
      const phoneX = phonePosition.x + (isMobile ? 0 : -50);
      const phoneY = phonePosition.y - 120; // Align with phone screen
      
      translateX = phoneX * sectionProgress;
      translateY = phoneY * sectionProgress + 50;
      rotateY = 20 - sectionProgress * 20;
      scale = 1.15 - sectionProgress * 0.6;
      opacity = 1;
    }
    // Section 4: Blazing Fast (300vh-400vh) - Centered spin
    else if (scrollY >= vh * 3 && scrollY < vh * 4) {
      const sectionProgress = (scrollY - vh * 3) / vh;
      translateX = 0;
      translateY = -100;
      rotateX = sectionProgress * 360;
      rotateY = sectionProgress * 360;
      scale = 0.6 + sectionProgress * 0.4;
      opacity = 0.8 + sectionProgress * 0.2;
    }
    // Section 5: Get ID (400vh+) - Move to LEFT
    else if (scrollY >= vh * 4) {
      const sectionProgress = Math.min((scrollY - vh * 4) / vh, 1);
      translateX = -sectionProgress * (isMobile ? 100 : vw / 4);
      translateY = Math.sin(sectionProgress * Math.PI) * 15;
      rotateY = -sectionProgress * 25;
      scale = 1.1;
      opacity = 1;
    }

    return {
      transform: `
        perspective(1000px)
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        translateZ(0px)
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `,
      opacity: opacity,
      transition: 'transform 0.5s ease-out, opacity 0.5s ease'
    };
  };

  const cardStyle = getCardTransform();

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden relative">
      {/* 3D Container for card */}
      <div className="fixed inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{
            ...cardStyle,
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          <Card className="w-[360px] h-[220px] bg-white text-black shadow-xl border-0 overflow-hidden relative md:w-[380px] md:h-[240px]">
            {/* Institution Name */}
            <div className="absolute top-2 left-2 text-lg font-bold text-gray-800">Suraksha LMS</div>
            {/* Logo */}
            <div className="absolute top-2 right-2">
              <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-8 h-8" />
            </div>
            
            <CardContent className="p-3 h-full flex flex-col">
              <div className="flex gap-3">
                <img 
                  src={studentData.photo} 
                  alt="Student" 
                  className="w-16 h-16 rounded object-cover border border-gray-200"
                />
                <div>
                  <p className="font-bold text-base">{studentData.name.toUpperCase()}</p>
                  <p className="text-xs text-gray-600">Student ID Card</p>
                  <p className="text-xs mt-1">ID: {studentData.id}</p>
                  <p className="text-xs">Course: {studentData.course}</p>
                  <p className="text-xs">Year: {studentData.year}</p>
                </div>
              </div>
              
              <div className="mt-2 text-xs grid grid-cols-2 gap-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-600" />
                  DOB: {studentData.dateOfBirth}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-600" />
                  Gender: {studentData.gender}
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <MapPin className="w-3 h-3 text-gray-600" />
                  Address: {studentData.address}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-gray-600" />
                  {studentData.phone}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-gray-600" />
                  {studentData.email}
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <GraduationCap className="w-3 h-3 text-gray-600" />
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
      <section className="min-h-screen relative flex items-center justify-center bg-gray-800">
        <div className="text-center z-10 px-4 pt-32">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            The Only Student ID
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl mx-auto">
            The best digital student ID for educational institutions
          </p>
          <div className="h-[40vh] mb-12"></div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Second Section - No Fees */}
      <section className="min-h-screen relative flex items-center bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              No Joining Fees. No Annual Fees.
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              SurakshaLMS offers a cost-free student ID platform.
            </p>
          </div>
          <div className="h-[40vh] flex items-center justify-center"></div>
        </div>
      </section>

      {/* Third Section - Instant Features with Phone */}
      <section className="min-h-screen relative flex items-center bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1" ref={phoneRef}>
            <div className="w-64 h-[500px] bg-gray-700 rounded-[2rem] p-2 shadow-lg md:w-72 md:h-[560px]">
              <div className="w-full h-full bg-gray-900 rounded-[1.8rem] flex items-center justify-center">
                <div className="text-gray-500 text-sm">Card here</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Instant Verification
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Link your ID to your phone for seamless access.
            </p>
          </div>
        </div>
      </section>

      {/* Fourth Section - Blazing Fast */}
      <section className="min-h-screen relative flex items-center justify-center bg-gray-900">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Blazing Fast
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-xl mx-auto">
            Ultra-fast verification system
          </p>
          <div className="h-[40vh] mb-12 flex items-center justify-center"></div>
        </div>
      </section>

      {/* Final Section - Get Your ID */}
      <section className="min-h-screen relative flex items-center justify-center bg-gray-800">
        <div className="text-center z-10 px-4 max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Get Your ID in 5 Minutes
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Simple 3-step verification process
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-lg"
          >
            Get Student ID Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-6 z-10 relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">© 2025 SurakshaLMS. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default StudentID;