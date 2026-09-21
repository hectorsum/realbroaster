import { PhoneIcon, WhatsAppIcon, InstagramIcon, FacebookIcon, TikTokIcon } from "./Icons";
import SwitchButton from "./SwitchButton";

// NOTE: social icons render as pilot lights only — wire real profile URLs in once confirmed.
const SOCIALS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "TikTok", Icon: TikTokIcon },
];

export default function ContactPanel() {
  return (
    <section className="relative bg-panel-2 px-5 py-16 sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="brushed relative w-full rounded-md border border-black/40 bg-panel px-6 py-9 shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:px-14 sm:py-12">
          <span className="rivet absolute left-3 top-3" />
          <span className="rivet absolute right-3 top-3" />
          <span className="rivet absolute bottom-3 left-3" />
          <span className="rivet absolute bottom-3 right-3" />

          <h2
            className="engraved text-4xl font-extrabold uppercase tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Antojo detectado
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-steel">
            Marca la línea directa o escríbenos por WhatsApp. Sin esperas de app: hablas con quien lo fríe.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row">
            <SwitchButton href="tel:+34923921581" variant="primary" Icon={PhoneIcon}>
              923 921 581
            </SwitchButton>
            <SwitchButton href="https://wa.me/34923921581" external variant="secondary" Icon={WhatsAppIcon}>
              WhatsApp
            </SwitchButton>
          </div>
        </div>

        <div className="mt-9 flex items-center gap-5">
          {SOCIALS.map(({ label, Icon }) => (
            <span
              key={label}
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-steel-dim/60 bg-panel text-steel shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <Icon className="h-5 w-5" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
