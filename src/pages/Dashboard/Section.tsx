import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Seeker } from "./Seeker";

interface SectionProps {
  loading: boolean;
  filterdata: any[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  Icon: any;
  Component: any;
  placeholderNotFound: string;
  placeholderNoData: string;
  cardtitle: string;
  carddescription: string;
  setObj?: React.Dispatch<React.SetStateAction<any>>;
  setIsCreateOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  openEdit?: (object: any) => void;
  openDelete?: (object: any) => void;
}

export const Section = ({
  loading,
  filterdata,
  searchTerm,
  setSearchTerm,
  Icon,
  Component,
  placeholderNotFound,
  placeholderNoData,
  cardtitle,
  carddescription,
  setObj,
  setIsCreateOpen,
  openEdit,
  openDelete,
}: SectionProps) => {
  return (
    <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-foreground">{cardtitle}</CardTitle>
            <CardDescription>{carddescription}</CardDescription>
          </div>
          <Seeker
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Buscar usuarios..."
            setObj={setObj}
            setIsCreateOpen={setIsCreateOpen}
            buttonAdd={"Crear"}
          />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3]?.map((i) => (
              <Card key={i} className="p-6 bg-muted/50">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filterdata?.length === 0 || !filterdata ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">{searchTerm ? placeholderNotFound : placeholderNoData}</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Intenta con otro término de búsqueda" : "Los usuarios aparecerán aquí cuando se registren"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterdata?.map((userItem) => (
              <Component object={userItem} openEdit={openEdit} openDelete={openDelete} key={userItem.id} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
