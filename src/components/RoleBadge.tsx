import { Role } from "@/types";

interface RoleBadgeProps {
  role: Role;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const { name } = role;

  // return <Badge variant="outline">{name}</Badge>;
  return <div>{name}</div>;
}
