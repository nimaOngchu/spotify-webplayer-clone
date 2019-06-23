import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class TokenHandler extends Component {

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

    }
  render() {

        let token = this.getHashParams().access_token;
      localStorage.setItem("accessToken", token);
        return (
           <Redirect to ='/'/>
        )
    }
}

export default TokenHandler
