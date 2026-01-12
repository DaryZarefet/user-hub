import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield, Users, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
            <Shield className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Panel de Gestión de{' '}
            <span className="text-primary">Usuarios y Roles</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Sistema completo de autenticación con gestión de usuarios, 
            roles y permisos. Controla el acceso de forma segura.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
              <Link to="/auth">
                Comenzar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Autenticación Segura</h3>
              <p className="text-sm text-muted-foreground">
                Login y registro con validación de email y contraseñas cifradas
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Gestión de Usuarios</h3>
              <p className="text-sm text-muted-foreground">
                Visualiza y administra todos los usuarios registrados en el sistema
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Sistema de Roles</h3>
              <p className="text-sm text-muted-foreground">
                Asigna roles como Admin, Moderador o Usuario con diferentes permisos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
