import { useEffect, useState } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const useSceneView = () => {
  const [view, setView] = useState<SceneView | null>(null);
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(
    null
  );

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
    });

    const graphicsLayerInstance = new GraphicsLayer();
    webscene.add(graphicsLayerInstance);

    setView(sceneView);
    setGraphicsLayer(graphicsLayerInstance);

    return () => {
      sceneView.destroy();
    };
  }, []);

  return { view, graphicsLayer };
};

export default useSceneView;
