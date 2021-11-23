// import { format as formatToString, isMatch } from "date-fns";
import { parse, formatISO, isMatch, format } from "date-fns/fp";
// import {localeMap, parseDate, formatToIso, formatToString, isValidFormat } from "./__internal__/utils";

import {
  de as deLocale,
  es as esLocale,
  enCA as enCALocale,
  enGB as enGBLocale,
  enIE as enIELocale,
  enZA as enZALocale,
  fr as frLocale,
  frCA as frCALocale,
  US as enUSLocale,
} from "date-fns/locale";

export const localeMap = {
  "en-GB": {
    ...enGBLocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy",
      // "dd.MM.yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  "en-IE": {
    ...enIELocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy",
      // "dd.MM.yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  "en-ZA": {
    ...enZALocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy",
      // "dd.MM.yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  "fr-FR": {
    ...frLocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  es: {
    ...esLocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  "en-CA": {
    ...enCALocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "MM/dd/yyyy",
      // "dd/MM/yy"
    ],
    format: "MM/dd/yyyy",
    separator: "/",
  },
  "fr-CA": {
    ...frCALocale,
    formats: [
      // "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "dd/MM/yyyy",
      // "dd/MM/yy"
    ],
    format: "dd/MM/yyyy",
    separator: "/",
  },
  de: {
    ...deLocale,
    formats: [
      "dd.MM.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      // "dd/MM/yyyy",
      // "dd/MM/yy"
    ],
    format: "dd.MM.yyyy",
    separator: ".",
  },
  "en-US": {
    ...enUSLocale,
    formats: [
      "dd.MM.yyyy",
      "MM.dd.yyyy",
      // "dd,MM,yyyy",
      // "dd-MM-yyyy",
      // "ddMMyyyy",
      // "ddMMyy",
      "MM/dd/yyyy",
      "dd/MM/yyyy",
      // "dd/MM/yy"
    ],
    format: "MM/dd/yyyy",
    separator: "/",
  },
};

export const isDateValid = (date) => date?.toString() !== "Invalid Date";

export const isValidFormat = (str, localeString) => {
  const { formats } = localeMap[localeString];
  const match = formats.find(
    (dateFormat) =>
      isMatch(dateFormat, str) && str?.length === dateFormat?.length
  );

  return !!match;
};

export const parseDate = (dateFormat, valueString) =>
  parse(new Date(), dateFormat, valueString);

export const formatToISO = (dateFormat, valueString) =>
  formatISO(parseDate(dateFormat, valueString));

export const formattedValue = (dateFormat, dateValue) => {
  if (!dateValue) return null;

  return format(dateFormat, dateValue);
};
