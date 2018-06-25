import React, { Component } from "react";
import styled from "styled-components";
import axios from 'axios'

import StyledButton from '../components/button'

import { Editor } from "@tinymce/tinymce-react";

const AllContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;

const InputText = styled.span`
  text-transform: uppercase;
  padding-left: 20px;
  padding-top: 10px;
`;

const TitleInput = styled.input`
  height: 30px;
  font-size: 26px;
  margin: 20px;
  border-radius: 8px;
  outline: none;
  border: 2px solid ${props => props.theme.color.green};
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${props => props.theme.color.grey};
  flex-direction: column;
`;

//refacto
const CategoryLabelList = styled.div`
  display: flex;
  flex: 1 1 1;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
`;

const tabCategory = [
  { name: "Sante", id: 1 },
  { name: "Palliatif", id: 2 },
  { name: "Oncologie", id: 3 },
  { name: "Oncologie", id: 4 },
  { name: "Oncologie", id: 5 },
  { name: "Oncologie", id: 6 }
];

const tabSubCategory = [
  { name: "Sante", id: 1, categoryId: 1 },
  { name: "Palliatif", id: 2, categoryId: 3 },
  { name: "Oncologie", id: 3, categoryId: 2 },
  { name: "Oncologie", id: 3, categoryId: 4 },
  { name: "Oncologie", id: 3, categoryId: 5 },
  { name: "Oncologie", id: 3, categoryId: 6 }
];

const statusCategory = [
  { id: "docteur"  },
  { id: "user"  },
  { id: "everyone" }
];

const CategoryContainer = styled.div`
  padding-top: 10px;
`;

//refacto
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

class ArticleCreation extends Component {
  state = {
    selectedCategory: null,
    selectedSubCategory: null,
    selectedStatus: null,
    subCategoryIsVisible: false,
    publish: false,
    title: null,
    content: null
  };

  //refacto
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

  handleStatusClick = id => {
    console.log(id);
    this.setState({
      selectedStatus: this.state.selectedStatus === id ? null : id
    });
  };

  //refacto
  handleSubCategoryClick = id => {
    console.log(id);
    this.setState({
      selectedSubCategory: this.state.selectedSubCategory === id ? null : id
    });
  };

  //refacto
  handleSubCategoryVisibility = isVisible => {
    console.log(isVisible);
    this.setState({
      subCategoryIsVisible: isVisible ? true : false
    });
  };

  handlePublishClick = bool => {
    this.setState({
      publish: bool
    });
  };

  handleEditorChange = e => {
    console.log("Content was updated:", e.target.getContent());
    this.setState({
      content: e.target.getContent()
    });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  postArticleToDatabase = () =>{
    console.log(this.state)
    const {  
    selectedCategory,
    selectedSubCategory,
    selectedStatus,
    publish,
    title,
    content } = this.state
    
    axios({
      method: "POST",
      url: "http://localhost:3030/articles/addArticle",
      data: {
        titre: title,
        contenu: content,
        cible_status: selectedStatus,
        date_create: "2005-04-8 2:00:00.000",
        visible: publish ? 1 : 0,
        sous_categoriesId: selectedSubCategory,
        users_idusers: 1,
      }
    });

  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <AllContainer>
          <LeftContainer>
            <InputText>Titre</InputText>
            <TitleInput
              onChange={this.handleTitleChange}
              placeholderText="Entrez votre titre"
            />
            <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                plugins: "link image code",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | code"
              }}
              onChange={this.handleEditorChange}
            />
          </LeftContainer>
          <RightContainer>
            {/* Refacto*/}
            <CategoryContainer>
              <InputText>Categories</InputText>
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
            </CategoryContainer>
            <InputText>Sous-Categories</InputText>
            {/* Refacto*/}
            <CategoryLabelList>
              {this.state.subCategoryIsVisible ? (
                tabSubCategory.map(
                  (category, key) =>
                    this.state.selectedCategory === category.categoryId ? (
                      <Label
                        onClick={() => this.handleSubCategoryClick(category.id)}
                        activated={
                          this.state.selectedSubCategory === category.id
                        }
                        key={key}
                      >
                        {category.name}
                      </Label>
                    ) : null
                )
              ) : (
                <span>Veuillez selectionner une catégorie</span>
              )}
            </CategoryLabelList>
            <InputText>VISIBILITÉ</InputText>
            <CategoryLabelList>
              {statusCategory.map((category, key) => (
                <Label
                  onClick={() => this.handleStatusClick(category.id)}
                  activated={this.state.selectedStatus === category.id}
                  key={key}
                >
                  {category.id}
                </Label>
              ))}
            </CategoryLabelList>
            <InputText>PUBLIÉ</InputText>
            <CategoryLabelList>
              <Label
                onClick={() => this.handlePublishClick(true)}
                activated={this.state.publish}
              >
                OUI
              </Label>
              <Label
                onClick={() => this.handlePublishClick(false)}
                activated={!this.state.publish}
              >
                NON
              </Label>
            </CategoryLabelList>
            <InputText>ENVOYER ARTICLE</InputText>
            <CategoryLabelList>
              <StyledButton onClick={this.postArticleToDatabase}>
                VALIDER
              </StyledButton>
            </CategoryLabelList>
          </RightContainer>
        </AllContainer>
      </React.Fragment>
    );
  }
}

export default ArticleCreation;
