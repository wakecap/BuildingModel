interface WidgetProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedPoint: any;
}

const Widget: React.FC<WidgetProps> = ({ selectedPoint }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        minWidth: "200px",
      }}
    >
      {selectedPoint ? (
        <div>
          <h3>Point Details</h3>
          <ul>
            <li>
              <b>Name:</b> {selectedPoint.name}
            </li>
            <li>
              <b>Age:</b> {selectedPoint.age}
            </li>
            <li>
              <b>Company:</b> {selectedPoint.company}
            </li>
            <li>
              <b>Job ID:</b> {selectedPoint.jobId}
            </li>
          </ul>
        </div>
      ) : (
        <p>Click on a point to see details</p>
      )}
    </div>
  );
};

export default Widget;
