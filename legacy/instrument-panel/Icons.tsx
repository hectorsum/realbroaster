type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6.5 3.5h3l1.4 4.2-2.1 1.6a12.5 12.5 0 0 0 5.9 5.9l1.6-2.1 4.2 1.4v3a2 2 0 0 1-2.2 2C10.9 19 5 13.1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 17.2 4.5 19.5 5 16A7.6 7.6 0 1 1 8.7 19l-1.7-.8Z" />
      <path d="M9.3 8.7c0 3 2.7 6 6 6l1-1.7-2.4-1-1 1.1a5.7 5.7 0 0 1-2.7-2.7L11.3 9l-1-2.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M14.5 21v-7h2.3l.4-3H14.5V9c0-.9.3-1.6 1.7-1.6h1.6V4.7A21 21 0 0 0 15.4 4.5c-2.4 0-4 1.5-4 4.2V11H8.9v3h2.5v7Z" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M13 3.5v10.8a2.9 2.9 0 1 1-2.1-2.8" />
      <path d="M13 3.5c.4 2 2 3.5 4 3.7" />
    </svg>
  );
}

export function ScooterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M6 18h4l2.2-6.4H16" />
      <path d="M12.2 11.6 14 7.5h2.6" />
      <path d="M8 18h6.3" />
      <path d="M16.5 15.2h1.6" />
    </svg>
  );
}

export function TicketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8.5A2.5 2.5 0 0 0 4 13.5V16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1 0-5V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z" />
      <path d="M14 5.5v13" strokeDasharray="1.6 2.2" />
    </svg>
  );
}

export function DialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12 15.2 8" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
