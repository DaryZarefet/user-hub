import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/JwtAuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { XaviaLogo } from "@/components/XaviaLogo";
import { WaveDecoration } from "@/components/WaveDecoration";

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-xavia-brown">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-xavia-brown relative overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img src="/src/static/imgs/logo.png" alt="XAVIA OAuth" className="absolute bottom-0 left-0 h-24 w-auto" />
          </div>

          {/* Description */}
          <p className="text-lg text-xavia-cream/80 mb-8 max-w-md mx-auto">
            Sistema de autenticación y gestión de usuarios con roles. Administra tu equipo de forma segura y eficiente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2">
              Acceder al Sistema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-xavia-cream/5 rounded-xl p-6 border border-xavia-cream/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xavia-cream font-semibold mb-2">Autenticación Segura</h3>
              <p className="text-xavia-cream/60 text-sm">Login y registro con validación robusta y manejo seguro de credenciales.</p>
            </div>

            <div className="bg-xavia-cream/5 rounded-xl p-6 border border-xavia-cream/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xavia-cream font-semibold mb-2">Gestión de Usuarios</h3>
              <p className="text-xavia-cream/60 text-sm">Visualiza y administra todos los usuarios registrados en el sistema.</p>
            </div>

            <div className="bg-xavia-cream/5 rounded-xl p-6 border border-xavia-cream/10 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xavia-cream font-semibold mb-2">Control de Roles</h3>
              <p className="text-xavia-cream/60 text-sm">Sistema de roles con Admin, Moderador y Usuario para control de acceso.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <WaveDecoration />

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-xavia-cream/10">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <XaviaLogo size="sm" showText={false} />
              <span className="text-xavia-cream font-semibold">XAVIA</span>
            </div>
            <p className="text-xavia-cream/50 text-sm">© 2025 Universidad de las Ciencias Informáticas. XAVIA OAuth. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
