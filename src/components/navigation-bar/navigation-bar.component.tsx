import React from "react";
import { PaddingProps, FlexboxProps } from "styled-system";
import StyledNavigationBar from "./navigation-bar.style";

export type StickyPosition = "top" | "bottom";

export type NavigationBarProps = PaddingProps &
  FlexboxProps & {
    children?: React.ReactNode;
    ariaLabel?: string;
    /** Color scheme of navigation component */
    navigationType?: "light" | "dark";
    /** If 'true' the children will not be visible */
    isLoading?: boolean;
    /** Defines the position of sticky navigation bar */
    stickyPosition?: StickyPosition;
    /** Defines the offset of sticky navigation bar */
    stickyOffset?: string;
  };

const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  stickyOffset = "0",
  stickyPosition,
  ...props
}: NavigationBarProps): JSX.Element => {
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      navigationType={navigationType}
      data-component="navigation-bar"
      stickyOffset={stickyOffset}
      stickyPosition={stickyPosition}
      {...props}
    >
      {!isLoading && children}
    </StyledNavigationBar>
  );
};

export default NavigationBar;
