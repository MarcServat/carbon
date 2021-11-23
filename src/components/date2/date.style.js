import styled from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";

import baseTheme from "../../style/themes/base";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";

const datePickerWidth = {
  large: "140px",
  medium: "135px",
  small: "120px",
};

const StyledDateInput = styled.div`
  ${margin}
  width: min-content;

  & ${StyledInputPresentation} {
    flex: none;
    width: ${({ size }) => (size ? datePickerWidth[size] : "135px")};
  }
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

StyledDateInput.defaultProps = {
  theme: baseTheme,
};

export default StyledDateInput;
