import { STORE } from "@/app/lib/menu";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./Icons";
import LeafletMap from "./LeafletMap";

const POPUP = { title: "Real Broaster", address: STORE.address };
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.address + ", Lima")}`;

export default function AboutSection() {
  return (
    <section id="nosotros" className="rb-about">
      <div className="rb-about__grid">
        <div className="rb-about__col">
          <span className="rb-tag">Nosotros</span>
          <h2>
            Pollo broaster
            <br />
            hecho al momento
          </h2>
          <p className="rb-about__script">Crocante recién salido de la olla</p>
          <p className="rb-about__text">
            Somos un local de barrio en Miraflores. Freímos por tanda, nunca antes del pedido: masa crocante, pollo jugoso y papas
            recién cortadas. Pide en el local o por WhatsApp para delivery.
          </p>

          <div className="rb-facts">
            <div className="rb-fact">
              <PinIcon size={20} />
              <div>
                <strong>Av. Gral. Mendiburu 290</strong>
                <br />
                <span>Miraflores — Lima</span>
              </div>
            </div>
            <div className="rb-fact">
              <ClockIcon size={20} />
              <div>
                <strong>Lun–Sáb 5:30–11:30 pm</strong>
                <br />
                <span>Miércoles desde 4:30 pm · Domingo cerrado</span>
              </div>
            </div>
            <div className="rb-fact">
              <PhoneIcon size={20} />
              <div>
                <strong>WhatsApp +51 {STORE.phoneDisplay}</strong>
                <br />
                <span>Pedidos y delivery</span>
              </div>
            </div>
          </div>

          <a className="rb-btn rb-btn--cta rb-btn--yellow rb-about__cta" href={DIRECTIONS} target="_blank" rel="noopener">
            Cómo llegar
            <ArrowIcon size={16} strokeWidth={2.8} />
          </a>
        </div>

        <div className="rb-about__col">
          <div className="rb-mapcard">
            <LeafletMap className="rb-map" variant="store" coords={STORE.coords} popup={POPUP} />
            <div className="rb-mapcard__foot">
              <div className="rb-mapcard__name">
                Real Broaster
                <br />
                <span>{STORE.address}</span>
              </div>
              <span className="rb-mapcard__open">Abierto hoy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
