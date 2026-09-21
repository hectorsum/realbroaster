# Real Broaster

Sitio de pedidos de Real Broaster (pollo broaster, Miraflores, Lima), hecho con Next.js 16 (App Router) y React 19.
Diseño exportado desde Claude Design: menú, armado de producto, carrito, checkout (retiro/delivery, Yape/Plin/efectivo) y envío del pedido por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

- `app/page.tsx` — página única; compone las secciones dentro de `StoreProvider`.
- `app/components/` — cabecera y banner, menú, constructor de producto, carrito, checkout, mapa (Leaflet), footer.
- `app/lib/menu.ts` — menú, banners, distritos y constantes del local (teléfono, WhatsApp de pedidos, costo de delivery).
- `app/globals.css` — tokens de diseño y estilos.
- `public/assets/` — logo, fotos del menú, QR de Yape.
- `legacy/instrument-panel/` — diseño anterior, fuera de las rutas.

## Deploy en Vercel

No requiere variables de entorno ni configuración extra (Next.js se detecta solo).

1. Sube el repo a GitHub/GitLab/Bitbucket e impórtalo en https://vercel.com/new, o
2. desde la terminal: `npx vercel` (preview) y `npx vercel --prod` (producción).
