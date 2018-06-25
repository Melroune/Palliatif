import React, { Component } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import {connect} from 'react-redux'

import axios from 'axios'




const Header = styled.div`
  background-color: ${props => props.theme.color.black};
  height: 150px;
  padding: 20px;
  color: white;
`

class News extends Component {
  state = {
    news: null,
  }

  componentDidMount(){
    console.log(this.props)
    const parsed = queryString.parse(this.props.search);
    console.log('idParsed: ', parsed);
    axios.get(`http://localhost:3030/articles/getArticle/${parsed.id ? parsed.id : 2  }`).then(res => {
      console.log(res)
      this.setState({"news": res.data[5].contenu })
      //stocker dans state
    });
  }

  render() {
    
    return (
      <React.Fragment>
        <Header />
          <div dangerouslySetInnerHTML={{ __html: this.state.news }} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})

export default connect(mapStateToProps)(News)


