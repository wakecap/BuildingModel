/* eslint-disable @typescript-eslint/no-explicit-any */
import helmet from "../assets/hard-hat.png";

interface PointDetailsWidgetProps {
  selectedPoint: any;
}

const PointDetailsWidget: React.FC<PointDetailsWidgetProps> = ({
  selectedPoint,
}) => {
  return selectedPoint ? (
    <div className="bg-gray-800 absolute top-4 right-4 p-6 border border-blue-400 rounded-xl shadow-xl w-[230px]">
      <div>
        <h3 className="font-semibold text-lg text-gray-950 mb-4">
          Point Details
        </h3>
        <ul className="space-y-2">
          <li>
            <span className="font-medium text-gray-500">Name:</span>{" "}
            <span className="text-red-300">{selectedPoint.name}</span>
          </li>
          <li>
            <span className="font-medium text-gray-500">Age:</span>{" "}
            <span className="text-red-300">{selectedPoint.age}</span>
          </li>
          <li>
            <span className="font-medium text-gray-500">Company:</span>{" "}
            <span className="text-red-300">{selectedPoint.company}</span>
          </li>
          <li>
            <span className="font-medium text-gray-500">Job ID:</span>{" "}
            <span className="text-red-300">{selectedPoint.jobId}</span>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="absolute top-4 right-4 flex items-center justify-center">
      <img src={helmet} alt="Hard Hat" className="h-24 w-24" />
    </div>
  );
};

export default PointDetailsWidget;
