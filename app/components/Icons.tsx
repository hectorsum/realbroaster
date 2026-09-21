import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
});

export const PinIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ClockIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PhoneIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6.6 10.8c1.4 2.7 3.7 5 6.4 6.4l2.1-2.1a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.7 21 3 13.3 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const ArrowIcon = ({ size, strokeWidth = 2.6, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BurgerIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ size, strokeWidth = 3.4, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 13l5 5L19 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const HeartIcon = ({ size, filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(size)} {...p}>
    <path d="M12 20s-7-4.6-7-9.6A4.4 4.4 0 0 1 12 7.6 4.4 4.4 0 0 1 19 10.4c0 5-7 9.6-7 9.6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={filled ? "currentColor" : "none"} />
  </svg>
);

export const TrashIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ScooterIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M9 17h6l-2-9h-3M13 8h4l2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InstagramIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
  </svg>
);

export const TiktokIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M14 2h3.2c.28 2.2 1.63 3.93 3.8 4.25V9.5c-1.34.05-2.6-.3-3.8-1.02v6.3A5.78 5.78 0 1 1 11.4 9v3.3a2.5 2.5 0 1 0 2.6 2.5V2z" />
  </svg>
);

export const WhatsappIcon = ({ size, ...p }: P) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.87.5 3.62 1.38 5.12L2 22l5.2-1.53a9.8 9.8 0 0 0 4.84 1.26c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2zm5.66 13.92c-.24.67-1.4 1.3-1.93 1.34-.53.05-1.03.24-3.5-.86s-3.96-3.7-4.08-3.87c-.12-.17-.86-1.2-.82-2.26.04-1.07.6-1.58.8-1.8.2-.24.44-.29.6-.29h.43c.14 0 .33-.05.51.4.19.46.65 1.6.7 1.72.06.12.1.26.02.41-.08.15-.15.25-.29.4-.14.14-.3.32-.4.43-.12.12-.25.25-.11.5.14.24.63 1.04 1.35 1.68.93.83 1.7 1.09 1.94 1.21.24.12.38.1.52-.06.14-.17.6-.7.76-.94.17-.24.33-.2.56-.12.24.09 1.5.71 1.76.84.26.12.43.19.5.3.06.1.06.64-.18 1.3z" />
  </svg>
);
