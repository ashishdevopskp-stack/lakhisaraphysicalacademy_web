// app/components/FloatingIcons.tsx
"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MessageCircle } from "lucide-react";

const SOCIALS = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/trainer.ganesh.2025?rdid=VKCg5epDr9XWKwf5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1SsmvbtHrj%2F",
    color: "#1877F2",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/lakhisarai_physical_academy?igsh=ZWh2Y3Zxa3J1cGxt",
    color: "#E1306C",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://youtube.com/@lakhisaraiphysicalacademy?si=S80l_B7Z0lWTtZSU",
    color: "#FF0000",
  },
];

export default function FloatingIcons({
  chatOpen,
  onChatClick,
}: {
  chatOpen: boolean;
  onChatClick: () => void;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Chat open hone par social icons hide — panel ke Send button ke
          upar aakar overlap kar rahe the */}
      {!chatOpen &&
        SOCIALS.map(({ label, icon: Icon, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{ backgroundColor: color }}
            className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
          >
            <Icon size={20} />
          </a>
        ))}

      {!chatOpen && (
        <button
          type="button"
          onClick={onChatClick}
          aria-label="Chat with us"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle size={20} />
        </button>
      )}
    </div>
  );
}