import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class TokenHandler extends Component {
  state = {
    redirect:false
  }
  getHashParams = () => {

        var hashParams = {};
        var e,
          r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      };
    componentDidMount() {
this.setState({redirect:true})
    }
  render() {

        let token = this.getHashParams().access_token;
      localStorage.setItem("accessToken", token);
    if (this.state.redirect){
    return (
           <Redirect to ='/'/>
      )
    } else {
      return'LOADING....'
    }
    }
}

export default TokenHandler
