/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import PointDetailsWidget from "./components/PointDetailsWidget";
import StatisticsWidget from "./components/StatisticsWidget";
import Sidebar from "./components/Sidebar";
import { addBuilding } from "./components/AddBuilding";
import { add3DPoints } from "./components/Add3DPoints";
import { addHeatmapLayer } from "./components/AddHeatmap";
import SearchBar from "./components/SearchBar";

function App() {
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(
    null
  );
  const [buildingGraphics, setBuildingGraphics] = useState<any[]>([]); // List of buildings
  const [pointsGraphics, setPointsGraphics] = useState<any[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalBuildings, setTotalBuildings] = useState(0);
  const [view, setView] = useState<__esri.SceneView | null>(null);

  useEffect(() => {
    const viewDiv = document.getElementById("viewDiv") as HTMLDivElement;

    const webscene = new WebScene({
      basemap: "streets-night-vector",
      ground: { surfaceColor: "white" },
    });

    const sceneView = new SceneView({
      container: viewDiv,
      map: webscene,
      center: [-117.33378013520932, 33.95723222749059],
      zoom: 18,
      popupEnabled: false,
      ui: {
        components: [],
      },
    });

    sceneView.ui.remove("attribution");
    sceneView.ui.remove("zoom");

    const graphicsLayerInstance = new GraphicsLayer();
    webscene.add(graphicsLayerInstance);
    setGraphicsLayer(graphicsLayerInstance);
    setView(sceneView);

    addHeatmapLayer(webscene);

    sceneView.on("click", (event) => {
      sceneView.hitTest(event).then((response) => {
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
      sceneView.destroy();
    };
  }, []);

  const searchPoint = (query: string) => {
    if (!view || pointsGraphics.length === 0) return;

    const foundPoint = pointsGraphics.find(
      (graphic) =>
        graphic.attributes?.name?.toLowerCase() === query.toLowerCase() ||
        graphic.attributes?.jobId?.toString() === query
    );

    if (foundPoint) {
      view.goTo({ target: foundPoint.geometry, zoom: 20 });
      setSelectedPoint(foundPoint.attributes);
    } else {
      alert("Point not found!");
    }
  };

  const addSpecificBuilding = (option: string) => {
    if (!graphicsLayer) return;

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
      <Sidebar
        toggleBuilding={addSpecificBuilding}
        togglePoints={togglePoints}
        removeBuildings={removeBuildings}
        hasPoints={pointsGraphics.length > 0}
      />
      <SearchBar searchPoint={searchPoint} />
    </>
  );
}

export default App;
