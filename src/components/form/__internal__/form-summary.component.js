import React from "react";
import PropTypes from "prop-types";

import { StyledFormSummary, StyledInternalSummary } from "./form-summary.style";
import Icon from "../../icon";
import useLocale from "../../../hooks/__internal__/useLocale";

const Summary = ({ type, errors, warnings }) => {
  const l = useLocale();
  const messages = {
    errors,
    warnings,
  };

  if (messages[type]) {
    return (
      <StyledInternalSummary type={type} data-element={type}>
        <Icon type={type.slice(0, -1)} />
        <span>{l.errors.messages.formSummary(errors, warnings, type)}</span>
      </StyledInternalSummary>
    );
  }
  return null;
};

Summary.propTypes = {
  type: PropTypes.oneOf(["errors", "warnings"]),
  errors: PropTypes.number,
  warnings: PropTypes.number,
};

const FormSummary = (props) => (
  <StyledFormSummary
    showSummary={props.errors > 0 || props.warnings > 0}
    data-element="form-summary"
  >
    <Summary type="errors" {...props} />
    <Summary type="warnings" {...props} />
    {props.children}
  </StyledFormSummary>
);

FormSummary.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.number,
  warnings: PropTypes.number,
};

export default FormSummary;
