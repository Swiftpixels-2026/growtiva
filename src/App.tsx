import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IssuesProvider } from "@/components/site/IssuesProvider";
import Index from "./pages/Index.tsx";
import Category from "./pages/Category.tsx";
import Story from "./pages/Story.tsx";
import DirectoryPage from "./pages/DirectoryPage.tsx";
import BusinessPage from "./pages/BusinessPage.tsx";
import IssuePage from "./pages/IssuePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <IssuesProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/business/:slug" element={<BusinessPage />} />
            <Route path="/issues/:slug" element={<IssuePage />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/story/:slug" element={<Story />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </IssuesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
