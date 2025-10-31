import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useUserRole } from "@/hooks/useUserRole";

const BACKEND_URL = "https://organizations-923357517997.europe-west1.run.app";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setBackendUrl, setTokens, accessToken, user } = useUserRole();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (accessToken && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [accessToken, user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate input
    const result = loginSchema.safeParse(data);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      toast.error("Please fix the form errors");
      return;
    }

    try {
      // Store backend URL
      setBackendUrl(BACKEND_URL);

      // Call login API
      const response = await fetch(`${BACKEND_URL}/organization/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const responseData = await response.json();

      // Store tokens and user data
      setTokens(responseData.accessToken, responseData.refreshToken);
      setUser(responseData.user);

      toast.success(`Welcome back, ${responseData.user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">SurakshaLMS</h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground">Please enter your details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-sm font-medium">Email address</Label>
              <Input 
                id="login-email"
                name="email"
                type="email" 
                placeholder="Enter your email"
                className="h-11"
                required
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input 
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember for 30 days
                </Label>
              </div>
              <button type="button" className="text-sm text-primary hover:underline font-medium">
                Forgot password
              </button>
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(96,165,250,0.2),transparent_50%)]" />
        <div className="relative flex items-center justify-center w-full p-12">
          <div className="text-white space-y-6 max-w-lg">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
                <span className="text-sm font-medium">Secure Learning Platform</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Transform Your Learning Journey
              </h2>
              <p className="text-blue-100 text-lg">
                Access comprehensive courses, track your progress, and achieve your educational goals with our advanced learning management system.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-blue-200 text-sm">Active Students</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Courses Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
