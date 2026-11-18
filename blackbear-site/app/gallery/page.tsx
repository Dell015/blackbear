import PublicShell from "@/components/PublicShell";
import Gallery from "@/components/Gallery";

export const metadata = { title: "Life at camp", description: "Inside Black Bear: the campsites, the crew and the bold brews." };
export default function GalleryPage() {
  return (
    <PublicShell title="Life at Black Bear">
      <Gallery />
    </PublicShell>
  );
}
