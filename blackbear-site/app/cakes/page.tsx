import { redirect } from "next/navigation";

export const metadata = { title: "Cakes", description: "Today’s cake case at every Black Bear campsite." };
export default function CakesPage() {
  redirect("/menu?type=cakes&category=cakes");
}
