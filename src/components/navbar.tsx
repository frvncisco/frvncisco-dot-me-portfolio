import { NavPill } from "@/components/nav-pill";
import { DATA } from "@/data/resume";
import { FEATURE_FLAGS } from "@/lib/flags";

// Server component: FEATURE_* aren't NEXT_PUBLIC_, so a client file would always read them as
// off. The client part only gets the links that survived the flags.
export default function Navbar() {
  const links = DATA.navbar
    .filter((item) => item.flag === null || FEATURE_FLAGS[item.flag])
    .map(({ href, label }) => ({ href, label }));

  return <NavPill links={links} />;
}
