interface ControlsProps {
  toggleBuilding: () => void;
  togglePoints: () => void;
  hasBuilding: boolean;
  hasPoints: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  toggleBuilding,
  togglePoints,
  hasBuilding,
  hasPoints,
}) => {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <button
        onClick={toggleBuilding}
        className={`px-6 py-3 text-white font-semibold rounded-md ${
          hasBuilding
            ? "bg-red-600 hover:bg-red-700"
            : " bg-gray-700 hover:bg-gray-900"
        }`}
      >
        {hasBuilding ? "Delete Building" : "Add Building"}
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
    </div>
  );
};

export default Controls;
