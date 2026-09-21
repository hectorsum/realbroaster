import type { Metadata } from "next";
import { Anton, Kaushan_Script, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const kaushan = Kaushan_Script({ variable: "--font-kaushan", subsets: ["latin"], weight: "400" });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Real Broaster — Pollo broaster en Miraflores, Lima",
  description:
    "Pollo broaster hecho al momento, hamburguesas y salchipapas. Pide en el local o por WhatsApp al 923 921 581 para delivery en Miraflores.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${anton.variable} ${kaushan.variable} ${poppins.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
