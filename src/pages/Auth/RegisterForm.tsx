import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsContent } from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import { Loader2, Lock, User } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import useAuthContext from "../../components/context/useAuthContext";

export const RegisterForm = () => {
  const { signUp } = useAuthContext();
  const { toast } = useToast();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await signUp(username, password);
      navigate("/dashboard");
    } catch (error) {
      if (error) {
        let message = error.message;
        if (error.message.includes("already registered")) {
          message = "Este username ya está registrado. Intenta iniciar sesión.";
        }
        toast({
          variant: "destructive",
          title: "Error al registrarse",
          description: message,
        });
      } else {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada. Ahora puedes acceder al panel.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="register">
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-username">Nombre de usuario</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="register-username"
              type="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 border-input focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="register-password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-input focus:ring-primary"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            "Crear Cuenta"
          )}
        </Button>
      </form>
    </TabsContent>
  );
};
