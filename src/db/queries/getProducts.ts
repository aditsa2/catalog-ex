export default (filterConditions: string): string => {
    return (`
        SELECT *
        FROM catalog
        WHERE ${filterConditions}
    `);
};