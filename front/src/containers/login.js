import React, { Component } from 'react'
import styled from 'styled-components'


const Header = styled.div`
  background-color: ${props => props.theme.color.black};
  height: 150px;
  padding: 20px;
  color: white;
`

class Login extends Component {
  state = {
    articles: null,
  }

  componentDidMount(){
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <p>Ceci est la page de login</p>
      </React.Fragment>
    )
  }
}



export default Login
