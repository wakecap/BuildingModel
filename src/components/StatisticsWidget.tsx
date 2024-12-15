interface StatisticsWidgetProps {
  totalWorkers: number;
  totalBuildings: number;
}

const StatisticsWidget: React.FC<StatisticsWidgetProps> = ({
  totalWorkers,
  totalBuildings,
}) => {
  return (
    <div className="absolute top-[240px] right-4 z-[1000] bg-gray-800 text-white p-6 border border-blue-400 rounded-xl shadow-xl w-[230px] text-center">
      <h4 className="font-semibold text-xl text-gray-950 mb-4">Statistics</h4>
      <div className="space-y-3">
        <p className="text-lg">
          <span className="font-medium text-gray-300">Workers:</span>{" "}
          <span className="font-bold text-green-400">{totalWorkers}</span>
        </p>
        <p className="text-lg">
          <span className="font-medium text-gray-300">Buildings:</span>{" "}
          <span className="font-bold text-green-400">{totalBuildings}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsWidget;
