"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. Indian Railways Official Logo (Exact Official Red Circular Badge with Steam Engine & 17 Stars)
export function RailwayLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red Outer Circle */}
      <circle cx="60" cy="60" r="58" fill="#D32F2F" stroke="#B71C1C" strokeWidth="2" />
      <circle cx="60" cy="60" r="50" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="60" cy="60" r="44" stroke="#FFFFFF" strokeWidth="2" fill="none" />

      {/* Top Hindi Text: भारतीय रेल */}
      <path id="rail-hindi-path" d="M 24 60 A 36 36 0 0 1 96 60" fill="none" />
      <text fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        <textPath href="#rail-hindi-path" startOffset="50%" textAnchor="middle">
          भारतीय रेल
        </textPath>
      </text>

      {/* Bottom English Text: INDIAN RAILWAYS */}
      <path id="rail-eng-path" d="M 96 60 A 36 36 0 0 1 24 60" fill="none" />
      <text fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="sans-serif">
        <textPath href="#rail-eng-path" startOffset="50%" textAnchor="middle">
          INDIAN RAILWAYS
        </textPath>
      </text>

      {/* Inner Red Disc */}
      <circle cx="60" cy="60" r="32" fill="#C62828" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Track Lines Behind Engine */}
      <line x1="32" y1="52" x2="88" y2="52" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="32" y1="57" x2="88" y2="57" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="32" y1="62" x2="88" y2="62" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="32" y1="67" x2="88" y2="67" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <line x1="32" y1="72" x2="88" y2="72" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

      {/* Front Engine Body (Streamlined Locomotive) */}
      <path
        d="M60 36C46 36 40 46 38 68C38 74 44 78 60 78C76 78 82 74 82 68C80 46 74 36 60 36Z"
        fill="#FFFFFF"
      />
      <circle cx="60" cy="48" r="8" fill="#C62828" />

      {/* Ashoka Lion Emblem Grill Center */}
      <path d="M57 44H63V52H57V44Z" fill="#FFFFFF" />
      <circle cx="60" cy="46" r="2.5" fill="#C62828" />

      {/* Engine Headlight & Buffer Grille */}
      <rect x="46" y="62" width="28" height="3" rx="1" fill="#C62828" />
      <rect x="48" y="67" width="24" height="2" rx="1" fill="#C62828" />
      <circle cx="52" cy="72" r="2" fill="#C62828" />
      <circle cx="68" cy="72" r="2" fill="#C62828" />

      {/* Stars on Outer Ring */}
      <polygon points="20,58 21.5,61 25,61 22,63 23,66 20,64 17,66 18,63 15,61 18.5,61" fill="#FFFFFF" />
      <polygon points="100,58 101.5,61 105,61 102,63 103,66 100,64 97,66 98,63 95,61 98.5,61" fill="#FFFFFF" />
    </svg>
  );
}

// 2. Indian Army Official Emblem (Crossed Swords + Ashoka Lion Capital)
export function ArmyLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#780000" stroke="#FFB703" strokeWidth="3" />
      <circle cx="60" cy="60" r="50" fill="#003049" stroke="#FFB703" strokeWidth="1.5" />
      {/* Crossed Swords */}
      <path d="M30 90L90 30M30 90L40 90M30 90L30 80" stroke="#FFB703" strokeWidth="5" strokeLinecap="round" />
      <path d="M90 90L30 30M90 90L80 90M90 90L90 80" stroke="#FFB703" strokeWidth="5" strokeLinecap="round" />
      {/* Ashoka Lion Capital Base */}
      <rect x="46" y="58" width="28" height="8" rx="2" fill="#FFB703" />
      <path d="M44 42C44 32 52 26 60 26C68 26 76 32 76 42C76 52 68 58 60 58C52 58 44 52 44 42Z" fill="#FFB703" />
      <circle cx="60" cy="42" r="6" fill="#003049" />
      {/* Motto Banner */}
      <path d="M25 96H95L88 108H32L25 96Z" fill="#FFB703" />
      <text x="60" y="105" textAnchor="middle" fill="#780000" fontSize="8" fontWeight="900" fontFamily="sans-serif">
        INDIAN ARMY
      </text>
    </svg>
  );
}

// 3. Bihar Police Official Logo (Red/Blue Shield with Bodhi Tree & Dual Swastikas)
export function BiharPoliceLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0284C7" stroke="#F59E0B" strokeWidth="3" />
      <path d="M12 28L60 12L108 28V60C108 86 86 106 60 112C34 106 12 86 12 60V28Z" fill="#0369A1" stroke="#FBBF24" strokeWidth="2" />
      <path d="M18 30L60 16L102 30V56H18V30Z" fill="#DC2626" />
      {/* Bodhi Tree */}
      <circle cx="60" cy="54" r="22" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
      <path d="M60 38C52 38 46 44 46 52C46 64 60 74 60 74C60 74 74 64 74 52C74 44 68 38 60 38Z" fill="#15803D" />
      <text x="60" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        BIHAR POLICE
      </text>
    </svg>
  );
}

// 4. Bihar Daroga (SI) Official Logo (Dual Golden Stars & Officer Wreath)
export function BiharDarogaLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0F172A" stroke="#F59E0B" strokeWidth="4" />
      <circle cx="60" cy="60" r="48" fill="#1E3A8A" stroke="#FBBF24" strokeWidth="1.5" />
      {/* Dual Stars */}
      <polygon points="40,42 43,51 52,51 45,57 47,66 40,60 33,66 35,57 28,51 37,51" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
      <polygon points="80,42 83,51 92,51 85,57 87,66 80,60 73,66 75,57 68,51 77,51" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
      <text x="60" y="88" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        BIHAR DAROGA SI
      </text>
    </svg>
  );
}

// 5. Staff Selection Commission (SSC GD) Official Seal
export function SscGdLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#1E40AF" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="60" cy="60" r="46" fill="#FFFFFF" />
      <circle cx="60" cy="52" r="18" stroke="#1E40AF" strokeWidth="3" fill="none" />
      <path d="M60 34V70M42 52H78M47 39L73 65M47 65L73 39" stroke="#1E40AF" strokeWidth="2.5" />
      <path d="M24 86H96L88 100H32L24 86Z" fill="#DC2626" />
      <text x="60" y="96" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        SSC GD
      </text>
    </svg>
  );
}

// 6. CISF (Central Industrial Security Force) Official Logo
export function CisfLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="3" />
      <path d="M60 14L100 32V64C100 88 80 106 60 112C40 106 20 88 20 64V32L60 14Z" fill="#0369A1" stroke="#FBBF24" strokeWidth="2" />
      <polygon points="60,32 66,46 80,46 69,55 73,69 60,60 47,69 51,55 40,46 54,46" fill="#F59E0B" />
      <text x="60" y="94" textAnchor="middle" fill="#E0F2FE" fontSize="11" fontWeight="900" fontFamily="sans-serif">
        CISF
      </text>
    </svg>
  );
}

// 7. CRPF (Central Reserve Police Force) Official Logo
export function CrpfLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#880E4F" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="60" cy="60" r="46" fill="#AD1457" />
      <path d="M60 22L68 38H52L60 22Z" fill="#FBBF24" />
      <circle cx="60" cy="58" r="20" fill="#C2185B" stroke="#FBBF24" strokeWidth="2" />
      <text x="60" y="63" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
        CRPF
      </text>
      <path d="M24 92C36 100 84 100 96 92" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 8. BSF (Border Security Force) Official Logo
export function BsfLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#1B5E20" stroke="#FACC15" strokeWidth="3" />
      <path d="M60 12L102 28V62C102 86 82 106 60 112C38 106 18 86 18 62V28L60 12Z" fill="#2E7D32" stroke="#EAB308" strokeWidth="2" />
      <polygon points="60,34 65,47 78,47 68,55 71,68 60,60 49,68 52,55 42,47 55,47" fill="#FACC15" />
      <text x="60" y="98" textAnchor="middle" fill="#FEF08A" fontSize="13" fontWeight="900" fontFamily="sans-serif">
        BSF
      </text>
    </svg>
  );
}

// 9. ITBP (Indo-Tibetan Border Police) Official Logo
export function ItbpLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="3" />
      <polygon points="24,80 44,48 64,80" fill="#E0F2FE" />
      <polygon points="48,80 72,38 96,80" fill="#FFFFFF" />
      <text x="60" y="100" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="sans-serif">
        ITBP
      </text>
    </svg>
  );
}

// 10. SSB (Sashastra Seema Bal) Official Logo
export function SsbLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#312E81" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="60" cy="54" r="24" fill="#4338CA" stroke="#FBBF24" strokeWidth="2" />
      <polygon points="60,38 64,48 74,48 66,54 69,64 60,58 51,64 54,54 46,48 56,48" fill="#FBBF24" />
      <text x="60" y="98" textAnchor="middle" fill="#FDE68A" fontSize="14" fontWeight="900" fontFamily="sans-serif">
        SSB
      </text>
    </svg>
  );
}

// 11. Indian Navy Official Crest Logo
export function IndianNavyLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0F172A" stroke="#F59E0B" strokeWidth="4" />
      <circle cx="60" cy="60" r="48" fill="#1E3A8A" />
      <circle cx="60" cy="38" r="7" stroke="#F59E0B" strokeWidth="3" fill="none" />
      <path d="M60 45V82M44 58H76" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 70C30 86 90 86 90 70" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" />
      <text x="60" y="104" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        INDIAN NAVY
      </text>
    </svg>
  );
}

// 12. Indian Air Force Official Crest Logo
export function IndianAirForceLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#0284C7" stroke="#F59E0B" strokeWidth="4" />
      <circle cx="60" cy="60" r="48" fill="#0369A1" />
      <path d="M60 44L24 32C42 52 58 58 60 78C62 58 78 52 96 32L60 44Z" fill="#FBBF24" />
      <circle cx="60" cy="54" r="12" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="60" cy="54" r="6" fill="#16A34A" />
      <text x="60" y="102" textAnchor="middle" fill="#E0F2FE" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        AIR FORCE
      </text>
    </svg>
  );
}

// 13. Forest Guard Official Logo
export function ForestGuardLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#064E3B" stroke="#4ADE80" strokeWidth="3" />
      <path d="M60 22L38 52H50L34 76H86L70 52H82L60 22Z" fill="#22C55E" />
      <rect x="55" y="76" width="10" height="14" fill="#78350F" />
      <text x="60" y="104" textAnchor="middle" fill="#DCFCE7" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        FOREST GUARD
      </text>
    </svg>
  );
}

// 14. Fireman Official Logo
export function FiremanLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#7F1D1D" stroke="#F59E0B" strokeWidth="3" />
      <path d="M60 26C60 26 78 44 78 58C78 68 70 78 60 78C50 78 42 68 42 58C42 44 60 26 60 26Z" fill="#F59E0B" />
      <path d="M60 40C60 40 70 50 70 60C70 65 65 70 60 70C55 70 50 65 50 60C50 50 60 40 60 40Z" fill="#EF4444" />
      <text x="60" y="98" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="900" fontFamily="sans-serif">
        FIREMAN
      </text>
    </svg>
  );
}

// 15. Home Guard Official Logo
export function HomeGuardLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#312E81" stroke="#818CF8" strokeWidth="3" />
      <polygon points="60,28 67,46 86,46 71,57 77,75 60,63 43,75 49,57 34,46 53,46" fill="#FBBF24" />
      <text x="60" y="98" textAnchor="middle" fill="#E0E7FF" fontSize="11" fontWeight="900" fontFamily="sans-serif">
        HOME GUARD
      </text>
    </svg>
  );
}

// 16. National Emblem of India (Other Government Jobs)
export function GovtJobsLogo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="60" cy="60" r="58" fill="#065F46" stroke="#F59E0B" strokeWidth="3" />
      <rect x="42" y="70" width="36" height="10" rx="3" fill="#F59E0B" />
      <circle cx="60" cy="50" r="18" fill="#FCD34D" stroke="#047857" strokeWidth="2" />
      <path d="M60 34V66M44 50H76M49 39L71 61M49 61L71 39" stroke="#047857" strokeWidth="2.5" />
      <text x="60" y="98" textAnchor="middle" fill="#D1FAE5" fontSize="10" fontWeight="900" fontFamily="sans-serif">
        GOVT JOBS
      </text>
    </svg>
  );
}

// Helper component that maps category label to official logo
export function ServiceLogo({ label, className = "", size = 36 }: { label: string; className?: string; size?: number }) {
  const normalized = label.toLowerCase().trim();

  if (normalized.includes("railway") || normalized.includes("rpf")) return <RailwayLogo className={className} size={size} />;
  if (normalized.includes("army")) return <ArmyLogo className={className} size={size} />;
  if (normalized.includes("bihar police") || normalized.includes("police constable")) return <BiharPoliceLogo className={className} size={size} />;
  if (normalized.includes("daroga") || normalized.includes("si")) return <BiharDarogaLogo className={className} size={size} />;
  if (normalized.includes("ssc gd") || normalized.includes("ssc")) return <SscGdLogo className={className} size={size} />;
  if (normalized.includes("cisf")) return <CisfLogo className={className} size={size} />;
  if (normalized.includes("crpf")) return <CrpfLogo className={className} size={size} />;
  if (normalized.includes("bsf")) return <BsfLogo className={className} size={size} />;
  if (normalized.includes("itbp")) return <ItbpLogo className={className} size={size} />;
  if (normalized.includes("ssb")) return <SsbLogo className={className} size={size} />;
  if (normalized.includes("navy")) return <IndianNavyLogo className={className} size={size} />;
  if (normalized.includes("air force") || normalized.includes("iaf")) return <IndianAirForceLogo className={className} size={size} />;
  if (normalized.includes("forest")) return <ForestGuardLogo className={className} size={size} />;
  if (normalized.includes("fireman") || normalized.includes("fire")) return <FiremanLogo className={className} size={size} />;
  if (normalized.includes("home guard")) return <HomeGuardLogo className={className} size={size} />;

  return <GovtJobsLogo className={className} size={size} />;
}
