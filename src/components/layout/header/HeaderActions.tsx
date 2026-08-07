import SearchBar from "@/components/search/SearchBar";
import ShopNowButton from "./ShopNowButton";
type Props = {
    onNavigate?: () => void;
};

export default function HeaderActions({
    onNavigate,
}: Props) {
  return (
    <div className="hidden md:flex items-center gap-4">
      <SearchBar onNavigate={onNavigate} />
      <ShopNowButton className="hidden md:inline-flex" />
    </div>
  );
}