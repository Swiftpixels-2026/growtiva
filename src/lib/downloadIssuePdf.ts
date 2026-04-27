import { toast } from "sonner";
import type { Issue } from "@/data/content";

/**
 * Downloads the PDF for an issue. If the issue has no pdfUrl, or the file
 * cannot be reached, an error toast is shown instead.
 */
export async function downloadIssuePdf(issue: Issue) {
  if (!issue.pdfUrl) {
    toast.error(`Issue ${issue.number} PDF isn't available yet.`, {
      description: "Subscribe to the newsletter to be notified when it's released.",
    });
    return;
  }

  try {
    const head = await fetch(issue.pdfUrl, { method: "HEAD" });
    if (!head.ok) throw new Error(`HTTP ${head.status}`);
  } catch {
    toast.error(`We couldn't find the PDF for Issue ${issue.number}.`, {
      description: "The file may be temporarily unavailable. Please try again shortly.",
    });
    return;
  }

  const a = document.createElement("a");
  a.href = issue.pdfUrl;
  a.download = `growtiva-africa-issue-${issue.number}.pdf`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast.success(`Downloading Issue ${issue.number}…`);
}
