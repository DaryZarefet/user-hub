import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Seeker } from "./Seeker";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SectionProps {
  loading: boolean;
  filterdata: any[];
  totalItems: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
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
  totalItems,
  page,
  setPage,
  pageSize,
  setPageSize,
  sortOrder,
  setSortOrder,
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
  const totalPages = Math.max(1, Math.ceil((totalItems ?? 0) / pageSize));

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const pageSizeOptions = [5, 10, 20, 50];

  return (
    <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:items-center sm:justify-between gap-4">
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle className="text-xl text-foreground">{cardtitle}</CardTitle>
              <CardDescription>{carddescription}</CardDescription>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex-1 min-w-0">
                <Seeker
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder="Buscar roles..."
                  setObj={setObj}
                  setIsCreateOpen={setIsCreateOpen}
                  buttonAdd="Crear"
                />
              </div>
            </div>
          </div>

          {/* Controles de paginado y orden con Select */}
          <div className="flex items-center w-full justify-between mt-3 sm:mt-0">
            <div className="flex items-center gap-2">
              <label className="text-sm mr-1">Orden</label>
              <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">A → Z</SelectItem>
                  <SelectItem value="desc">Z → A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm ml-2 mr-1">Tamaño</label>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  const n = Number(v);
                  const safe = pageSizeOptions.includes(n) ? n : 10;
                  setPageSize(safe);
                  setPage(1); // reset page al cambiar tamaño
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem value={String(size)} key={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 ml-2">
                <Button variant="ghost" size="sm" onClick={onPrev} disabled={page <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm px-2">
                  {page} / {totalPages}
                </div>
                <Button variant="ghost" size="sm" onClick={onNext} disabled={page >= totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-6 bg-muted/50">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filterdata?.length === 0 || !filterdata ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">{searchTerm ? placeholderNotFound : placeholderNoData}</h3>
            <p className="text-sm text-muted-foreground">{searchTerm ? "Intenta con otro término de búsqueda" : "Los roles aparecerán aquí cuando se creen"}</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterdata?.map((userItem) => (
              <Component object={userItem} openEdit={openEdit} openDelete={openDelete} key={userItem.id ?? userItem.name} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
