import {extractNestedFields, groupNestedFields} from "../../utils.js";

export default function (body) {
  // loop through all sqon to determine if nested fields with pivot have AND OP
  const filterToCombine = extractNestedFields(global.sqonQuery)

  if(!filterToCombine.some(f => ['consequences', 'donors'].includes(f))) return body

  // code is ready to handle all nested fields but we only want to update queries with consequences field
  const combined = groupNestedFields(body, filterToCombine);
  console.log('[nestedCombined]', JSON.stringify(combined))
  return combined;
}
