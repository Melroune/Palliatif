import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  background-color: ${props => props.theme.color.green};
  height: 100vh;
  width: 200px;
  color: white;
  display: flex;
`;

const MenuList = styled.ul`
  list-style: none;
`;

const MenuElement = styled.li`
  padding: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.color.white};
`;

export default class MenuAdmin extends React.Component {
  render() {
    return (
      <Menu>
        <MenuList>
          <MenuElement>
            <StyledLink to="/admin/articles">Article</StyledLink>
          </MenuElement>
          <MenuElement>
            <StyledLink to="/admin/users">Users</StyledLink>
          </MenuElement>
          <MenuElement>
            <StyledLink to="/admin/annuaires">Annuaires</StyledLink>
          </MenuElement>
        </MenuList>
      </Menu>
    );
  }
}
