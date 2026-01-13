import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface SeekerProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  setObj?: React.Dispatch<React.SetStateAction<any>>;
  setIsCreateOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonAdd?: string;
}

export const Seeker = ({ searchTerm, setSearchTerm, placeholder, setObj, setIsCreateOpen, buttonAdd }: SeekerProps) => {
  return (
    <div className="flex gap-3">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background border-input" />
      </div>

      {setObj && setIsCreateOpen && (
        <Button
          onClick={() => {
            setObj(null);
            setIsCreateOpen(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {buttonAdd}
        </Button>
      )}
    </div>
  );
};
