import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GridCard = ({ title, stats, Icon }) => {
  return (
    <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{stats}</div>
      </CardContent>
    </Card>
  );
};
