import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useUserRole } from "@/hooks/useUserRole";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100),
  backendUrl: z.string().trim().url({ message: "Invalid URL format" }).max(500, { message: "URL too long" }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setBackendUrl, setTokens } = useUserRole();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      backendUrl: formData.get("backendUrl") as string,
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
      setBackendUrl(data.backendUrl);

      // Call login API
      const response = await fetch(`${data.backendUrl}/organization/api/v1/auth/login`, {
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-subtle)" }}>
      <Card className="w-full max-w-md shadow-[var(--shadow-elegant)]">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Suraksha OMS</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backend-url">Backend URL</Label>
              <Input 
                id="backend-url"
                name="backendUrl"
                type="url" 
                placeholder="https://api.example.com"
                required
              />
              {errors.backendUrl && <p className="text-sm text-destructive">{errors.backendUrl}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email"
                name="email"
                type="email" 
                placeholder="name@example.com"
                required
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password"
                name="password"
                type="password"
                required
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
