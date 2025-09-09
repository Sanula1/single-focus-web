import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play, Clock, Users } from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  embedUrl: string;
}

const VideoSlide = () => {
  const videos: VideoData[] = [
    {
      id: "1",
      title: "Getting Started with SurakshaLMS",
      description: "Learn the basics of our learning management system",
      thumbnail: "/lovable-uploads/320ffdf1-7c7f-4d27-bfe2-417fff7520d7.png",
      duration: "5:30",
      views: "1.2K",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "2", 
      title: "Student Dashboard Overview",
      description: "Navigate your student portal efficiently",
      thumbnail: "/lovable-uploads/940bccf4-66c3-4e17-879f-116758a6734f.png",
      duration: "8:15",
      views: "2.5K",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "3",
      title: "Teacher Tools & Features",
      description: "Master the teaching tools in SurakshaLMS",
      thumbnail: "/lovable-uploads/1c820b3b-5498-4aa7-80b2-5288bac37bd0.png",
      duration: "12:45",
      views: "3.1K",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const handleVideoPlay = (video: VideoData) => {
    // Open video in modal or new tab
    window.open(video.embedUrl, '_blank');
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-muted/30 to-primary-light/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Learn with Video Tutorials
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Master SurakshaLMS with our comprehensive video guides designed for all user types
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {videos.map((video) => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          className="w-16 h-16 rounded-full bg-primary hover:bg-primary-dark"
                          onClick={() => handleVideoPlay(video)}
                        >
                          <Play className="w-8 h-8 text-primary-foreground" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-sm mb-4">
                      {video.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{video.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default VideoSlide;