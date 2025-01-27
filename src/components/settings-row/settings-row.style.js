import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import {
  StyledHeader,
  StyledHeadingTitle,
  StyledSeparator,
} from "../heading/heading.style";

export const StyledSettingsRow = styled.div`
  ${margin}

  clear: both;
  color: var(--colorsUtilityYin055);
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0;
  position: relative;

  ${({ hasDivider }) =>
    hasDivider &&
    css`
      border-bottom: 1px solid var(--colorsUtilityMajor050);
      padding-bottom: 30px;
    `}

  ${StyledHeader} {
    margin-bottom: 0;
  }

  ${StyledHeadingTitle} {
    color: var(--colorsUtilityYin090);
    font-size: 15px;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  ${StyledSeparator} {
    margin-bottom: 17px;
  }

  + & {
    padding-top: 30px;
  }
`;

StyledSettingsRow.defaultProps = {
  theme: baseTheme,
};

export const StyledSettingsRowHeader = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  max-width: 325px;
  width: 35%;
`;

export const StyledSettingsRowInput = styled.div`
  box-sizing: border-box;
  clear: both;
  float: left;
  margin-left: 50px;
  width: 100%;
`;
