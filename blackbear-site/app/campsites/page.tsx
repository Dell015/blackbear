import PublicShell from "@/components/PublicShell";
import Campsites from "@/components/CampExplorer";

export const metadata = { title: "Find your camp", description: "Seven Black Bear campsites across Isabela and Cagayan, with directions, hours and a one-tap call." };
export default function CampsitesPage() {
  return (
    <PublicShell title="Find a Black Bear campsite">
      <Campsites />
    </PublicShell>
  );
}
