/**
 * Styled SVG logo marks for standards bodies.
 * These are stylised recreations, not official trademarked logos.
 */

function LogoWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-5 select-none opacity-60 hover:opacity-100 transition-opacity">
      {children}
    </div>
  );
}

/* ─── Standards Australia ─── */
export function SALogo() {
  return (
    <LogoWrap>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14.5" stroke="#1D1D1F" strokeWidth="1.2" />
        <path d="M16 4.5V16L24.5 23" stroke="#1D1D1F" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 20.5C10 20.5 12 23 16 23C20 23 22 20.5 22 20.5" stroke="#1D1D1F" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[13px] text-[#1D1D1F]" style={{ letterSpacing: "0.01em" }}>Standards</span>
        <span className="text-[10px] text-[#86868B] -mt-0.5" style={{ letterSpacing: "0.05em" }}>AUSTRALIA</span>
      </div>
    </LogoWrap>
  );
}

/* ─── AS/NZS ─── */
export function ASNZSLogo() {
  return (
    <LogoWrap>
      <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
        <rect x="1" y="1" width="34" height="26" rx="4" stroke="#1D1D1F" strokeWidth="1.2" />
        <text x="18" y="18" textAnchor="middle" fill="#1D1D1F" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">AS/NZS</text>
      </svg>
    </LogoWrap>
  );
}

/* ─── NCC (National Construction Code) ─── */
export function NCCLogo() {
  return (
    <LogoWrap>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26V12L16 5L26 12V26H6Z" stroke="#1D1D1F" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="13" y="18" width="6" height="8" stroke="#1D1D1F" strokeWidth="1.2" />
        <path d="M10 15H14M18 15H22" stroke="#1D1D1F" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[13px] text-[#1D1D1F]" style={{ letterSpacing: "0.02em" }}>NCC</span>
        <span className="text-[9px] text-[#86868B] -mt-0.5" style={{ letterSpacing: "0.03em" }}>National Construction Code</span>
      </div>
    </LogoWrap>
  );
}

/* ─── AIRAH ─── */
export function AIRAHLogo() {
  return (
    <LogoWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d="M15 3L27 10V20L15 27L3 20V10L15 3Z" stroke="#1D1D1F" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="15" cy="15" r="4" stroke="#1D1D1F" strokeWidth="1.2" />
        <path d="M15 11V8M15 22V19M19 15H22M8 15H11" stroke="#1D1D1F" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <span className="text-[13px] text-[#1D1D1F]" style={{ letterSpacing: "0.08em" }}>AIRAH</span>
    </LogoWrap>
  );
}

/* ─── Master Electricians Australia ─── */
export function MEALogo() {
  return (
    <LogoWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="13" stroke="#1D1D1F" strokeWidth="1.2" />
        <path d="M15 6L17.5 13H13L17 22" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex flex-col">
        <span className="text-[12px] text-[#1D1D1F]" style={{ letterSpacing: "0.01em" }}>Master Electricians</span>
        <span className="text-[9px] text-[#86868B] -mt-0.5" style={{ letterSpacing: "0.05em" }}>AUSTRALIA</span>
      </div>
    </LogoWrap>
  );
}

/* ─── MPAQ (Master Plumbers Assoc QLD) ─── */
export function MPAQLogo() {
  return (
    <LogoWrap>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect x="3" y="3" width="24" height="24" rx="12" stroke="#1D1D1F" strokeWidth="1.2" />
        <path d="M12 10V20M18 10V16C18 18.2 16.2 20 14 20H12" stroke="#1D1D1F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[13px] text-[#1D1D1F]" style={{ letterSpacing: "0.06em" }}>MPAQ</span>
    </LogoWrap>
  );
}

/* ─── HIA (Housing Industry Association) ─── */
export function HIALogo() {
  return (
    <LogoWrap>
      <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
        <path d="M4 14L16 4L28 14" stroke="#1D1D1F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12V25H25V12" stroke="#1D1D1F" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="13" y="17" width="6" height="8" stroke="#1D1D1F" strokeWidth="1.2" />
      </svg>
      <span className="text-[13px] text-[#1D1D1F]" style={{ letterSpacing: "0.06em" }}>HIA</span>
    </LogoWrap>
  );
}

export const allLogos = [SALogo, ASNZSLogo, NCCLogo, AIRAHLogo, MEALogo, MPAQLogo, HIALogo];
