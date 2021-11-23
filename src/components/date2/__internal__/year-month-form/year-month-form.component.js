import React from "react";
// import PropTypes from "prop-types";
// import {Select, Option} from "../../../select"

export default ({
  date = new Date(),
  months,
  onChange,
  renderYear = true,
  renderMonth = true,
  minDate,
  maxDate,
}) => {
  const currentYear = date.getFullYear();
  const toMonth = maxDate || new Date(currentYear + 35, 11);
  const fromMonth = minDate || new Date(currentYear, 0);
  const years = [];

  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = (ev) => {
    console.log(ev.target.form);

    const { year, month } = ev.target.form;
    onChange(
      new Date(
        year?.value || date.getFullYear(),
        month?.value || date.getMonth(),
        date.getDate()
      )
    );
  };

  return (
    <form className="DayPicker-Caption">
      {renderMonth && (
        <select name="month" onChange={handleChange} value={date.getMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
      )}
      {renderYear && (
        <select name="year" onChange={handleChange} value={date.getFullYear()}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )}
    </form>
  );
};
