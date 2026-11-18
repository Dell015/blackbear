import PublicShell from "@/components/PublicShell";
import Menu from "@/components/MenuCatalog";

export const metadata = { title: "Menu", description: "Coffee, brunch, pasta, pizza and cakes. Full Black Bear menu with prices and cup sizes." };
export default function MenuPage() {
  return (
    <PublicShell title="Black Bear coffee, food and cakes menu">
      <Menu />
    </PublicShell>
  );
}
