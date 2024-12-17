import { useState } from "react";
import searchIcon from "../assets/search-interface-symbol.png";

interface SearchBarProps {
  searchPoint: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchPoint }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a valid search query.");
      return;
    }
    searchPoint(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 p-2 rounded shadow-md flex items-center gap-2 w-[300px]">
      <input
        type="text"
        placeholder="Search by Name Or ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-2 py-1   rounded focus:outline-none bg-white bg-opacity-10 "
      />
      <button onClick={handleSearch} className="p-2">
        <img src={searchIcon} alt="Search" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
