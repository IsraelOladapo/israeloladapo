import { Facebook, Globe2Icon, Twitter } from "lucide-react";
import { CONTACT } from "@/lib/utils";
export default function Social() {
  return (
    <div className="pt-6 border-t border-border flex items-center justify-center gap-6">
      <a
        href={CONTACT.twitter}
        target="_blank"
        className="hover:text-primary transition"
      >
        <Twitter className="w-6 h-6" />
      </a>
      <a
        href={CONTACT.facebook}
        target="_blank"
        className="hover:text-primary transition"
      >
        <Facebook className="w-6 h-6" />
      </a>
      <a
        href="https://myshop-online.vercel.app"
        target="_blank"
        className="hover:text-primary transition"
      >
        <Globe2Icon className="w-6 h-6" />
      </a>
    </div>
  );
}
