import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";

export const addBuilding = (graphicsLayer: GraphicsLayer): Graphic => {
  const pointGeometry = new Point({
    longitude: -117.1956,
    latitude: 34.0561,
    z: 10, // Building height
  });

  const isLocal = window.location.hostname === "localhost";
  const buildingSymbol = new PointSymbol3D({
    symbolLayers: [
      {
        type: "object",
        resource: {
          href: isLocal
            ? "./models/concept__schoola_4.glb"
            : "/BuildingModel/models/concept__schoola_4.glb",
        },
        height: 1000,
      },
    ],
  });

  const buildingGraphic = new Graphic({
    geometry: pointGeometry,
    symbol: buildingSymbol,
    elevationInfo: {
      mode: "relative-to-ground",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  graphicsLayer.add(buildingGraphic);
  return buildingGraphic;
};
