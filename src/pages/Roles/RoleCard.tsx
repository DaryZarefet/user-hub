import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Role } from "@/types";
import { Pencil, Shield, Trash2 } from "lucide-react";

interface RoleCardProps {
  object: Role;
  openEdit?: (object: Role) => void;
  openDelete?: (object: Role) => void;
}

export const RoleCard = ({ object, openEdit, openDelete }: RoleCardProps) => {
  const { name, deleted } = object;

  return (
    <Card key={name} className={`p-6 border-0 bg-muted/30 backdrop-blur-sm transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground capitalize">{name}</h3>
            <p className="text-sm text-muted-foreground">{deleted ? "Eliminado" : "Activo"}</p>
          </div>
        </div>
        {openEdit && openDelete && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => openEdit(object)} className="h-9 w-9 hover:bg-primary/10">
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => openDelete(object)} className="h-9 w-9 hover:bg-destructive/10">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
