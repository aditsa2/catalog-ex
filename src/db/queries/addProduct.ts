export default (
  id: string,
  name: string,
  description: string,
  bounding_polygon: string,
  consumtion_link: string,
  type: string,
  consumption_protocol: string,
  resolution_best: string,
  min_zoom: string,
  max_zoom: string
): string => {
  return `
    INSERT INTO catalog(id, name,description,bounding_polygon,consumtion_link,type,consumption_protocol,resolution_best,min_zoom,max_zoom)
    VALUES ('${id}','${name}','${description}','${bounding_polygon}','${consumtion_link}','${type}','${consumption_protocol}','${resolution_best}','${min_zoom}','${max_zoom}')
    `;
};
