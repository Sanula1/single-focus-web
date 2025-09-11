import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, 
  Button,
  Alert, AlertDescription
} from '@/components/ui/alert';
import { 
  Wifi, 
  Smartphone, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Hash, 
  Shield, 
  Zap,
  CreditCard,
  Nfc,
  QrCode,
  Download,
  Share2,
  Eye,
  Settings,
  Star,
  CheckCircle,
  Radio,
  Globe,
  Copy,
  ExternalLink,
  Menu,
  ArrowRight,
  Users,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const StudentIDCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tapCount, setTapCount] = useState(847);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Student data
  const studentData = {
    id: "SLK-2024-CS-0847",
    name: "Amara Dilshan",
    email: "amara.dilshan@surakshalms.edu.lk",
    phone: "+94 77 234 5678",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    faculty: "Faculty of Computing",
    university: "SurakshaLMS Institute",
    validUntil: "Dec 2026",
    issueDate: "Jan 2024",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    nfcId: "NFC_847_2024",
    status: "active",
    permissions: ["library", "cafeteria", "lab_access", "parking", "gym"],
    studentUrl: `${window.location.origin}/student/amara-dilshan-847`
  };

  const stats = [
    { number: "15.2K", label: "Active Students", icon: Users },
    { number: "98.7%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "System Uptime", icon: Shield }
  ];

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate NFC tap with enhanced effects
  const handleNfcTap = () => {
    setTapCount(prev => prev + 1);
    setIsNfcActive(true);
    setGlowEffect(true);
    
    setTimeout(() => {
      setIsNfcActive(false);
      setGlowEffect(false);
    }, 2000);

    setTimeout(() => {
      alert('✅ Student verified successfully!\nAccess granted to campus facilities.');
    }, 500);
  };

  const copyStudentUrl = () => {
    navigator.clipboard.writeText(studentData.studentUrl);
    alert('Student URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      
      {/* Animated background with glowing orbs */}
      <div className="absolute inset-0">
        {/* Large glowing orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-50 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SurakshaLMS</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">How it works</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About us</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Students</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Log in
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
              Get Started
            </Button>
          </div>

          {/* Mobile menu */}
          <Button variant="ghost" className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Platform to help you
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> verify</span>
                  <br />easily
                </h1>
                
                <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                  Students never need to go home or use the bank to do this. Only 
                  through this platform, all verification activities can be completed.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleNfcTap}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
                >
                  Get Verified
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg">
                  How It Works
                </Button>
              </div>

              {/* Payment methods equivalent */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">NFC</span>
                  </div>
                  <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Floating Card System */}
            <div className="relative h-[600px] flex items-center justify-center">
              
              {/* Main Student ID Card - Center */}
              <div 
                className="absolute z-30 transform-gpu transition-all duration-300"
                style={{
                  transform: `
                    translateX(${(mousePosition.x - window.innerWidth / 2) * 0.02}px) 
                    translateY(${(mousePosition.y - window.innerHeight / 2) * 0.02}px)
                    rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.01}deg)
                    rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)
                  `
                }}
              >
                <div 
                  className={`relative cursor-pointer transition-all duration-700 preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  } ${glowEffect ? 'animate-pulse' : ''}`}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {/* Card with holographic effect */}
                  <div className={`relative w-80 h-48 backface-hidden ${
                    glowEffect ? 'ring-4 ring-cyan-400/50 shadow-2xl shadow-cyan-500/25' : 'shadow-2xl'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl">
                      {/* Holographic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 rounded-2xl"></div>
                      
                      {/* Card content */}
                      <div className="relative p-6 h-full flex flex-col justify-between text-white">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <img 
                              src={studentData.photo}
                              alt={studentData.name}
                              className="w-12 h-12 rounded-full border-2 border-cyan-400/50 object-cover"
                            />
                            <div>
                              <h3 className="font-bold text-lg">{studentData.name}</h3>
                              <p className="text-gray-300 text-sm">{studentData.course}</p>
                            </div>
                          </div>
                          
                          {/* NFC chip */}
                          <div className={`relative w-12 h-8 rounded-lg transition-all duration-300 ${
                            isNfcActive ? 'bg-gradient-to-r from-green-400 to-cyan-400' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          }`}>
                            <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded"></div>
                            {isNfcActive && (
                              <div className="absolute inset-0 bg-white/20 animate-ping rounded-lg"></div>
                            )}
                            <Nfc className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white ${
                              isNfcActive ? 'animate-pulse' : ''
                            }`} />
                          </div>
                        </div>

                        {/* Card number */}
                        <div className="text-center">
                          <div className="font-mono text-xl tracking-[0.3em] mb-2 text-cyan-100">
                            {studentData.id.replace(/-/g, ' ')}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-gray-400 text-xs uppercase">Valid Thru</p>
                            <p className="font-mono text-sm">{studentData.validUntil}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs uppercase">SurakshaLMS</p>
                            <p className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                              STUDENT
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="w-80 h-48 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl shadow-2xl p-6">
                      <div className="h-full flex flex-col justify-center text-white">
                        <h3 className="text-lg font-bold mb-4 text-center">Access Permissions</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {studentData.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="capitalize">{permission.replace('_', ' ')}</span>
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-lg mx-auto flex items-center justify-center">
                            <QrCode className="w-10 h-10 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Activity Cards */}
              <div className="absolute top-20 left-0 z-20 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Library Access</p>
                    <p className="text-gray-400 text-xs">2 min ago</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 right-0 z-20 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Verification</p>
                    <p className="text-gray-400 text-xs">Successful</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-20 z-20 bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Lab Access</p>
                    <p className="text-gray-400 text-xs">Active</p>
                  </div>
                </div>
              </div>

              {/* Mobile device mockup */}
              <div className="absolute bottom-0 right-10 z-25">
                <div className="w-32 h-60 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] p-2 shadow-2xl border border-slate-600/30">
                  <div className="w-full h-full bg-black rounded-[1.5rem] p-3">
                    <div className="text-center text-white space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Nfc className="w-4 h-4" />
                      </div>
                      <p className="text-xs">Ready to Tap</p>
                      <div className="space-y-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex justify-between text-xs text-gray-400">
                            <span>Activity {i + 1}</span>
                            <span className="text-green-400">✓</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
                    <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
                    <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
                  </linearGradient>
                </defs>
                
                {/* Animated connection lines */}
                <path
                  d="M 200 150 Q 300 100 400 200"
                  stroke="url(#glowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M 200 350 Q 300 300 380 420"
                  stroke="url(#glowGradient)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-5xl font-bold text-white">{stat.number}</div>
                <div className="text-gray-400 text-lg flex items-center justify-center gap-2">
                  <stat.icon className="w-5 h-5" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Smart Solutions for the
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                automated world
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Amazing security. It sets us apart</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deep card budgetics, business variant sustainable questioning varies magic.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">The complexity of simplicity</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deep card budgetics, business variant sustainable questioning varies magic.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Real Innovation. Real Advantage.</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deep card budgetics, business variant sustainable questioning varies magic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Subscribe to Our
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Newsletter
            </span>
          </h2>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Action Panel */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 space-y-3">
          <Button 
            onClick={handleNfcTap}
            className={`w-full transition-all duration-300 ${
              isNfcActive 
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
            }`}
          >
            <Radio className={`w-4 h-4 mr-2 ${isNfcActive ? 'animate-spin' : ''}`} />
            {isNfcActive ? 'Verifying...' : `NFC Tap (${tapCount})`}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => setShowQR(!showQR)}
              variant="outline" 
              size="sm"
              className="border-slate-600/50 text-white hover:bg-slate-700/50"
            >
              <QrCode className="w-4 h-4" />
            </Button>
            <Button 
              onClick={copyStudentUrl}
              variant="outline" 
              size="sm"
              className="border-slate-600/50 text-white hover:bg-slate-700/50"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </div>
  );
};

export default StudentIDCard;