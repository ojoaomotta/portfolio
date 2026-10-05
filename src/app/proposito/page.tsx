import type { Metadata } from "next";
import { PropositoView } from "./proposito-view";

export const metadata: Metadata = {
  title: "Propósito no Senhor | Aliança & Oração",
  description:
    "Um tempo sagrado de consagração e oração em prol do nosso relacionamento e das nossas vidas espirituais diante de Cristo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PropositoPage() {
  return <PropositoView />;
}
