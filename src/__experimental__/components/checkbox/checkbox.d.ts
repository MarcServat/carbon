import * as React from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelp?: React.ReactNode;
  labelHelp?: React.ReactNode;
  autoFocus?: boolean;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelAlign?: string;
  labelWidth?: number | string;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  value: string;
  /* Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error?: boolean | string;
  /* Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning?: boolean | string;
  /* Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info?: boolean | string;
}

declare const Checkbox: React.ComponentClass<CheckboxProps>;

export { Checkbox };
