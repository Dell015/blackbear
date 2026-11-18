import PublicShell from "@/components/PublicShell";
import Story from "@/components/Story";

export const metadata = { title: "Our story", description: "Black Bear Kitchen + Coffee, est. 2020 in Isabela." };
export default function StoryPage() {
  return (
    <PublicShell title="The Black Bear story">
      <Story />
    </PublicShell>
  );
}
