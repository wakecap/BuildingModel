import { useState } from "react";
import SidebarImg from "../assets/menu.png";
import remove from "../assets/trash.png";
import removepoint from "../assets/delete.png";
import build from "../assets/old-building.png";
import buint from "../assets/track.png";
import searchIcon from "../assets/search-interface-symbol.png";

interface SidebarProps {
  toggleBuilding: (option: string) => void;
  togglePoints: () => void;
  removeBuildings: () => void;
  searchPoint: (query: string) => void;
  hasPoints: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleBuilding,
  togglePoints,
  removeBuildings,
  searchPoint,
  hasPoints,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBuildingOptions, setShowBuildingOptions] = useState(false);
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
    <div className="absolute top-0 left-0 h-full bg-gray-800 text-white flex flex-col items-center shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 p-2 w-[50px]"
      >
        <span>
          <img src={SidebarImg} alt="Menu" />
        </span>
      </button>

      {isExpanded && (
        <div className="mt-8 flex flex-col gap-4 w-[200px]">
          {/* Remove Buildings Button */}
          <button
            onClick={removeBuildings}
            className="ml-5 py-2 text-sm font-semibold rounded w-[150px]"
          >
            <img src={remove} alt="Remove Buildings" className="h-8 w-8" />
          </button>

          {/* Add Buildings Button */}
          <button
            onClick={() => setShowBuildingOptions(!showBuildingOptions)}
            className="ml-5 py-2 text-sm font-semibold rounded w-[150px]"
          >
            <img src={build} alt="Add Buildings" className="w-8 h-8" />
          </button>

          {showBuildingOptions && (
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => toggleBuilding("first")}
                className="ml-5 py-2 text-sm font-semibold rounded hover:bg-gray-600 w-[150px]"
              >
                Add School
              </button>
              <button
                onClick={() => toggleBuilding("second")}
                className="ml-5 py-2 text-sm font-semibold rounded hover:bg-gray-600 w-[150px]"
              >
                Add Home
              </button>
              <button
                onClick={() => toggleBuilding("both")}
                className="ml-5 py-2 text-sm font-semibold rounded hover:bg-gray-600 w-[150px]"
              >
                Add All Buildings
              </button>
            </div>
          )}

          {/* Toggle Points Button */}
          <button
            onClick={togglePoints}
            className={`ml-5 py-2 text-sm font-semibold rounded w-[150px]`}
          >
            {hasPoints ? (
              <img src={removepoint} alt="Delete Points" className="h-8 w-8" />
            ) : (
              <img src={buint} alt="Add Points" className="h-8 w-8" />
            )}
          </button>

          <div className="mt-4 ml-5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by Name/ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[120px] px-2 py-1 text-gray-800 rounded focus:outline-none"
              />
              <button onClick={handleSearch} className="p-2 ">
                <img src={searchIcon} alt="Search" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
