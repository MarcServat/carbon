import filterObjectProperties from "../../utils/helpers/filter-object-properties";

const paddingPropertyNames = [
  "padding",
  "p",
  "paddingLeft",
  "pl",
  "paddingRight",
  "pr",
  "paddingTop",
  "pt",
  "paddingBottom",
  "pb",
  "paddingX",
  "px",
  "paddingY",
  "py",
];

export default function filterStyledSystemPaddingProps(originalObject) {
  return filterObjectProperties(originalObject, paddingPropertyNames);
}
