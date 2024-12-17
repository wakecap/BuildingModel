import helmet from "../assets/hard-hat.png";

interface Point {
  name: string;
  age: number;
  company: string;
  jobId: string;
}

interface PointDetailsWidgetProps {
  selectedPoint: Point | null;
}

const PointDetails: React.FC<{ point: Point }> = ({ point }) => (
  <div className="bg-gray-800 absolute top-4 right-4 p-6 border border-blue-400 rounded-xl shadow-xl w-[230px]">
    <h2 className="font-semibold text-lg text-gray-100 mb-4">Point Details</h2>
    <ul className="space-y-2">
      <li>
        <span className="font-medium text-gray-400">Name:</span>{" "}
        <span className="text-red-300">{point.name}</span>
      </li>
      <li>
        l<span className="font-medium text-gray-400">Age:</span>{" "}
        <span className="text-red-300">{point.age}</span>
      </li>
      <li>
        <span className="font-medium text-gray-400">Company:</span>{" "}
        <span className="text-red-300">{point.company}</span>
      </li>
      <li>
        <span className="font-medium text-gray-400">Job ID:</span>{" "}
        <span className="text-red-300">{point.jobId}</span>
      </li>
    </ul>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="absolute top-4 right-4 flex items-center justify-center">
    <img src={helmet} alt="Hard Hat" className="h-24 w-24" />
  </div>
);

const PointDetailsWidget: React.FC<PointDetailsWidgetProps> = ({
  selectedPoint,
}) => {
  return selectedPoint ? (
    <PointDetails point={selectedPoint} />
  ) : (
    <EmptyState />
  );
};

export default PointDetailsWidget;
