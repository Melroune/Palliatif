import React, { Component } from "react";
import styled from "styled-components";

const Title = styled.h4`
  margin: 0;
  padding: 10px;
  background-color: ${props => props.theme.color.grey};
`;

const Edition = styled.div`
  flex: 1;
  display: flex;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${props =>
    props.isList ? props.theme.color.greenLight : props.theme.color.green};
  display: flex;
  justify-content: flex-start;
`;

const ListCell = styled.div`
  text-align: center;
  height: inherit;
  flex: ${props => props.flex};
`;

const ListText = styled.span`
  cursor: ${props => (props.pointer ? "pointer" : "")};
  line-height: 40px;
  padding: 0px 5px;
`;

const Articles = [
  {
    id: 1,
    titre: "SOINS PALLIATIF",
    cible_status: "user",
    date_create: "2005-04-8 2:00:00.000",
    visible: 1
  },
  {
    id: 2,
    titre: "SOINS ALTERNATIF COMMMENT LES GERER HAHAAHAH",
    cible_status: "user",
    date_create: "2005-04-8 2:00:00.000",
    visible: 1
  },
  {
    id: 3,
    titre: "SOINS ALTERNATIF COMMMENT LES GERER HAHAAHAH",
    cible_status: "user",
    date_create: "2005-04-8 2:00:00.000",
    visible: 0
  }
];

const isVisible = visible => (visible ? "OUI" : "NON");

const Visibility = styled.span`
  cursor: pointer;
  text-transform: uppercase;
  line-height: 40px;
  color: ${props => {
    return props.visible ? props.theme.color.green : props.theme.color.red;
  }};
`;

const ArticleList = (articles, editArticle, editVisibility) => {
  return articles.map((article, key) => {
    return (
      <ListContainer key={key} isList>
        <ListCell flex={7}>
          <ListText pointer> {article.titre}</ListText>
        </ListCell>
        <ListCell flex={1}>
          <ListText pointer onClick={() => editArticle(article.id)}>
            logo
          </ListText>
        </ListCell>
        <ListCell flex={1}>
          <Visibility
            onClick={() => editVisibility(article.id)}
            visible={article.visible}
          >
            {isVisible(article.visible)}
          </Visibility>
        </ListCell>
      </ListContainer>
    );
  });
};

const ListHeader = () => (
  <ListContainer>
    <ListCell flex={7}>
      <ListText> TITRE </ListText>
    </ListCell>
    <ListCell flex={1}>
      <ListText> Editer </ListText>
    </ListCell>
    <ListCell flex={1}>
      <ListText> Visibilité</ListText>
    </ListCell>
  </ListContainer>
);

export default class List extends React.Component {
  editArticle = id => {
    console.log(id);
    // push vers la route avec l'id en parametre
  };

  editVisibility = id => {
    console.log(id);
    // changer le OUI ou non apres appel a la base (l'objet retourner sera modifier)
  };

  render() {
    return (
      <React.Fragment>
        <Title>EDITION ARTICLE </Title>
        <ListHeader />
        {ArticleList(Articles, this.editArticle, this.editVisibility)}
        <Edition />
      </React.Fragment>
    );
  }
}
