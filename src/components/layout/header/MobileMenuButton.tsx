import { Menu } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function MobileMenuButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="xl:hidden">
      <Menu className="w-7 h-7" />
    </button>
  );
}
