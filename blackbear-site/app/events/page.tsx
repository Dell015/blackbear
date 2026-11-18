import PublicShell from "@/components/PublicShell";
import Events from "@/components/Events";

export const metadata = { title: "Private events", description: "Book the Black Bear conference room for meetings and small celebrations." };
export default function EventsPage() {
  return (
    <PublicShell title="Private gatherings at Black Bear">
      <Events />
    </PublicShell>
  );
}
