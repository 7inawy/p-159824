
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  
  // Email auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Phone auth states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Email authentication handlers
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email for verification link.",
        });
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Phone authentication handlers
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Note: Supabase requires phone auth to be enabled in the dashboard
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      
      if (error) throw error;
      
      setShowOtpInput(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error sending OTP",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Phone verified!",
          description: "You have successfully logged in.",
        });
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error verifying OTP",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FEF1E8] p-4" dir="rtl">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-lg">
        <CardHeader className="bg-[#F97415] text-white text-center p-6">
          <CardTitle className="text-2xl font-bold">مرحباً بك</CardTitle>
          <CardDescription className="text-white/90">
            أنشئ حسابك الآن وابدأ رحلة البيع الإلكتروني
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="p-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    type="button"
                    variant={authMethod === "email" ? "default" : "outline"}
                    onClick={() => setAuthMethod("email")}
                    className="flex-1"
                  >
                    البريد الإلكتروني
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === "phone" ? "default" : "outline"}
                    onClick={() => setAuthMethod("phone")}
                    className="flex-1"
                  >
                    رقم الهاتف
                  </Button>
                </div>

                {authMethod === "email" ? (
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+966XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={showOtpInput}
                      />
                    </div>
                    
                    {showOtpInput && (
                      <div className="space-y-2">
                        <Label htmlFor="otp">رمز التحقق</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="أدخل رمز التحقق"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading
                        ? "جاري التحميل..."
                        : showOtpInput
                        ? "تحقق من الرمز"
                        : "إرسال رمز التحقق"}
                    </Button>
                    
                    {showOtpInput && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setShowOtpInput(false)}
                      >
                        العودة
                      </Button>
                    )}
                  </form>
                )}
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="register" className="p-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    type="button"
                    variant={authMethod === "email" ? "default" : "outline"}
                    onClick={() => setAuthMethod("email")}
                    className="flex-1"
                  >
                    البريد الإلكتروني
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === "phone" ? "default" : "outline"}
                    onClick={() => setAuthMethod("phone")}
                    className="flex-1"
                  >
                    رقم الهاتف
                  </Button>
                </div>

                {authMethod === "email" ? (
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">البريد الإلكتروني</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">كلمة المرور</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "جاري التحميل..." : "إنشاء حساب"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-phone">رقم الهاتف</Label>
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+966XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={showOtpInput}
                      />
                    </div>
                    
                    {showOtpInput && (
                      <div className="space-y-2">
                        <Label htmlFor="register-otp">رمز التحقق</Label>
                        <Input
                          id="register-otp"
                          type="text"
                          placeholder="أدخل رمز التحقق"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading
                        ? "جاري التحميل..."
                        : showOtpInput
                        ? "تحقق من الرمز"
                        : "إرسال رمز التحقق"}
                    </Button>
                    
                    {showOtpInput && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setShowOtpInput(false)}
                      >
                        العودة
                      </Button>
                    )}
                  </form>
                )}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex justify-center p-6 bg-gray-50">
          <p className="text-sm text-gray-600">
            بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
