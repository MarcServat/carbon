import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { addYears, format, formatISO, isMatch, parse } from "date-fns/fp";
// import "react-day-picker/lib/style.css";
import styledSystemPropTypes from "@styled-system/prop-types";
// import styled from "styled-components";
// import DayPicker from "react-day-picker";
import Context from "../../__internal__/i18n-context";
import Events from "../../__internal__/utils/helpers/events";

import {
  filterStyledSystemMarginProps,
  // filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { localeMap, SEPARATORS } from "./__internal__/locale-map/locale-map";
import StyledDateInput from "./date.style";
import Textbox from "../textbox";
import DatePicker from "./__internal__/date-picker";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const DateInput = ({
  adaptiveLabelBreakpoint,
  autoFocus,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  disabled,
  disablePortal,
  helpAriaLabel,
  labelInline,
  minDate,
  maxDate,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  pickerProps = {},
  readOnly,
  size,
  tooltipPosition,
  value,
  ...rest
}) => {
  const ref = useRef();
  const parentRef = useRef();
  const inputRef = useRef();
  const pickerRef = useRef();
  const hasFocus = useRef();
  const locale = useContext(Context);
  const { format: localeFormat, formats } = localeMap[locale.locale()];
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(
    parseDate(localeFormat, value)
  );

  const buildCustomEvent = (ev) => {
    const { id, name } = ev.target;

    const formattedValueString =
      ev.type === "blur"
        ? formattedValue(localeFormat, selectedDays)
        : ev.target.value;
    const rawValue = isDateValid(parseDate(localeFormat, ev.target.value))
      ? formatToISO(localeFormat, ev.target.value)
      : null;

    ev.target = {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        formattedValue: formattedValueString || ev.target.value,
        rawValue,
      },
    };

    return ev;
  };

  const handleChange = (ev) => {
    onChange(buildCustomEvent(ev));
  };

  const handleDayClick = (day, { selected, disabled: isDisabled }, ev) => {
    if (isDisabled) return;
    if (selected) {
      // likely don't need as we don't support unselecting
      setSelectedDays(undefined);
      onChange("");
    } else {
      setSelectedDays(day);
      onChange(
        buildCustomEvent({
          ...ev,
          target: { ...ev.target, value: formattedValue(localeFormat, day) },
        })
      );
    }
  };

  const handleBlur = (ev) => {
    if (disabled || readOnly) return;

    let event;

    if (
      isDateValid(selectedDays) &&
      formattedValue(localeFormat, selectedDays) !== value
    ) {
      event = buildCustomEvent(ev);
      onChange(event);
    } else {
      ev.target = {
        ...ev.target,
        value: {
          formattedValue: ev.target.value,
          rawValue: null,
        },
      };

      event = ev;
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = (ev) => {
    if (disabled || readOnly) return;

    clearTimeout(hasFocus.current);
    hasFocus.current = setTimeout(() => {
      if (!open) {
        setOpen(true);
      }
    }, 150);

    if (onFocus) {
      onFocus(ev);
    }
  };

  const handleKeyDown = (ev) => {
    if (onKeyDown) onKeyDown(ev);

    if (Events.isTabKey(ev)) {
      // and containerProps empty
      // this.isOpening = false;
      // this.inputFocusedViaPicker = false;
      // this.closeDatePicker();
      setOpen(false);
    }
  };

  const handleClick = (ev) => {
    if (disabled || readOnly) return;
    // this.isOpening = true;
    // this.setState(
    //   ({ shouldPickerOpen }) => ({
    //     shouldPickerOpen: !shouldPickerOpen,
    //   }),
    //   () => {
    //     if (this.state.shouldPickerOpen) {
    //       this.isBlurBlocked = true;
    //       this.inputFocusedViaPicker = false;
    //       this.openDatePicker();
    //     } else {
    //       this.inputFocusedViaPicker = false;
    //       this.isOpening = false;
    //       this.closeDatePicker();
    //     }
    //   }
    // );
    if (ev.target.type === "text" && !open) {
      setOpen(true);
    } else if (ev.target.type !== "text") {
      setOpen((prev) => !prev);
    }

    if (onClick) {
      onClick(ev);
    }
  };

  const assignInput = (input) => {
    inputRef.current = input.current;
    parentRef.current = input.current.parentElement;
  };

  useEffect(() => {
    const closePicker = (ev) => {
      if (
        !ev.path.includes(ref.current) &&
        !ev.path.includes(pickerRef.current)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closePicker);

    return function cleanup() {
      document.removeEventListener("click", closePicker);
    };
  }, []);

  useEffect(() => {
    const [matchedFormat, matchedValue] = findMatchedFormatAndValue(
      value,
      formats
    );

    if (matchedFormat && matchedValue) {
      const newValue = parseDate(matchedFormat, matchedValue);
      if (isDateValid(newValue)) {
        setSelectedDays(additionalYears(newValue));
      }
    } else {
      setSelectedDays(undefined);
    }
  }, [value, formats]);

  return (
    <StyledDateInput
      ref={ref}
      role="presentation"
      size={size}
      labelInline={labelInline}
      data-component={dataComponent}
      data-element={dataElement}
      data-role={dataRole}
      {...filterStyledSystemMarginProps(rest)}
    >
      <Textbox
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        iconOnClick={handleClick}
        inputIcon="calendar"
        labelInline={labelInline}
        inputRef={assignInput}
        adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
        tooltipPosition={tooltipPosition}
        helpAriaLabel={helpAriaLabel}
        autoFocus={autoFocus}
        {...rest}
      />
      {open && (
        <DatePicker
          inputElement={parentRef}
          pickerProps={pickerProps}
          inputValue={value}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          onDayClick={handleDayClick}
          minDate={minDate}
          maxDate={maxDate}
          ref={pickerRef}
        />
      )}
    </StyledDateInput>
  );
};

function isDateValid(date) {
  if (!date) {
    return false;
  }

  return date.toString() !== "Invalid Date";
}

function makeSectionedValues(arr, str) {
  return arr.map((_, i) => str.substring(arr[i], arr[i + 1]));
}

function hasMatchedFormat(formatString, valueString) {
  return (
    formatString.length === valueString.length &&
    isMatch(formatString, valueString)
  );
}

function findMatchWithNoSeparators(valueString, formatString) {
  if (valueString.length !== formatString.length) {
    return null;
  }
  const indexArray = formatString.split("").reduce((arr, char, index) => {
    if (index === 0 || char !== formatString[index - 1]) {
      return [...arr, index];
    }
    return arr;
  }, []);

  const [format1, format2, format3] = makeSectionedValues(
    indexArray,
    formatString
  );
  const [value1, value2, value3] = makeSectionedValues(indexArray, valueString);

  if (
    hasMatchedFormat(format1, value1) &&
    hasMatchedFormat(format2, value2) &&
    hasMatchedFormat(format3, value3)
  ) {
    // There is a bug in date-fns that means it fails to parse some valid dates when no separator is used
    return [
      `${format1}.${format2}.${format3}`,
      `${value1}.${value2}.${value3}`,
    ];
  }

  return null;
}

const hasSeparators = (value) => {
  if (!value) return false;

  const separator = SEPARATORS.slice(1).find((char) => value.includes(char));

  return !!separator;
};

function findMatchedFormatAndValue(valueString, formats) {
  const matchedFormatAndValue = formats.reduce((acc, formatString) => {
    let match;
    if (!hasSeparators(valueString) && !hasSeparators(formatString)) {
      // This check is added as there is a bug in date-fns
      // it incorrectly matches or fails to parse valid dates with no separators
      match = findMatchWithNoSeparators(valueString, formatString);
    } else if (hasMatchedFormat(formatString, valueString)) {
      match = [formatString, valueString];
    }

    return match || acc;
  }, []);

  return matchedFormatAndValue;
}

function parseDate(formatString, valueString) {
  return parse(new Date(), formatString, valueString);
}

function formatToISO(formatString, valueString) {
  return formatISO(parseDate(formatString, valueString));
}

function formattedValue(formatString, dateValue) {
  return format(formatString, dateValue);
}

function additionalYears(date) {
  const year = date.getFullYear();

  if (year < 69) {
    return addYears(2000, date);
  }

  if (year <= 99) {
    return addYears(1900, date);
  }

  return date;
}

DateInput.propTypes = {
  ...Textbox.propTypes,
  ...marginPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** Automatically focus on component mount */
  autoFocus: PropTypes.bool,
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal: PropTypes.bool,
  /** Minimum possible date YYYY-MM-DD */
  minDate: PropTypes.string,
  /** Maximum possible date YYYY-MM-DD */
  maxDate: PropTypes.string,
  /** Specify a callback triggered on blur */
  onBlur: PropTypes.func,
  /** Specify a callback triggered on change */
  onChange: PropTypes.func.isRequired,
  /** Specify a callback triggered on focus */
  onFocus: PropTypes.func,
  /** Name of the input */
  name: PropTypes.string,
  /** The current date YYYY-MM-DD */
  value: PropTypes.string.isRequired,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

// export const computedFormatAndValues = (valueString, localeString) => {
//   let customMatch;

//   const { formats } = localeMap[localeString];

//   const matchedFormat = formats.find(
//     (formatString) => {
//       if (!hasSeparators(valueString) && !hasSeparators(formatString)) {
//         customMatch = findMatchWithNoSeparators(valueString, formatString)
//         return !!customMatch
//       }

//       return isMatch(formatString, valueString) && valueString?.length === formatString?.length
//     }
//   );

//   if (!matchedFormat) return [null, null];

//   return customMatch || [matchedFormat, valueString];
// };

export default DateInput;
