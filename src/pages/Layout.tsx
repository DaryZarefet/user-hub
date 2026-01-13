import { DashboardHeader } from "@/components/DashboardHeader";
import { WaveDecoration } from "@/components/WaveDecoration";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[url('/src/static/imgs/water.png')] bg-cover bg-center">
      <DashboardHeader />

      <main className="container px-4 py-8 relative z-10">{children}</main>
      <WaveDecoration />
    </div>
  );
};
