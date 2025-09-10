import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, GraduationCap, User, UserCheck, Clock } from "lucide-react";

const WebsitePreviewSection = () => {
  const categories = [
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "teacher", label: "Teacher", icon: User },
    { id: "parent", label: "Parent", icon: Users },
    { id: "attendance", label: "Attendance Marker", icon: UserCheck },
    { id: "admin", label: "Institute Admin", icon: Clock }
  ];

  const roleDescriptions = {
    student: "Access personalized learning dashboards, track your progress, submit assignments, and collaborate with classmates in an intuitive digital environment designed for academic success.",
    teacher: "Manage classes efficiently with integrated tools for lesson planning, grading, attendance tracking, and student engagement through interactive whiteboards and multimedia content.",
    parent: "Stay connected with your child's educational journey through real-time progress reports, attendance notifications, communication with teachers, and involvement in learning activities.",
    attendance: "Streamline attendance management with automated tracking systems, generate detailed reports, monitor student participation, and maintain accurate records across all educational programs.",
    admin: "Oversee institutional operations with comprehensive management tools for staff coordination, student enrollment, academic scheduling, and performance analytics across the entire institute."
  };

  return (
    <div className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
            Comprehensive learning management system designed for every role in the education ecosystem
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-12 bg-muted/50 p-1 rounded-lg h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex flex-col gap-2 py-4 px-3 text-sm h-auto"
              >
                <category.icon className="w-6 h-6" />
                <span className="text-center leading-tight">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(roleDescriptions).map(([key, description]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 border border-primary/20">
                  <p className="text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default WebsitePreviewSection;