import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const CreateRole = ({ isCreateOpen, setIsCreateOpen, role, setRole, loading, handleCreate }) => {
  return (
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
      <DialogContent className="bg-card border-0">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
          <DialogDescription>Ingresa el nombre del nuevo rol para el sistema.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Nombre del rol"
            value={role?.name}
            onChange={(e) => setRole({ ...role, name: e.target.value })}
            className="bg-background border-input"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={loading} className="bg-primary hover:bg-primary/90">
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Crear Rol
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
