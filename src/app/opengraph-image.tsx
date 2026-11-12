import { DATA } from "@/data/resume";
import { renderOg } from "@/lib/og";

export const alt = DATA.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: DATA.name, description: DATA.description });
}
