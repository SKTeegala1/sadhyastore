import AccountNav from "@/components/account/AccountNav";
import SearchBar from "@/components/search/SearchBar";
import ShopNowButton from "./ShopNowButton";
type Props = {
  onNavigate?: () => void;
};

export default function HeaderActions({ onNavigate }: Props) {
  return (
    <div className="hidden xl:flex items-center gap-3">
      <SearchBar onNavigate={onNavigate} />
      <AccountNav onNavigate={onNavigate} />
      <ShopNowButton className="hidden md:inline-flex" />
    </div>
  );
}
