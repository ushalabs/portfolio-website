import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";
import { About, Experience, Stack } from "@/components/profile-sections";
import { Contact } from "@/components/contact";

export default function Home() {
  return <main id="main"><Hero /><Featured /><Stack /><Experience /><About /><Contact /></main>;
}
