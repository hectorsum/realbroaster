export type GroupKey = "ensalada" | "papas" | "comp" | "cremas" | "extras" | "bebida";

export interface Group {
  title: string;
  sub: string;
  max: number;
  req: boolean;
  all?: boolean;
  opts: [name: string, price: number][];
}

export interface MenuItem {
  n: string;
  d: string;
  p: number;
  was?: number;
  img: string;
  steps: GroupKey[];
}

export interface Category {
  id: string;
  label: string;
  tag: string;
  items: MenuItem[];
}

export interface Banner {
  kicker: string;
  titulo: string;
  bullets: string[];
  precio: string;
  cent: string;
  antes: string;
  img: string;
  tone: "red" | "yellow";
  target: string;
}

export const GROUPS: Record<GroupKey, Group> = {
  ensalada: { title: "Ensalada", sub: "Elige una", max: 1, req: true,
    opts: [["Con ensalada", 0], ["Sin ensalada", 0]] },
  papas: { title: "Tus papas", sub: "Elige una", max: 1, req: true,
    opts: [["Papas fritas", 0], ["Papas al hilo", 0]] },
  comp: { title: "Tu complemento", sub: "Elige uno", max: 1, req: true,
    opts: [["Papas", 0], ["Arroz", 0], ["Ensalada", 0]] },
  cremas: { title: "Cremas", sub: "Las que quieras", max: 7, req: false, all: true,
    opts: [["Mayonesa", 0], ["Ketchup", 0], ["Mostaza", 0], ["Golf", 0], ["Aceituna", 0], ["Tártara", 0], ["Ají", 0]] },
  extras: { title: "Tus extras", sub: "Opcional", max: 13, req: false,
    opts: [["Queso", 2], ["Jamón", 2], ["Huevo", 2], ["Tocino", 5], ["Hot dog", 6], ["Chorizo", 8],
      ["Porción de arroz", 5], ["Crema extra", 1], ["Alita", 8], ["Pierna", 10], ["Encuentro", 11], ["Pecho", 14]] },
  bebida: { title: "Bebida", sub: "Opcional", max: 10, req: false,
    opts: [["Inka Kola", 5], ["Coca Cola", 5], ["Sprite", 4], ["Concordia Piña", 4], ["Concordia Piña 300 ml", 3],
      ["Agua", 3], ["Fanta Naranja", 4], ["Coca Cola 1.5 L", 12], ["Inka Kola 1.5 L", 12], ["Maracuyá 1 L", 10]] },
};

const PLATO: GroupKey[] = ["papas", "cremas", "extras", "bebida"];
const SANGUCHE: GroupKey[] = ["ensalada", "papas", "cremas", "extras", "bebida"];
const SOLO_CREMAS: GroupKey[] = ["cremas", "extras", "bebida"];

const m = (file: string) => `/assets/menu/${file}.jpeg`;

export const CATS: Category[] = [
  { id: "ejecutivo", label: "Menú Ejecutivo", tag: "Presa, arroz, papas y ensalada", items: [
    { n: "Ejecutivo Alita", d: "Alita broaster sobre arroz, papas doradas y ensalada fresca", p: 12, img: m("ejecutivo-alita"), steps: PLATO },
    { n: "Ejecutivo Doble Alita", d: "Dos alitas broaster con arroz, papas y ensalada de la casa", p: 16, img: m("ejecutivo-doble-alita"), steps: PLATO },
    { n: "Ejecutivo Pierna", d: "Pierna broaster jugosa con arroz, papas y ensalada", p: 14, img: m("ejecutivo-pierna"), steps: PLATO },
    { n: "Ejecutivo Doble Pierna", d: "Dos piernas broaster, arroz, papas y ensalada. Para el hambre real", p: 20, img: m("ejecutivo-doble-pierna"), steps: PLATO },
    { n: "Ejecutivo Encuentro", d: "Encuentro broaster con arroz, papas y ensalada fresca", p: 15, img: m("ejecutivo-encuentro"), steps: PLATO },
    { n: "Ejecutivo Pecho", d: "Pecho broaster grande con arroz, papas y ensalada", p: 17, img: m("ejecutivo-pecho"), steps: PLATO },
  ]},
  { id: "broaster", label: "Pollo Broaster", tag: "Recién frito por tanda", items: [
    { n: "Real Broaster", d: "Nuestro clásico: presas broaster crocantes con papas y ensalada", p: 22, img: m("real-broaster"), steps: PLATO },
    { n: "1/4 Broaster Pierna", d: "Un cuarto de pollo lado pierna con papas, arroz y ensalada", p: 19, img: m("broaster-cuarto-pierna"), steps: PLATO },
    { n: "1/4 Broaster Pecho", d: "Un cuarto de pollo lado pecho con papas, arroz y ensalada", p: 21, img: m("broaster-cuarto-pecho"), steps: PLATO },
    { n: "Filete de pollo", d: "Filete de pollo apanado, dorado y crocante, con papas y ensalada", p: 18, img: m("filete-de-pollo"), steps: PLATO },
  ]},
  { id: "hamburguesas", label: "Hamburguesas", tag: "Pan fresco y plancha caliente", items: [
    { n: "Hamburguesa Clásica", d: "Carne a la plancha, lechuga, tomate y nuestras cremas", p: 12, img: m("hamburguesa-clasica"), steps: SANGUCHE },
    { n: "Cheeseburguer", d: "Doble carne, doble queso cheddar, pepinillos y salsa de la casa", p: 18, img: m("cheeseburguer"), steps: SANGUCHE },
    { n: "Hamburguesa Royal", d: "Carne, queso, huevo frito, lechuga y tomate en pan de sésamo", p: 16, img: m("hamburguesa-royal"), steps: SANGUCHE },
    { n: "Salchiburguer", d: "Hamburguesa coronada con hot dog, queso y huevo. Doble antojo", p: 17, img: m("salchiburguer"), steps: SANGUCHE },
    { n: "Choripán", d: "Chorizo parrillero en pan, con lechuga y tomate", p: 13, img: m("choripan"), steps: SANGUCHE },
    { n: "Hamburguesa al plato", d: "Hamburguesa clásica servida con porción de papas fritas", p: 16, img: m("hamburguesa-al-plato"), steps: SANGUCHE },
  ]},
  { id: "salchis", label: "Salchis", tag: "Papas cortadas el mismo día", items: [
    { n: "Salchipapa", d: "Papas fritas con salchicha dorada y las cremas que elijas", p: 12, img: m("salchipapa"), steps: SANGUCHE },
    { n: "Choripapa", d: "Papas fritas con chorizo parrillero en rodajas", p: 15, img: m("choripapa"), steps: SANGUCHE },
    { n: "Salchinuggets", d: "Papas, salchicha y nuggets crocantes con ensalada al lado", p: 16, img: m("salchinuggets"), steps: SANGUCHE },
    { n: "Salchipapa a lo pobre", d: "Papas, salchicha, jamón, queso y huevo frito encima", p: 18, img: m("salchipapa-a-lo-pobre"), steps: SANGUCHE },
    { n: "Salchipapa tocino y queso", d: "Papas con salchicha, tocino crocante y queso fundido", p: 19, img: m("salchipapa-tocino-queso"), steps: SANGUCHE },
  ]},
  { id: "especiales", label: "Especiales", tag: "Los que no están en todas partes", items: [
    { n: "Brutality", d: "Hamburguesa, salchipapa, presa broaster y cremas. El reto de la casa", p: 32, img: m("brutality"), steps: SANGUCHE },
    { n: "El Fit-lete", d: "Filete de pollo a la plancha con ensalada fresca. Ligero y con sabor", p: 19, img: m("el-fit-lete"), steps: SOLO_CREMAS },
  ]},
  { id: "promos", label: "Promos", tag: "Precio de esta semana", items: [
    { n: "Promo Real Broaster", d: "Real Broaster + gaseosa 500 ml. Solo esta semana", p: 25, was: 27, img: m("real-broaster"), steps: PLATO },
    { n: "Promo Cheeseburguer", d: "Cheeseburguer + papas + gaseosa 500 ml", p: 24, was: 28, img: m("cheeseburguer"), steps: SANGUCHE },
    { n: "Promo Salchipapa", d: "Salchipapa para compartir + gaseosa 1.5 L", p: 22, was: 26, img: m("salchipapa"), steps: SANGUCHE },
  ]},
  { id: "extras", label: "Extras", tag: "Para acompañar o sumar a tu plato", items: [
    { n: "Porción de papas", d: "Papas fritas recién hechas, doradas por fuera", p: 8, img: m("papas-fritas"), steps: [] },
    { n: "Porción de arroz", d: "Arroz graneado de la casa", p: 5, img: m("porcion-arroz"), steps: [] },
    { n: "Queso", d: "Láminas de queso para sumar a tu pedido", p: 2, img: m("queso"), steps: [] },
    { n: "Jamón", d: "Jamón inglés en láminas", p: 2, img: m("jamon"), steps: [] },
    { n: "Huevo frito", d: "Huevo frito con la yema justa", p: 2, img: m("huevo"), steps: [] },
    { n: "Tocino", d: "Tocino crocante recién salteado", p: 5, img: m("tocino"), steps: [] },
    { n: "Hot dog", d: "Salchicha dorada a la plancha", p: 6, img: m("hotdog"), steps: [] },
    { n: "Chorizo", d: "Chorizo parrillero, ahumado y jugoso", p: 8, img: m("chorizo"), steps: [] },
  ]},
  { id: "bebidas", label: "Bebidas", tag: "Bien heladas", items: [
    { n: "Inka Kola 500 ml", d: "La de siempre, bien helada", p: 5, img: m("inkakola-500"), steps: [] },
    { n: "Coca Cola 500 ml", d: "Sabor original en botella personal", p: 5, img: m("cocacola-500"), steps: [] },
    { n: "Sprite 500 ml", d: "Lima-limón, refrescante", p: 4, img: m("sprite-500"), steps: [] },
    { n: "Concordia Piña 500 ml", d: "Gaseosa de piña, dulce y clásica", p: 4, img: m("concordia-500"), steps: [] },
    { n: "Concordia Piña 300 ml", d: "Formato chico para acompañar tu plato", p: 3, img: m("concordia-300"), steps: [] },
    { n: "Fanta Naranja 500 ml", d: "Naranja bien fría", p: 4, img: m("fanta-500"), steps: [] },
    { n: "Agua San Mateo 500 ml", d: "Agua mineral de manantial", p: 3, img: m("agua-sanmateo"), steps: [] },
    { n: "Inka Kola 1.5 L", d: "Tamaño familiar para la mesa", p: 12, img: m("inkakola-15"), steps: [] },
    { n: "Coca Cola 1.5 L", d: "Tamaño familiar para compartir", p: 12, img: m("cocacola-15"), steps: [] },
    { n: "Maracuyá 1 L", d: "Refresco de maracuyá hecho en casa", p: 10, img: m("maracuya-1lt"), steps: [] },
  ]},
  { id: "infusiones", label: "Infusiones", tag: "Para cerrar la noche", items: [
    { n: "Té", d: "Taza caliente, con limón si lo pides", p: 3, img: m("te"), steps: [] },
    { n: "Anís", d: "Infusión de anís estrella, digestiva", p: 3, img: m("anis"), steps: [] },
    { n: "Manzanilla", d: "Suave y aromática, recién pasada", p: 3, img: m("manzanilla"), steps: [] },
  ]},
];

export const BANNERS: Banner[] = [
  { kicker: "Combo", titulo: "Real Broaster", bullets: ["Presas broaster crocantes", "Papas + ensalada fresca", "Gaseosa 500 ml"], precio: "25", cent: ".00", antes: "S/27.00", img: m("real-broaster"), tone: "red", target: "cat-promos" },
  { kicker: "Solo hoy", titulo: "Cheeseburguer", bullets: ["Doble carne y doble queso", "Porción de papas", "Gaseosa 500 ml"], precio: "24", cent: ".00", antes: "S/28.00", img: m("cheeseburguer"), tone: "yellow", target: "cat-promos" },
  { kicker: "Para compartir", titulo: "Salchipapa XL", bullets: ["Papas cortadas el mismo día", "Doble salchicha + cremas", "Gaseosa 1.5 L"], precio: "22", cent: ".00", antes: "S/26.00", img: m("salchipapa"), tone: "red", target: "cat-promos" },
];

export const DISTRICTS: Record<string, [number, number]> = {
  Miraflores: [-12.1211, -77.03],
  "San Isidro": [-12.0972, -77.0365],
  Surquillo: [-12.1114, -77.0141],
  Barranco: [-12.1464, -77.0206],
  "San Borja": [-12.1083, -76.9987],
};

export const STORE = {
  coords: [-12.10935, -77.04835] as [number, number],
  address: "Av. Gral. Mendiburu 290, Miraflores",
  phoneDisplay: "923 921 581",
  phoneHref: "tel:+51923921581",
  // Number that receives the finished order via WhatsApp.
  orderWhatsapp: "51923921581",
  deliveryFee: 5,
};

export const money = (v: number) => `S/${v.toFixed(2)}`;
