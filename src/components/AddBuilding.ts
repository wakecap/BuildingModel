import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";

interface BuildingOptions {
  longitude: number;
  latitude: number;
  model: string;
  height: number;
}

export const addBuilding = (
  graphicsLayer: GraphicsLayer,
  options: BuildingOptions
): Graphic => {
  const pointGeometry = new Point({
    longitude: options.longitude,
    latitude: options.latitude,
    z: -5, // Building height
  });

  const buildingSymbol = new PointSymbol3D({
    symbolLayers: [
      {
        type: "object",
        resource: {
          href: options.model,
        },
        height: options.height,
      },
    ],
  });

  const buildingGraphic = new Graphic({
    geometry: pointGeometry,
    symbol: buildingSymbol,
  });

  graphicsLayer.add(buildingGraphic);
  return buildingGraphic;
};
