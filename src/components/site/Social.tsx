import { Instagram, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/growtivaafrica", Icon: Instagram },
  { name: "Twitter / X", href: "https://twitter.com/growtivaafrica", Icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/growtiva-africa", Icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/@growtivaafrica", Icon: Youtube },
  { name: "Email", href: "mailto:hello@growtiva.africa", Icon: Mail },
];

type Props = { className?: string; size?: number };

const Social = ({ className = "", size = 18 }: Props) => (
  <div className={`flex items-center gap-5 ${className}`}>
    {SOCIALS.map(({ name, href, Icon }) => (
      <a
        key={name}
        href={href}
        aria-label={name}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent transition-colors"
      >
        <Icon size={size} strokeWidth={1.5} />
      </a>
    ))}
  </div>
);

export default Social;
