import type { Metadata } from "next";
import { PropositoView } from "./proposito-view";

export const metadata: Metadata = {
  title: "Propósito no Senhor | 30 Dias em Oração e Aliança",
  description:
    "Um tempo sagrado de consagração, oração e busca individual em prol do nosso relacionamento e das nossas vidas espirituais diante de Cristo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PropositoPage() {
  return <PropositoView />;
}
