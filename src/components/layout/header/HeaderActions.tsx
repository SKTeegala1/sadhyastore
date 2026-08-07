import SearchBar from "@/components/search/SearchBar";
import ShopNowButton from "./ShopNowButton";

export default function HeaderActions() {
  return (
    <div className="hidden md:flex items-center gap-4">
      <SearchBar />
      <ShopNowButton className="hidden md:inline-flex" />
    </div>
  );
}