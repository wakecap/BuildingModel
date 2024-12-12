/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PointDetailsWidget from "./components/PointDetailsWidget";
import StatisticsWidget from "./components/StatisticsWidget";
import Controls from "./components/Controls";
import { addBuilding } from "./components/AddBuilding";
import { add3DPoints } from "./components/Add3DPoints";
import { addHeatmapLayer } from "./components/AddHeatmap";

function App() {
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(
    null
  );
  const [buildingGraphics, setBuildingGraphics] = useState<any[]>([]); // List of buildings
  const [pointsGraphics, setPointsGraphics] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalBuildings, setTotalBuildings] = useState(0);

  useEffect(() => {
    const viewDiv = document.getElementById("viewDiv") as HTMLDivElement;

    const webscene = new WebScene({
      basemap: "streets-night-vector",
      ground: { surfaceColor: "white" },
    });

    const view = new SceneView({
      container: viewDiv,
      map: webscene,
      center: [-117.33378013520932, 33.95723222749059],
      zoom: 18,
      popupEnabled: false,
      ui: {
        components: [],
      },
    });

    view.ui.remove("attribution");
    view.ui.remove("zoom");

    const graphicsLayerInstance = new GraphicsLayer();
    webscene.add(graphicsLayerInstance);
    setGraphicsLayer(graphicsLayerInstance);

    addHeatmapLayer(webscene);

    view.on("click", (event) => {
      view.hitTest(event).then((response) => {
        const results = response.results.filter(
          (result) => "graphic" in result
        ) as __esri.GraphicHit[];

        if (results.length > 0) {
          const graphic = results[0].graphic;
          if (graphic) {
            setSelectedPoint({
              name: graphic.getAttribute("name"),
              age: graphic.getAttribute("age"),
              company: graphic.getAttribute("company"),
              jobId: graphic.getAttribute("jobId"),
            });
          }
        } else {
          setSelectedPoint(null);
        }
      });
    });

    return () => {
      view.destroy();
    };
  }, []);

  const addSpecificBuilding = (option: string) => {
    if (!graphicsLayer) return;

    // eslint-disable-next-line prefer-const
    let newBuildings = [];
    const existingGraphics = [...buildingGraphics];

    if (
      option === "first" &&
      !existingGraphics.find((g) => g.attributes?.type === "school")
    ) {
      newBuildings.push(
        addBuilding(graphicsLayer, {
          longitude: -117.1956,
          latitude: 34.0561,
          model: "./models/concept__schoola_4.glb",
          height: 1000,
          attributes: { type: "school" },
        })
      );
    }

    if (
      option === "second" &&
      !existingGraphics.find((g) => g.attributes?.type === "home")
    ) {
      newBuildings.push(
        addBuilding(graphicsLayer, {
          longitude: -117.31986697325468,
          latitude: 33.94499309859469,
          model: "./models/cassa_pizza.glb",
          height: 800,
          attributes: { type: "home" },
        })
      );
    }

    if (option === "both") {
      if (!existingGraphics.find((g) => g.attributes?.type === "school")) {
        newBuildings.push(
          addBuilding(graphicsLayer, {
            longitude: -117.1956,
            latitude: 34.0561,
            model: "./models/concept__schoola_4.glb",
            height: 1000,
            attributes: { type: "school" },
          })
        );
      }
      if (!existingGraphics.find((g) => g.attributes?.type === "home")) {
        newBuildings.push(
          addBuilding(graphicsLayer, {
            longitude: -117.31986697325468,
            latitude: 33.94499309859469,
            model: "./models/cassa_pizza.glb",
            height: 800,
            attributes: { type: "home" },
          })
        );
      }
    }

    setBuildingGraphics((prev) => [...prev, ...newBuildings]);
    setTotalBuildings((prev) => prev + newBuildings.length);
  };

  const removeBuildings = () => {
    if (!graphicsLayer) return;

    buildingGraphics.forEach((graphic) => graphicsLayer.remove(graphic));
    setBuildingGraphics([]);
    setTotalBuildings(0);
  };

  const togglePoints = () => {
    if (!graphicsLayer) return;

    if (pointsGraphics.length > 0) {
      pointsGraphics.forEach((graphic) => graphicsLayer.remove(graphic));
      setPointsGraphics([]);
      setTotalWorkers(0);
    } else {
      const points = add3DPoints(graphicsLayer);
      setPointsGraphics(points);
      setTotalWorkers(points.length);
    }
  };

  return (
    <>
      <div id="viewDiv" style={{ height: "100vh", width: "100%" }} />
      <PointDetailsWidget selectedPoint={selectedPoint} />
      <StatisticsWidget
        totalWorkers={totalWorkers}
        totalBuildings={totalBuildings}
      />
      <Controls
        toggleBuilding={addSpecificBuilding}
        togglePoints={togglePoints}
        hasBuilding={buildingGraphics.length > 0}
        hasPoints={pointsGraphics.length > 0}
        removeBuildings={removeBuildings}
      />
    </>
  );
}

export default App;
