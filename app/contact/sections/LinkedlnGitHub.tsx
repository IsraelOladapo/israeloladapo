import { Linkedin, Github } from "lucide-react";
import { CONTACT } from "@/lib/utils";

export default function LinkedInGitHub() {
  return (
    <div className="mt-6 flex gap-3">
      <a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-slate-50 transition"
      >
        <Linkedin className="w-5 h-5 text-blue-600" /> LinkedIn
      </a>

      <a
        href={CONTACT.github}
        target="_blank"
        rel="noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-slate-50 transition"
      >
        <Github className="w-5 h-5" /> GitHub
      </a>
    </div>
  );
}
