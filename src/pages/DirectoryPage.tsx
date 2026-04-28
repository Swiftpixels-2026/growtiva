import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Directory from "@/components/site/Directory";
import { useEffect } from "react";

const DirectoryPage = () => {
  useEffect(() => {
    document.title = "Business Directory — Growtiva Africa";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "A vetted directory of African businesses across Technology, Music, Business, Automobile, Fashion, and more."
    );
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Directory />
      <Footer />
    </main>
  );
};

export default DirectoryPage;
