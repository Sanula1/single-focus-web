import { useState } from "react";

const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Crypto");

  const categories = [
    "Crypto",
    "Makeup Artist", 
    "Yoga",
    "Sports",
    "Real Estate",
    "Photography",
    "Charity",
    "Courses"
  ];

  const servicesByCategory = {
    "Crypto": [
      {
        title: "BLOCKCHAIN DEVELOPMENT",
        description: "Learn more",
        videoUrl: "https://www.youtube.com/embed/OTy5UUFCS-I?si=VrVnQVwupYz76fVd"
      },
      {
        title: "CRYPTO TRADING BOTS",
        description: "Learn more"
      },
      {
        title: "NFT MARKETPLACE",
        description: "Learn more"
      },
      {
        title: "DEFI PROTOCOLS",
        description: "Learn more"
      },
      {
        title: "SMART CONTRACTS",
        description: "Learn more"
      },
      {
        title: "CRYPTO WALLETS",
        description: "Learn more"
      }
    ],
    "Makeup Artist": [
      {
        title: "BRIDAL MAKEUP",
        description: "Learn more",
        videoUrl: "https://www.youtube.com/embed/sdXII5RKMTY?si=bCmaVIbfhhsHWj6P"
      },
      {
        title: "SPECIAL EFFECTS MAKEUP",
        description: "Learn more"
      },
      {
        title: "FASHION MAKEUP",
        description: "Learn more"
      },
      {
        title: "EDITORIAL MAKEUP",
        description: "Learn more"
      },
      {
        title: "CELEBRITY MAKEUP",
        description: "Learn more"
      },
      {
        title: "MAKEUP TUTORIALS",
        description: "Learn more"
      }
    ],
    "Yoga": [
      {
        title: "HATHA YOGA",
        description: "Learn more"
      },
      {
        title: "VINYASA FLOW",
        description: "Learn more"
      },
      {
        title: "MEDITATION CLASSES",
        description: "Learn more"
      },
      {
        title: "PRENATAL YOGA",
        description: "Learn more"
      },
      {
        title: "HOT YOGA",
        description: "Learn more"
      },
      {
        title: "YIN YOGA",
        description: "Learn more"
      }
    ],
    "Sports": [
      {
        title: "PERSONAL TRAINING",
        description: "Learn more"
      },
      {
        title: "TEAM COACHING",
        description: "Learn more"
      },
      {
        title: "FITNESS PROGRAMS",
        description: "Learn more"
      },
      {
        title: "SPORTS NUTRITION",
        description: "Learn more"
      },
      {
        title: "INJURY PREVENTION",
        description: "Learn more"
      },
      {
        title: "PERFORMANCE ANALYSIS",
        description: "Learn more"
      }
    ],
    "Real Estate": [
      {
        title: "PROPERTY LISTING",
        description: "Learn more"
      },
      {
        title: "HOME STAGING",
        description: "Learn more"
      },
      {
        title: "MARKET ANALYSIS",
        description: "Learn more"
      },
      {
        title: "INVESTMENT ADVICE",
        description: "Learn more"
      },
      {
        title: "PROPERTY MANAGEMENT",
        description: "Learn more"
      },
      {
        title: "VIRTUAL TOURS",
        description: "Learn more"
      }
    ],
    "Photography": [
      {
        title: "WEDDING PHOTOGRAPHY",
        description: "Learn more"
      },
      {
        title: "PORTRAIT SESSIONS",
        description: "Learn more"
      },
      {
        title: "COMMERCIAL SHOOTS",
        description: "Learn more"
      },
      {
        title: "EVENT PHOTOGRAPHY",
        description: "Learn more"
      },
      {
        title: "PRODUCT PHOTOGRAPHY",
        description: "Learn more"
      },
      {
        title: "PHOTO EDITING",
        description: "Learn more"
      }
    ],
    "Charity": [
      {
        title: "FUNDRAISING CAMPAIGNS",
        description: "Learn more"
      },
      {
        title: "VOLUNTEER COORDINATION",
        description: "Learn more"
      },
      {
        title: "COMMUNITY OUTREACH",
        description: "Learn more"
      },
      {
        title: "DONATION MANAGEMENT",
        description: "Learn more"
      },
      {
        title: "AWARENESS PROGRAMS",
        description: "Learn more"
      },
      {
        title: "IMPACT REPORTING",
        description: "Learn more"
      }
    ],
    "Courses": [
      {
        title: "ONLINE LEARNING",
        description: "Learn more"
      },
      {
        title: "SKILL DEVELOPMENT",
        description: "Learn more"
      },
      {
        title: "CERTIFICATION PROGRAMS",
        description: "Learn more"
      },
      {
        title: "TUTORING SERVICES",
        description: "Learn more"
      },
      {
        title: "WORKSHOP CREATION",
        description: "Learn more"
      },
      {
        title: "COURSE MARKETING",
        description: "Learn more"
      }
    ]
  };

  // Determine visible services count per category
  const items = servicesByCategory[selectedCategory] ?? [];
  const visibleServices = selectedCategory === "Crypto" ? items.slice(0, 3) : items;

  return (
    <div className="py-16 bg-gradient-to-br from-background via-muted/10 to-primary-light/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            SINGLE SERVICES WE PROVIDE
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b border-purple-200 pb-2">
                Line style
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      selectedCategory === category 
                        ? 'bg-purple-200 border-purple-400 text-purple-800 font-medium' 
                        : 'bg-purple-50 border-purple-200 text-gray-600 hover:bg-purple-100'
                    }`}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleServices.map((service, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  {service.videoUrl ? (
                    <div className="h-40 rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={service.videoUrl}
                        title={service.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-xl p-6 flex flex-col justify-between text-white shadow-lg">
                      <div>
                        <h3 className="text-lg font-bold mb-2 leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        {service.description}
                        <span className="ml-2">›</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              ABOUT BRANDWISE: OUR DIGITAL MISSION
            </h2>
            <div className="bg-white/10 rounded-xl p-6 md:p-8 backdrop-blur-sm min-h-[200px] flex items-center justify-center">
              <div className="text-center text-white/80">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-lg">Digital Innovation Space</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;