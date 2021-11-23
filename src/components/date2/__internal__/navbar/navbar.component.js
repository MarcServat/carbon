import React from "react";
import PropTypes from "prop-types";
import StyledButton from "./button.style";
import StyledNavbar from "./navbar.style";
import Icon from "../../../icon";

const Navbar = ({ onPreviousClick, onNextClick, captionElement, ...props }) => {
  console.log(props.month.getFullYear());
  return (
    <StyledNavbar {...props}>
      <StyledButton onClick={() => onPreviousClick()}>
        <Icon type="chevron_left" />
      </StyledButton>
      {captionElement}
      <StyledButton onClick={() => onNextClick()}>
        <Icon type="chevron_right" />
      </StyledButton>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default Navbar;
