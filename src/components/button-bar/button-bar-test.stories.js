import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "../button";
import ButtonBar from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import {
  BUTTON_BAR_ICON_POSITIONS,
  BUTTON_BAR_SIZES,
} from "./button-bar.config";

export default {
  title: "Button Bar/Test",
  parameters: {
    info: { disable: true },
    chromatic: { disable: true },
  },
};

const commonArgTypesButtonBar = {
  size: {
    options: BUTTON_BAR_SIZES,
    control: { type: "select" },
  },
  iconPosition: {
    options: BUTTON_BAR_ICON_POSITIONS,
    control: { type: "select" },
  },
};

const commonArgsButtonBar = {
  size: "medium",
  fullWidth: false,
  iconPosition: "before",
};

export const Default = ({ ...args }) => (
  <ButtonBar onClick={action("click")} {...args}>
    <Button iconType="search">Example Button</Button>
    <Button iconType="pdf">Example Button</Button>
    <Button iconType="csv">Example Button</Button>
  </ButtonBar>
);

export const Preview = () => {
  return (
    <>
      <ButtonBar ml={2} mt={2}>
        <IconButton onAction={() => {}}>
          <Icon type="pdf" />
        </IconButton>
        <IconButton onAction={() => {}}>
          <Icon type="csv" />
        </IconButton>
        <IconButton onAction={() => {}}>
          <Icon type="search" />
        </IconButton>
      </ButtonBar>
      {BUTTON_BAR_SIZES.map((size) => (
        <ButtonBar key={size} size={size} ml={2} mt={2}>
          <Button iconType="pdf" />
          <Button iconType="csv" />
          <Button iconType="search" />
        </ButtonBar>
      ))}
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) => (
        <React.Fragment key={iconPosition}>
          {BUTTON_BAR_SIZES.map((size) => (
            <>
              <ButtonBar
                key={size + iconPosition}
                iconPosition={iconPosition}
                size={size}
                ml={2}
                mt={2}
              >
                <Button iconType="pdf">{iconPosition}</Button>
                <Button iconType="csv">{iconPosition}</Button>
                <Button iconType="search">{iconPosition}</Button>
              </ButtonBar>
            </>
          ))}
        </React.Fragment>
      ))}
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) => (
        <React.Fragment key={iconPosition}>
          {BUTTON_BAR_SIZES.map((size) => (
            <>
              <ButtonBar
                fullWidth
                key={`${size}${iconPosition}fullWidth`}
                iconPosition={iconPosition}
                size={size}
                ml={2}
                mt={2}
              >
                <Button iconType="pdf">{iconPosition}</Button>
                <Button iconType="csv">{iconPosition}</Button>
                <Button iconType="search">{iconPosition}</Button>
              </ButtonBar>
            </>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

Default.story = {
  name: "default",
  args: {
    ...commonArgsButtonBar,
  },
  argTypes: {
    ...commonArgTypesButtonBar,
  },
};

Preview.story = {
  name: "visual",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
