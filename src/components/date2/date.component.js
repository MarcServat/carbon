import React, { useEffect, useRef, useState, useContext } from "react";
// import PropTypes from "prop-types";
import "react-day-picker/lib/style.css";
// import styledSystemPropTypes from "@styled-system/prop-types";
import Context from "../../__internal__/i18n-context";
import Events from "../../__internal__/utils/helpers/events";

import {
  filterStyledSystemMarginProps,
  // filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import {
  localeMap,
  isDateValid,
  parseDate,
  formatToISO,
  formattedValue,
  isValidFormat,
} from "./__internal__/utils";
import StyledDateInput from "./date.style";
import Textbox from "../textbox";
import DatePicker from "./__internal__/date-picker";

// const marginPropTypes = filterStyledSystemMarginProps(
//   styledSystemPropTypes.space
// );

const DateInput = ({
  adaptiveLabelBreakpoint,
  autoFocus,
  dataComponent,
  dataElement,
  dataRole,
  disabled,
  helpAriaLabel,
  labelInline,
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
  const locale = useContext(Context);
  const { format, separator } = localeMap["en-US"];

  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState(
    parseDate(new Date(), format, value)
  );

  const buildCustomEvent = (ev) => {
    const { id, name } = ev.target;

    const formattedValueString =
      ev.type === "blur"
        ? formattedValue(format, selectedDays)
        : ev.target.value;
    const rawValue = isDateValid(parseDate(format, ev.target.value))
      ? formatToISO(format, ev.target.value)
      : null;

    ev.target = {
      ...(name && { name }),
      ...(id && { id }),
      value: {
        formattedValue: formattedValueString,
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
          target: { ...ev.target, value: formattedValue(format, day) },
        })
      );
    }
  };

  console.log(locale.locale(), format);

  const handleBlur = (ev) => {
    if (
      isDateValid(selectedDays) &&
      formattedValue(format, selectedDays) !== value
    ) {
      const event = buildCustomEvent(ev);
      onChange(event);
      if (onBlur) onBlur(event);
    }
  };

  const handleFocus = (ev) => {
    if (disabled || readOnly) return;
    setTimeout(() => {
      // if (this.isAutoFocused) {
      //   this.isAutoFocused = false;
      // } else {
      //   this.openDatePicker();
      // }
      if (!open) setOpen(true);
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
    const fn = (ev) => {
      if (
        !ev.path.includes(ref.current) &&
        !ev.path.includes(pickerRef.current)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", fn);

    return function cleanup() {
      document.removeEventListener("click", fn);
    };
  }, []);

  useEffect(() => {
    const formatInputString = () => {
      const arr = [".", ",", "-", "/"];
      const replacedCharIndex = arr.findIndex((char) => value.includes(char));

      if (replacedCharIndex === -1) {
        return value;
      }

      return value.replaceAll(arr[replacedCharIndex], separator);
    };

    if (isValidFormat(value, locale.locale())) {
      const newValue = formatInputString();
      // replace, check if valid and update if yes
      if (isDateValid(parseDate(format, newValue))) {
        setSelectedDays(parseDate(format, newValue));
      }
    } else {
      setSelectedDays(undefined);
    }
  }, [value, format, separator, locale]);

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
          ref={pickerRef}
        />
      )}
    </StyledDateInput>
  );
};

export default DateInput;
