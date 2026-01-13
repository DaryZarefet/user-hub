import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const EditRole = ({ isEditOpen, setIsEditOpen, role, setRole, loading, handleEdit }) => {
  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent className="bg-card border-0">
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
          <DialogDescription>Modifica el nombre del rol seleccionado.</DialogDescription>
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
          <Button variant="outline" onClick={() => setIsEditOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
