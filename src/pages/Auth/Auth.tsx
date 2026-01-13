import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WaveDecoration } from "@/components/WaveDecoration";
import { LoginForm } from "@/pages/Auth/LoginForm";
import { RegisterForm } from "@/pages/Auth/RegisterForm";
import { Loader2 } from "lucide-react";

import useAuthContext from "@/components/context/useAuthContext";

export default function Auth() {
  const { loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[url('/src/static/imgs/water.png')] bg-cover bg-center">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center justify-center gap-3">
            <img src="/src/static/imgs/logo.png" alt="XAVIA OAuth" className="h-32 w-auto" />
            <span className="text-blue-950 text-4xl font-bold">XAVIA OAuth</span>
          </div>

          {/* Auth Card */}
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2 pb-4">
              <CardTitle className="text-lg font-semibold text-foreground">Accede a tu cuenta o regístrate</CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                {/* TABS */}
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
                  <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Registrarse
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <LoginForm />

                {/* REGISTER */}
                <RegisterForm />
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Wave decoration */}
      <WaveDecoration />

      {/* Footer */}
      <footer className="z-10 py-4 text-center text-sm">
        <p className="text-white text-sm">© 2025 Universidad de las Ciencias Informáticas. XAVIA OAuth. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
