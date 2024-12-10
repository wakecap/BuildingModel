interface StatisticsWidgetProps {
  totalWorkers: number;
  totalBuildings: number;
}

const StatisticsWidget: React.FC<StatisticsWidgetProps> = ({
  totalWorkers,
  totalBuildings,
}) => {
  return (
    <div className="absolute top-[200px] right-2 z-[1000] bg-white p-4 border border-black rounded-md min-w-[200px] text-center">
      <h4 className="font-bold text-lg mb-2">Statistics</h4>
      <p>
        <b>Workers:</b> {totalWorkers}
      </p>
      <p>
        <b>Buildings:</b> {totalBuildings}
      </p>
    </div>
  );
};

export default StatisticsWidget;
