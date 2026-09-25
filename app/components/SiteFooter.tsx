import Image from "next/image";
import { InstagramIcon, TiktokIcon, WhatsappIcon } from "./Icons";

const SOCIALS = [
  { href: "https://www.instagram.com/real.broaster/", label: "Instagram @real.broaster", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/@realbroaster20", label: "TikTok @realbroaster20", Icon: TiktokIcon },
  { href: "https://wa.me/51923921581", label: "WhatsApp +51 923 921 581", Icon: WhatsappIcon },
];

export default function SiteFooter() {
  return (
    <footer className="rb-footer">
      <div className="rb-footer__grid">
        <div className="rb-footer__col">
          <Image className="rb-footer__logo" src="/assets/logo-mark.webp" alt="Real Broaster" width={1344} height={768} />
          <p className="rb-footer__script">Crocante recién salido de la olla</p>
        </div>

        <div className="rb-footer__col">
          <h3>Conócenos</h3>
          <div className="rb-footer__links">
            <a href="#menu">Nuestro menú</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#">Delivery y zonas</a>
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de privacidad</a>
          </div>
        </div>

        <div className="rb-footer__col">
          <h3>Redes sociales</h3>
          <div className="rb-socials">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={href} className="rb-social" href={href} target="_blank" rel="noopener" aria-label={label} title={label}>
                <Icon size={22} />
              </a>
            ))}
          </div>
          <a className="rb-libro" href="https://www.gob.pe/libro-de-reclamaciones" target="_blank" rel="noopener" aria-label="Libro de reclamaciones">
            <Image src="/assets/libro-reclamaciones.png" alt="Libro de reclamaciones" width={323} height={180} />
          </a>
        </div>

        <div className="rb-footer__col">
          <h3>Visítanos</h3>
          <div className="rb-footer__links">
            <a href="#nosotros">Av. Gral. Mendiburu 290, Miraflores — Lima</a>
            <a href="#nosotros">Lun–Sáb 5:30–11:30 pm · Dom cerrado</a>
          </div>
        </div>
      </div>

      <div className="rb-footer__legal">
        <span>
          © 2026 Real Broaster. Todos los derechos reservados. &nbsp;|&nbsp; Developed by{" "}
          <a className="rb-footer__credit" href="https://hectorsum.vercel.app/" target="_blank" rel="noopener">
            Hector
          </a>
        </span>
        <span>Hecho en Miraflores, Lima</span>
      </div>
    </footer>
  );
}
