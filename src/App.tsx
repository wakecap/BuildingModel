import { useEffect, useState } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import { addBuilding } from "./components/AddBuilding";
import { add3DPoints } from "./components/Add3DPoints";
import { addHeatmapLayer } from "./components/AddHeatmap";

function App() {
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(
    null
  );
  const [buildingGraphic, setBuildingGraphic] = useState<Graphic | null>(null);
  const [pointsGraphics, setPointsGraphics] = useState<Graphic[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPoint, setSelectedPoint] = useState<any>(null); // State to store selected point info

  useEffect(() => {
    const viewDiv = document.getElementById("viewDiv") as HTMLDivElement;

    const webscene = new WebScene({
      basemap: "streets-night-vector",
      ground: { surfaceColor: "white" }, // Hide terrain
    });

    const view = new SceneView({
      container: viewDiv,
      map: webscene,
      center: [-117.33378013520932, 33.95723222749059],
      zoom: 18,
      popupEnabled: false, // Completely disable all popups
      ui: {
        components: ["zoom"], // Show only zoom controls
      },
    });

    // Remove attribution and move zoom controls
    view.ui.remove("attribution"); // Remove the attribution widget
    view.ui.move("zoom", "top-right"); // Move zoom controls to top-right

    const graphicsLayerInstance = new GraphicsLayer();
    webscene.add(graphicsLayerInstance);
    setGraphicsLayer(graphicsLayerInstance);
    addHeatmapLayer(webscene);

    // Add click event to update Widget content
    view.on("click", (event) => {
      view.hitTest(event).then((response) => {
        const results = response.results.filter(
          (result) => "graphic" in result
        ) as __esri.GraphicHit[];

        if (results.length > 0) {
          const graphic = results[0].graphic;
          if (graphic) {
            // Set selected point details
            setSelectedPoint({
              name: graphic.getAttribute("name"),
              age: graphic.getAttribute("age"),
              company: graphic.getAttribute("company"),
              jobId: graphic.getAttribute("jobId"),
            });
          }
        } else {
          // Clear the widget if no point is selected
          setSelectedPoint(null);
        }
      });
    });

    return () => {
      view.destroy();
    };
  }, []);

  const toggleBuilding = () => {
    if (!graphicsLayer) return;

    if (buildingGraphic) {
      graphicsLayer.remove(buildingGraphic);
      setBuildingGraphic(null);
    } else {
      const building = addBuilding(graphicsLayer);
      setBuildingGraphic(building);
    }
  };
  const togglePoints = () => {
    if (!graphicsLayer) return;

    if (pointsGraphics && pointsGraphics.length > 0) {
      pointsGraphics.forEach((point) => graphicsLayer.remove(point));
      setPointsGraphics(null);
    } else {
      const points = add3DPoints(graphicsLayer);
      setPointsGraphics(points);
    }
  };

  return (
    <>
      <div id="viewDiv" style={{ height: "100vh", width: "100%" }} />

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
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={toggleBuilding}
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {buildingGraphic ? "Delete building" : "add building"}
        </button>
        <button
          onClick={togglePoints}
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {pointsGraphics ? "Delete points" : "Add points"}
        </button>
      </div>
    </>
  );
}

export default App;
