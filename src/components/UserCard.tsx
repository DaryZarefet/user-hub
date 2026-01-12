import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoleBadge } from "./RoleBadge";
import { Mail, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { User } from "@/types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const initials = user?.username
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/10 transition-transform group-hover:scale-105">
            {/* <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || user.email} /> */}
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* <h3 className="font-semibold text-foreground truncate">{user.full_name || "Sin nombre"}</h3> */}

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <Mail className="h-3.5 w-3.5" />
              {/* <span className="truncate">{user.email}</span> */}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3" />
              {/* <span>{format(new Date(user.created_at), "d 'de' MMMM, yyyy", { locale: es })}</span> */}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {/* {user.roles.map((role) => (
                <RoleBadge key={role} role={role} />
              ))} */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
