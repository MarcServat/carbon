import styled, { css } from "styled-components";
import { padding, flexbox, PaddingProps, FlexboxProps } from "styled-system";
import { baseTheme } from "../../style/themes";

type StyledNavigationBarProps = React.HTMLAttributes<HTMLElement> &
  PaddingProps &
  FlexboxProps & {
    /** Color scheme of navigation component */
    navigationType?: "light" | "dark";
    /** Defines the position of sticky navigation bar */
    stickyPosition?: "top" | "bottom";
    /** Defines the offset of sticky navigation bar */
    stickyOffset?: string;
  };

const StyledNavigationBar = styled.nav<StyledNavigationBarProps>`
  display: flex;
  align-items: center;
  padding: 0 40px;
  line-height: 40px;

  & > * {
    box-sizing: border-box;
    height: 40px;
    vertical-align: middle;
  }

  @media only screen and (max-width: 1259px) {
    padding: 0 32px;
  }

  @media only screen and (max-width: 959px) {
    padding: 0 24px;
  }

  @media only screen and (max-width: 599px) {
    padding: 0 16px;
  }

  && {
    ${padding}
  }

  ${flexbox}

  .carbon-logo {
    margin-right: 10px;
  }

  ${({ stickyPosition, stickyOffset }) =>
    stickyPosition &&
    css`
      position: sticky;
      ${stickyPosition}: ${stickyOffset}
    `};

  ${({ navigationType, theme }) => css`
    min-height: 40px;
    background-color: ${theme.navigationBar.light.background};
    border-bottom: 1px solid ${theme.navigationBar.light.borderBottom};

    ${navigationType === "dark" &&
    css`
      background-color: ${theme.navigationBar.dark.background};
      border-bottom: 1px solid ${theme.navigationBar.dark.borderBottom};
      color: ${theme.colors.white};
    `}
  `}
`;

StyledNavigationBar.defaultProps = {
  theme: baseTheme,
};

export default StyledNavigationBar;
