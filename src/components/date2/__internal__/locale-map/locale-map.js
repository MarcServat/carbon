import {
  de as deLocale,
  es as esLocale,
  enCA as enCALocale,
  enGB as enGBLocale,
  enIE as enIELocale,
  enZA as enZALocale,
  fr as frLocale,
  frCA as frCALocale,
  enUS as enUSLocale,
} from "date-fns/locale";

const EU_FORMATS = [
  "d M yy",
  "dd M yy",
  "d MM yy",
  "dd MM yy",
  "d M yyyy",
  "dd M yyyy",
  "d MM yyyy",
  "dd MM yyyy",
];
const NA_FORMATS = [
  "M d yy",
  "MM d yy",
  "M dd yy",
  "MM dd yy",
  "M d yyyy",
  "M dd yyyy",
  "M dd yyyy",
  "MM dd yyyy",
];
export const SEPARATORS = ["", ".", ",", "-", "/"];

const generateFormats = (formatArray = EU_FORMATS) =>
  formatArray.reduce(
    (arr, formatString) => [
      ...arr,
      ...SEPARATORS.map((char) => formatString.replace(/ /g, char)),
    ],
    []
  );

export const localeMap = {
  "en-GB": {
    ...enGBLocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  "en-IE": {
    ...enIELocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  "en-ZA": {
    ...enZALocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  "fr-FR": {
    ...frLocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  es: {
    ...esLocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  "en-CA": {
    ...enCALocale,
    formats: generateFormats(NA_FORMATS),
    format: "MM/dd/yyyy",
  },
  "fr-CA": {
    ...frCALocale,
    formats: generateFormats(),
    format: "dd/MM/yyyy",
  },
  de: {
    ...deLocale,
    formats: generateFormats(),
    format: "dd.MM.yyyy",
  },
  "en-US": {
    ...enUSLocale,
    formats: generateFormats(NA_FORMATS),
    format: "MM/dd/yyyy",
  },
};
