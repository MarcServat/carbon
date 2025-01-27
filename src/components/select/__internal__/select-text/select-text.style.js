import styled, { css } from "styled-components";

const StyledSelectText = styled.span`
  ${({ disabled, hasPlaceholder, readOnly, transparent }) => css`
    align-items: center;
    display: inline-flex;
    flex-grow: 1;
    font-size: 14px;
    height: auto;
    overflow: hidden;
    outline: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 30px;
    z-index: 1;

    ${transparent &&
    css`
      font-weight: 900;
      text-align: right;
      flex-direction: row-reverse;
    `}

    ${hasPlaceholder &&
    css`
      color: var(--colorsUtilityYin055);
      font-weight: normal;
      user-select: none;
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      color: var(--colorsUtilityYin030);
      text-shadow: none;
    `}

    ${readOnly &&
    css`
      cursor: default;
      color: var(--colorsUtilityYin065);
      text-shadow: none;
    `}
  `}
`;

export default StyledSelectText;
