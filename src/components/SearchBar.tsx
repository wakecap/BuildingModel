import { useState, useEffect, useRef } from "react";
import searchIcon from "../assets/search-interface-symbol.png";

interface Worker {
  name: string;
  jobId: string;
}

interface SearchBarProps {
  searchPoint: (query: string) => void;
  workers: Worker[];
}

const SearchBar: React.FC<SearchBarProps> = ({ searchPoint, workers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a valid search query.");
      return;
    }
    searchPoint(searchQuery);
    setSearchQuery("");
    setIsDropdownVisible(false);
  };

  const handleWorkerClick = (worker: Worker) => {
    setSearchQuery(worker.name);
    searchPoint(worker.name);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-4 left-1/2 -translate-x-1/2 p-2 rounded shadow-md flex flex-col items-center w-[400px] bg-white bg-opacity-20 "
    >
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Search Workers . . ."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          className="w-full px-2 py-1 rounded focus:outline-none bg-white bg-opacity-0 placeholder:text-black"
        />
        <button onClick={handleSearch} className="p-2">
          <img src={searchIcon} alt="Search" className="w-5 h-5" />
        </button>
      </div>
      {isDropdownVisible && (
        <ul className="mt-2 w-full max-h-40 overflow-y-auto bg-opacity-30 border rounded shadow-lg">
          {workers
            .filter(
              (worker) =>
                worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                worker.jobId.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((worker, index) => (
              <li
                key={index}
                onClick={() => handleWorkerClick(worker)}
                className="px-2 py-2 hover:bg-gray-600 cursor-pointer"
              >
                {worker.name} - {worker.jobId}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
