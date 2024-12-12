import { useState } from "react";

interface ControlsProps {
  toggleBuilding: (option: string) => void;
  togglePoints: () => void;
  hasBuilding: boolean;
  hasPoints: boolean;
  removeBuildings: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  toggleBuilding,
  togglePoints,
  hasBuilding,
  hasPoints,
  removeBuildings,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <button
        onClick={removeBuildings}
        className="bg-red-600 px-6 py-3 text-white font-semibold rounded-md hover:bg-red-700"
      >
        Remove Buildings
      </button>
      <button
        onClick={togglePoints}
        className={`px-6 py-3 text-white font-semibold rounded-md ${
          hasPoints
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-700 hover:bg-gray-900"
        }`}
      >
        {hasPoints ? "Delete Points" : "Add Points"}
      </button>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-gray-700 px-10 py-3 text-white font-semibold rounded-md hover:bg-gray-900"
        >
          {hasBuilding ? "Manage Building" : "Add Building"}
        </button>
        {showDropdown && (
          <div className="absolute mt-2 bg-gray-700 text-white rounded-lg shadow-lg">
            <button
              onClick={() => toggleBuilding("first")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Add School
            </button>
            <button
              onClick={() => toggleBuilding("second")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Add Home
            </button>
            <button
              onClick={() => toggleBuilding("both")}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Add all Buildings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
