import { redirect } from "next/navigation";
export default function CakesPage() {
  redirect("/menu?type=cakes&category=cakes");
}
