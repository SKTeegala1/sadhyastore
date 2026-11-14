import AccountNav from "@/components/account/AccountNav";
import SearchBar from "@/components/search/SearchBar";
export default function HeaderActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="hidden shrink-0 items-center gap-3 xl:flex">
      <div className="w-44 min-w-0 2xl:w-56">
        <SearchBar onNavigate={onNavigate} />
      </div>
      <AccountNav onNavigate={onNavigate} />
    </div>
  );
}
