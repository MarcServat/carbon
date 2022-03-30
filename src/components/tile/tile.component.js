import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import { StyledTile, TileContent } from "./tile.style.js";
import Logger from "../../__internal__/utils/logger";

let deprecatedWarnTriggered = false;

const Tile = ({
  as,
  variant = "tile",
  p = 3,
  children,
  orientation = "horizontal",
  width,
  ...props
}) => {
  if (!deprecatedWarnTriggered && as) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      // eslint-disable-next-line max-len
      "The `as` prop is deprecated and will soon be removed from the `Tile` component interface. You should use the `variant` prop to achieve the same styling. The following codemod is available to help with updating your code https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop"
    );
  }

  const isHorizontal = () => orientation === "horizontal";
  const isVertical = () => orientation === "vertical";
  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    const { width: contentWidth, ...childProps } = child.props;
    const key = child.key || `tile-content-${index + 1}`;

    return (
      <TileContent
        key={key}
        width={contentWidth}
        isHorizontal={isHorizontal(orientation)}
        isVertical={isVertical(orientation)}
        {...(isVertical(orientation) && {
          pt: props.pt || props.py || p,
          pb: props.pb || props.py || p,
        })}
        {...(isHorizontal(orientation) && {
          pr: props.pr || props.px || p,
          pl: props.pl || props.px || p,
        })}
      >
        {React.cloneElement(child, childProps)}
      </TileContent>
    );
  });

  return (
    <StyledTile
      tileTheme={as || variant}
      width={width}
      data-component="tile"
      isHorizontal={isHorizontal(orientation)}
      p={p}
      {...props}
    >
      {wrappedChildren}
    </StyledTile>
  );
};

Tile.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Sets the theme of the tile - either 'tile' or 'transparent' */
  as: PropTypes.oneOf(["tile", "transparent"]),
  /** Sets the theme of the tile - either 'tile' or 'transparent' */
  variant: PropTypes.oneOf(["tile", "transparent"]),
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children: PropTypes.node,
  /** The orientation of the tile - set to either horizontal or vertical */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Tile;
