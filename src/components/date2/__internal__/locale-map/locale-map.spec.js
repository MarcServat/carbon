import { localeMap } from "./locale-map";

const euLocales = ["en-GB", "en-IE", "en-ZA", "fr-FR", "es", "fr-CA", "de"];
const naLocales = ["en-US", "en-CA"];

const euFormats = [
  "dMyy",
  "d.M.yy",
  "d,M,yy",
  "d-M-yy",
  "d/M/yy",
  "ddMyy",
  "dd.M.yy",
  "dd,M,yy",
  "dd-M-yy",
  "dd/M/yy",
  "dMMyy",
  "d.MM.yy",
  "d,MM,yy",
  "d-MM-yy",
  "d/MM/yy",
  "ddMMyy",
  "dd.MM.yy",
  "dd,MM,yy",
  "dd-MM-yy",
  "dd/MM/yy",
  "dMyyyy",
  "d.M.yyyy",
  "d,M,yyyy",
  "d-M-yyyy",
  "d/M/yyyy",
  "ddMyyyy",
  "dd.M.yyyy",
  "dd,M,yyyy",
  "dd-M-yyyy",
  "dd/M/yyyy",
  "dMMyyyy",
  "d.MM.yyyy",
  "d,MM,yyyy",
  "d-MM-yyyy",
  "d/MM/yyyy",
  "ddMMyyyy",
  "dd.MM.yyyy",
  "dd,MM,yyyy",
  "dd-MM-yyyy",
  "dd/MM/yyyy",
];

const naFormats = [
  "Mdyy",
  "M.d.yy",
  "M,d,yy",
  "M-d-yy",
  "M/d/yy",
  "MMdyy",
  "MM.d.yy",
  "MM,d,yy",
  "MM-d-yy",
  "MM/d/yy",
  "Mddyy",
  "M.dd.yy",
  "M,dd,yy",
  "M-dd-yy",
  "M/dd/yy",
  "MMddyy",
  "MM.dd.yy",
  "MM,dd,yy",
  "MM-dd-yy",
  "MM/dd/yy",
  "Mdyyyy",
  "M.d.yyyy",
  "M,d,yyyy",
  "M-d-yyyy",
  "M/d/yyyy",
  "Mddyyyy",
  "M.dd.yyyy",
  "M,dd,yyyy",
  "M-dd-yyyy",
  "M/dd/yyyy",
  "Mddyyyy",
  "M.dd.yyyy",
  "M,dd,yyyy",
  "M-dd-yyyy",
  "M/dd/yyyy",
  "MMddyyyy",
  "MM.dd.yyyy",
  "MM,dd,yyyy",
  "MM-dd-yyyy",
  "MM/dd/yyyy",
];

describe.each([...euLocales, ...naLocales])(
  "localeMap for `%s` returns",
  (locale) => {
    it("the expected formats", () => {
      const expectedFormats = naLocales.includes(locale)
        ? naFormats
        : euFormats;
      const { formats } = localeMap[locale];

      expect(
        expectedFormats.every((format) => formats.includes(format)) &&
          formats.length === expectedFormats.length
      ).toEqual(true);
    });
  }
);
// describe("isDateValid", () => {
//   it("returns true when a valid date value is passed", () => {
//     expect(isDateValid(mockDate)).toEqual(true)
//   });

//   it("returns false when a invalid date value is passed", () => {
//     expect(isDateValid(new Date("foo"))).toEqual(false)
//   });
// });

// describe("parsedDate", () => {
//   it.each(mergedFormatAndValueArray(euFormats, valuesWithSeparators))(
//     "returns a valid date when format is %s and value is %s when in EU locale", (format, value) => {
//     expect(isDateValid(parseDate(format, value))).toEqual(true)
//   });

//   it.each(mergedFormatAndValueArray(naFormats.slice(1), valuesWithSeparators.slice(1)))(
//     // there is an bug with date-fns parse for the format Mdyy so that has been omitted from the arrays
//     "returns a valid date when format is %s and value is %s when in NA locale", (format, value) => {
//      expect(isDateValid(parseDate(format, value))).toEqual(true)
//   });
// });

//   // export const formattedValue = (dateFormat, dateValue) => {
// //   if (!dateValue) return null;

// //   return format(dateFormat, dateValue);
// // };

// describe("formattedValue", () => {
//   it.each([...euLocales, mergedFormatAndValueArray(euFormats, valuesWithSeparators)])(
//     "", (locale, format, value) => {
//     const { format: localeFormat } = localeMap[locale];
//     const date = parseDate(format, value);

//     expect(formattedValue(localeFormat, date)).toEqual("01/01/2021")
//   });

//   fit.each(mergedFormatAndValueArray(naFormats.slice(1), valuesWithSeparators.slice(1)))(
//     "%s %s", (format, value) => {
//       naLocales.forEach((locale) => {
//         const { format: localeFormat } = localeMap[locale];
//         const date = parseDate(format, value);

//         expect(formattedValue(localeFormat, date)).toEqual("01/01/2021")
//       });
//   });

// });
