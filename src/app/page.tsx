import { site } from "@/data/site";

export default function Home() {
  return <main id="main" className="shell section"><h1 className="section-title">{site.name}</h1><p className="lead">{site.description}</p></main>;
}
