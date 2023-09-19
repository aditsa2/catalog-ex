type ValidFields =
  | 'id'
  | 'name'
  | 'description'
  | 'bounding_polygon'
  | 'consumtion_link'
  | 'type'
  | 'consumption_protocol'
  | 'resolution_best'
  | 'min_zoom'
  | 'max_zoom';

type ValidOperatorsForFields = '<' | '>' | '<=' | '>=' | '=' | '!=' | 'st_contains' | 'st_within' | 'st_intersects';

interface FilterObject {
  field: ValidFields;
  operator: ValidOperatorsForFields;
  filterArg: any;
}

function isArrayOfObjectsValid(arr: FilterObject[]): boolean {
  const seenFields: Set<ValidFields> = new Set();
  for (const filterObj of arr) {
    let objectKeysValid: boolean = true;
    Object.keys(filterObj).forEach((key: any): void => {
      objectKeysValid = objectKeysValid && ['field', 'operator', 'filterArg'].includes(key);
    });
    if (Object.keys(filterObj).length != 3 || !objectKeysValid) return false;

    const { field, operator } = filterObj;

    // Check if the field is valid
    if (!isValidField(field)) {
      return false;
    }

    // Check if the operator is valid for the field
    if (!isValidOperatorForField(field, operator)) {
      return false;
    }

    // Check if the field is not repeated
    if (seenFields.has(field)) {
      return false;
    }

    seenFields.add(field);
  }

  return true;
}

function isValidField(field: ValidFields): boolean {
  const validFields: ValidFields[] = [
    'id',
    'name',
    'description',
    'bounding_polygon',
    'consumtion_link',
    'type',
    'consumption_protocol',
    'resolution_best',
    'min_zoom',
    'max_zoom',
  ];
  return validFields.includes(field);
}

function isValidOperatorForField(field: ValidFields, operator: ValidOperatorsForFields): boolean {
  switch (field) {
    case 'id':
    case 'min_zoom':
    case 'max_zoom':
    case 'resolution_best':
      return ['<', '>', '<=', '>=', '=', '!='].includes(operator);

    case 'name':
    case 'description':
    case 'consumtion_link':
    case 'type':
    case 'consumption_protocol':
      return operator === '=';

    case 'bounding_polygon':
      return ['st_contains', 'st_within', 'st_intersects'].includes(operator);

    default:
      return false;
  }
}

export default isArrayOfObjectsValid;
// Example usage:
const filters: FilterObject[] = [
  { field: 'id', operator: '=', filterArg: 42 },
  { field: 'name', operator: '=', filterArg: 'John' },
  { field: 'description', operator: '=', filterArg: 'Some description' },
  { field: 'bounding_polygon', operator: 'st_contains', filterArg: 'some polygon' },
];

const isValid = isArrayOfObjectsValid(filters);
