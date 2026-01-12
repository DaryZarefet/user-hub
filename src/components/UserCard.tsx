import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Calendar } from "lucide-react";
import { User } from "@/types";
import { RoleBadge } from "./RoleBadge";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { username, roles } = user;

  const initials = username
    ?.split(" ")
    ?.map((n: string) => n[0])
    ?.join("")
    ?.toUpperCase()
    ?.slice(0, 2);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/10 transition-transform group-hover:scale-105">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{username || "Sin nombre"}</h3>

            <div className="flex flex-wrap gap-2 mt-3">
              {roles?.map((role, idx) => (
                <RoleBadge key={idx} role={role} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
