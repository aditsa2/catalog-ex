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
  let query = `
    UPDATE catalog
    SET
        ${name ? `name='${name}',` : ''}
        ${description ? `description='${description}',` : ''}
        ${bounding_polygon ? `bounding_polygon='${bounding_polygon}',` : ''}
        ${consumtion_link ? `consumtion_link='${consumtion_link}',` : ''}
        ${type ? `type='${type}',` : ''}
        ${consumption_protocol ? `consumption_protocol='${consumption_protocol}',` : ''}
        ${resolution_best ? `resolution_best='${resolution_best}',` : ''}
        ${min_zoom ? `min_zoom='${min_zoom}',` : ''}
        ${max_zoom ? `max_zoom='${max_zoom}',` : ''}`;
  query = query.trim();
  if (query[query.length - 1] === ',') query = query.slice(0, -1);
  return `
        ${query}
        WHERE id = ${id};
      `;
};
