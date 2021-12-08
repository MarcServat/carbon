import styled, { css } from "styled-components";

const StyledOptionRow = styled.tr`
  cursor: pointer;

  ${({ hidden }) => hidden && "display: none;"}

  ${({ isHighlighted }) =>
    isHighlighted &&
    css`
      background-color: var(--colorsUtilityMajor025);
    `}

  :hover {
    background-color: var(--colorsUtilityMajor025);
  }

  td {
    line-height: 16px;
    padding: 12px 16px;

    &:first-child {
      font-weight: 700;
    }
  }
`;

export default StyledOptionRow;
