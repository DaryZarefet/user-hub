import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'moderator' | 'user';

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

const roleConfig = {
  admin: {
    label: 'Administrador',
    icon: ShieldCheck,
    className: 'bg-role-admin/10 text-role-admin border-role-admin/20 hover:bg-role-admin/20',
  },
  moderator: {
    label: 'Moderador',
    icon: Shield,
    className: 'bg-role-moderator/10 text-role-moderator border-role-moderator/20 hover:bg-role-moderator/20',
  },
  user: {
    label: 'Usuario',
    icon: User,
    className: 'bg-role-user/10 text-role-user border-role-user/20 hover:bg-role-user/20',
  },
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn('gap-1.5 font-medium', config.className, className)}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
