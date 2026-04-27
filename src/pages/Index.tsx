import { useEffect } from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import LatestIssue from "@/components/site/LatestIssue";
import AllIssues from "@/components/site/AllIssues";
import Categories from "@/components/site/Categories";
import Community from "@/components/site/Community";
import Newsletter from "@/components/site/Newsletter";
import Advertise from "@/components/site/Advertise";
import Footer from "@/components/site/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Growtiva Africa — A Digital Magazine for a New Generation";
    const desc =
      "Growtiva Africa is a digital magazine documenting business, lifestyle, culture, and money across a new generation of Africans.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <LatestIssue />
      <AllIssues />
      <Categories />
      <Community />
      <Newsletter />
      <Advertise />
      <Footer />
    </main>
  );
};

export default Index;
