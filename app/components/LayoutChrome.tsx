"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import FloatingIcons from "./FloatingIcons";

export default function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />}
      {!isAdmin && (
        <FloatingIcons
          chatOpen={chatOpen}
          onChatClick={() => setChatOpen((v) => !v)}
        />
      )}
    </>
  );
}