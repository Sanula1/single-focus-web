import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, RotateCcw, Calendar, User, MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const StudentID = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const phoneRef = useRef(null);
  const [phonePosition, setPhonePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    setTimeout(() => setIsVisible(true), 300);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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
    
    if (scrollY < vh) {
      const progress = scrollY / vh;
      translateX = Math.sin(progress * Math.PI) * 20;
      translateY = Math.cos(progress * Math.PI) * 15 + 100;
      rotateZ = Math.sin(progress * Math.PI) * 2;
      scale = 1 + Math.sin(progress * Math.PI) * 0.05;
      opacity = 1;
    } else if (scrollY >= vh && scrollY < vh * 2) {
      const sectionProgress = (scrollY - vh) / vh;
      translateX = sectionProgress * (isMobile ? 100 : vw / 3);
      translateY = 0;
      rotateY = sectionProgress * 15;
      scale = 1;
      opacity = 1;
    } else if (scrollY >= vh * 2 && scrollY < vh * 3) {
      const sectionProgress = (scrollY - vh * 2) / vh;
      translateX = 0;
      translateY = -50;
      rotateX = sectionProgress * 30;
      rotateY = sectionProgress * 30;
      scale = 1;
      opacity = 1;
    } else {
      const sectionProgress = Math.min((scrollY - vh * 3) / vh, 1);
      const phoneX = phonePosition.x + (isMobile ? 0 : vw / 4);
      const phoneY = phonePosition.y - 50;
      
      translateX = phoneX * sectionProgress;
      translateY = phoneY * sectionProgress;
      rotateY = 0;
      scale = 0.8 - sectionProgress * 0.2;
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
    <div className="bg-black text-white overflow-x-hidden relative">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-6 h-6" />
            <span className="font-bold">SurakshaLMS</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="#" className="hover:text-blue-400">Home</a>
            <a href="#" className="hover:text-blue-400">Product</a>
            <a href="#" className="hover:text-blue-400">Feature</a>
          </nav>
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-6">
            Get Student ID
          </Button>
        </div>
      </div>

      {/* 3D Container for card */}
      <div className="fixed inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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
      <section className="min-h-screen flex flex-col justify-center items-center bg-black pt-20" style={{backgroundImage: "url('https://via.placeholder.com/1920x1080?text=Earth+Background')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            The Only Student ID
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto">
            The best digital student ID for educational institutions
          </p>
          <div className="h-64 md:h-80"></div>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
          >
            Get Student ID
          </Button>
        </div>
      </section>

      {/* Get Your ID Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Get your ID in just 5min
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Simple 3 step verification with online KYC. verification and instant digital ID unlocked
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
            >
              Get Student ID
            </Button>
          </div>
          <div className="h-64 md:h-80 flex items-center justify-center"></div>
        </div>
      </section>

      {/* Blazing Fast Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900/20">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Blazing Fast Verification
          </h2>
          <div className="h-64 md:h-80 mb-12"></div>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2" />
              <p>Verify in 10 seconds</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-8 h-8 mb-2" />
              <p>99.9% Success rate</p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-8 h-8 mb-2" />
              <p>Auto Sync</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Verification Section */}
      <section className="min-h-screen flex items-center bg-black">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Instant Verification
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Link your digital ID to your Apple/Google wallet to start using immediately.
            </p>
          </div>
          <div className="flex justify-center order-2 md:order-1" ref={phoneRef}>
            <div className="w-64 md:w-72 h-[500px] md:h-[560px] bg-gray-800 rounded-3xl p-2 shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-black rounded-3xl p-6 flex flex-col">
                <p className="text-white font-bold mb-4">Recent Activities</p>
                <div className="bg-gray-900 p-3 rounded-lg mb-3 flex justify-between">
                  <span>Lecture Attendance</span>
                  <span>Today</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg mb-3 flex justify-between">
                  <span>Library Access</span>
                  <span>Yesterday</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg flex justify-between">
                  <span>Exam Entry</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/lovable-uploads/ab90ba4e-121b-4049-b65d-dec211ad12c3.png" alt="Logo" className="w-6 h-6" />
            <span>SurakshaLMS</span>
          </div>
          <p className="mb-4 md:mb-0">© 2025 SurakshaLMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentID;