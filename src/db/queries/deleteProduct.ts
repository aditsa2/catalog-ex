export default (id: string): string => {
  return `
    DELETE FROM catalog Where id='${id}'
    `;
};
