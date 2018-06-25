import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => props.theme.color.red};
  border: none;
  color: ${props => props.theme.color.white};
  cursor: pointer;
  height: 30px;
  outline: none;
  margin: 10px;
  text-transform: uppercase;
  witdh: 150px;
`;

export default StyledButton;
