import styled from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../style/themes";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";

const PopoverContainerWrapperStyle = styled.div`
  position: relative;
  display: inline-block;
`;

const PopoverContainerHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  max-width: 280px;
`;

const PopoverContainerContentStyle = styled.div`
  ${padding}

  background: var(--colorsUtilityYang100);
  box-shadow: var(--boxShadow100);
  min-width: 300px;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.popover};

  ${({ shouldCoverButton }) => shouldCoverButton && "top: 0"}

  ${({ position }) => (position === "left" ? "right: 0" : "left: 0")};

  ${({ animationState }) => {
    switch (animationState) {
      case "entering":
        return `
        opacity: 0;
        transform: translateY(-8px);
      `;
      case "entered":
        return `
        opacity: 1; 
        transform: translateY(0);
        transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1.5);
          `;
      case "exiting":
        return `
        opacity: 0; 
        transform: translateY(-8px);
        transition: all 0.3s cubic-bezier(0.25, 0.25, 0, 1.5);
          `;
      default:
        return "opacity: 0";
    }
  }}
`;

const PopoverContainerOpenIcon = styled(IconButton)`
  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

const PopoverContainerCloseIcon = styled(IconButton)`
  position: absolute;
  top: 16px;
  right: 24px;

  ${StyledIcon} {
    color: var(--colorsActionMinor500);
  }
`;

const PopoverContainerTitleStyle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

PopoverContainerContentStyle.defaultProps = {
  theme: baseTheme,
};

export {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitleStyle,
  PopoverContainerOpenIcon,
};
