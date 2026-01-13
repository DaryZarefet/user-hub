import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Seeker = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder={placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background border-input" />
    </div>
  );
};
