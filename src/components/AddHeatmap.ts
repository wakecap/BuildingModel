import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import heatmapData from "../data/heatmap.json";
export const addHeatmapLayer = (webscene: __esri.WebScene) => {
  const points = heatmapData.heatmapPoints.map((point) => {
    return new Graphic({
      geometry: new Point({
        longitude: point.longitude,
        latitude: point.latitude,
        z: point.z,
      }),
      attributes: { value: point.value },
    });
  });

  const heatmapRenderer = new HeatmapRenderer({
    field: "value",
    colorStops: [
      { ratio: 0, color: "rgba(0, 255, 0, 0)" },
      { ratio: 0.5, color: "rgba(255, 255, 0, 0.8)" },
      { ratio: 1, color: "rgba(255, 0, 0, 1)" },
    ],
    radius: 40,
    maxDensity: 0.1,
  });

  const heatmapLayer = new FeatureLayer({
    source: points,
    fields: [{ name: "value", type: "integer" }],
    objectIdField: "ObjectID",
    renderer: heatmapRenderer,
    elevationInfo: {
      mode: "relative-to-ground",
    },
  });

  webscene.add(heatmapLayer);
};
