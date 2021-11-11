import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../style/themes/base";
import StyledInput from "../../__internal__/input/input.style";
import LabelStyle from "../../__internal__/label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import InputPresentationStyle from "../../__internal__/input/input-presentation.style";
import FormField from "../../__internal__/form-field";

const computeSizeValues = (size) => {
  if (["extra-small", "small", "medium"].includes(size)) {
    return {
      fontSize: "14px",
      iconSize: "16px",
    };
  }

  return {
    fontSize: "16px",
    iconSize: "20px",
  };
};

const StyledFormField = styled(FormField)`
  position: relative;
  & & {
    margin-top: 16px;
  }

  ${({ disabled, error, hasInputIcon, readOnly, size, theme, warning }) =>
    css`
      ${InputPresentationStyle} {
        font-size: ${computeSizeValues(size).fontSize};
        overflow: hidden;

        ${warning &&
        !error &&
        !readOnly &&
        `
          border-color: ${theme.colors.border};
        `}

        ${size === "extra-small" && hasInputIcon && "padding-right: 10px;"}
      }

      ${InputIconToggleStyle} {
        ${(disabled || readOnly) &&
        `
          cursor: not-allowed;
          & span {
            color: ${theme.readOnly.textboxIconColor};
          }
        `}
        ${size === "extra-small" && "margin-left: -4px;"}

        ${!disabled &&
        !readOnly &&
        `
        & span {
          color: ${theme.icon.onLightBackground};
          
          &:hover {
            color: ${theme.icon.onLightBackgroundHover};
          }
        }
      `}

      & span::before {
          font-size: ${computeSizeValues(size).iconSize};
        }
      }

      ${LabelStyle} {
        font-size: ${computeSizeValues(size).fontSize};
      }
      ${StyledInput} {
        font-size: ${computeSizeValues(size).fontSize};
      }
    `}
`;

const ErrorBorder = styled.span`
  ${({ theme, warning }) =>
    css`
      position: absolute;
      z-index: 6;
      width: 2px;
      height: calc(100% + ${theme.spacing * 3}px);
      background-color: ${warning ? theme.colors.warning : theme.colors.error};
      left: -12px;
      bottom: 0;
    `}
`;

const StyledHintText = styled.p`
  margin-top: 0;
  margin-bottom: 8px;
  ${({ theme, size }) =>
    css`
      color: ${theme.colors.placeholder};
      font-size: ${computeSizeValues(size).fontSize};
    `}
`;

StyledHintText.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

ErrorBorder.propTypes = {
  warning: PropTypes.bool,
  size: PropTypes.string,
};

ErrorBorder.defaultProps = {
  warning: false,
  size: "medium",
  theme: baseTheme,
};

StyledFormField.defaultProps = {
  warning: false,
  size: "medium",
  theme: baseTheme,
};

StyledFormField.propTypes = {
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size: PropTypes.oneOf(["extra-small", "small", "medium", "large"]),
};

export { StyledHintText, ErrorBorder, StyledFormField };
