import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export default function HeaderLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 bg-white flex items-center justify-center">
        <img
          src={logo}
          alt="Sadhya Snack Box"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <div className="font-display text-xl font-bold leading-none text-secondary">
          Sadhya
        </div>

        <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Snack Box
        </div>
      </div>
    </Link>
  );
}