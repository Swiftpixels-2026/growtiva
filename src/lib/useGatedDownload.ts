import { downloadIssuePdf as rawDownload } from "@/lib/downloadIssuePdf";
import { useEmailGate } from "@/lib/emailGate";
import type { Issue } from "@/data/content";

export const useGatedDownload = () => {
  const { require } = useEmailGate();
  return async (issue: Issue) => {
    try {
      await require("download the PDF");
      await rawDownload(issue);
    } catch { /* dismissed */ }
  };
};
