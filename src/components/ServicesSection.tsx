const ServicesSection = () => {
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

  const services = [
    {
      title: "SEO",
      description: "Learn more"
    },
    {
      title: "SOCIAL MEDIA MARKETING",
      description: "Learn more"
    },
    {
      title: "PPC ADVERTISING", 
      description: "Learn more"
    },
    {
      title: "EMAIL MARKETING",
      description: "Learn more"
    },
    {
      title: "INFLUENCER MARKETING",
      description: "Learn more"
    },
    {
      title: "CONTENT WRITING",
      description: "Learn more"
    }
  ];

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
                    className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-gray-600 hover:bg-purple-100 transition-colors cursor-pointer"
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
              {services.map((service, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
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