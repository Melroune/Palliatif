import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import StyledButton from "../components/button";

const TopMenuDiv = styled.div`
  background-color: ${props => props.theme.color.grey};
  display: flex;
  flex: 1;
  width: 100;
`;

const LeftTopMenuDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CategoryLabelList = styled.div`
  display: flex;
  flex: 1 1 1;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
`;

const SubCategoryLabelList = styled.div`
  display: flex;
  flex: 1 1 1;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.div`
  cursor: pointer;
  height: 30px;
  padding: 5px;
  margin: 2px;
  color: ${props =>
    props.activated ? props.theme.color.white : props.theme.color.white};
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.activated ? props.theme.color.green : props.theme.color.greenLight};
`;

const RightTopMenuDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Category = styled.h4`
  margin: 0;
  padding: 10px;
`;

const tabCategory = [
  { name: "Sante", id: 1 },
  { name: "Palliatif", id: 2 },
  { name: "Oncologie", id: 3 }
];

const tabSubCategory = [
  { name: "Sante", id: 1, categoryId: 1 },
  { name: "Palliatif", id: 2, categoryId: 3 },
  { name: "Oncologie", id: 3, categoryId: 2 }
];

export default class TopMenu extends React.Component {
  state = {
    selectedCategory: null,
    selectedSubCategory: null,
    subCategoryIsVisible: false
  };

  handleSubCategoryVisibility = isVisible => {
    console.log(isVisible);
    this.setState({
      subCategoryIsVisible: isVisible ? true : false
    });
  };

  handleCategoryClick = id => {
    console.log(id);
    this.setState(
      {
        selectedCategory: this.state.selectedCategory === id ? null : id,
        selectedSubCategory: null
      },
      () => {
        this.handleSubCategoryVisibility(this.state.selectedCategory);
      }
    );
  };

  handleSubCategoryClick = id => {
    console.log(id);
    this.setState({
      selectedSubCategory: this.state.selectedSubCategory === id ? null : id
    });
  };

  render() {
    return (
      <TopMenuDiv>
        <LeftTopMenuDiv>
          <div>
            <Category>Catégories</Category>
          </div>
          <CategoryLabelList>
            {tabCategory.map((category, key) => (
              <Label
                onClick={() => this.handleCategoryClick(category.id)}
                activated={this.state.selectedCategory === category.id}
                key={key}
              >
                {category.name}
              </Label>
            ))}
          </CategoryLabelList>
          <div>
            <Category>Sous-Catégories</Category>
          </div>
          <SubCategoryLabelList>
            {this.state.subCategoryIsVisible ? (
              tabSubCategory.map(
                (category, key) =>
                  this.state.selectedCategory === category.categoryId ? (
                    <Label
                      onClick={() => this.handleSubCategoryClick(category.id)}
                      activated={this.state.selectedSubCategory === category.id}
                      key={key}
                    >
                      {category.name}
                    </Label>
                  ) : null
              )
            ) : (
              <span>Veuillez selectionner une catégorie</span>
            )}
          </SubCategoryLabelList>
        </LeftTopMenuDiv>
        <RightTopMenuDiv>
          <Link to="/admin/articles/create">
            <StyledButton>Ajouter Article</StyledButton>
          </Link>
        </RightTopMenuDiv>
      </TopMenuDiv>
    );
  }
}
