import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAccessToken } from '../stateStore/actions';
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
        this.props.setAccessToken(token)
        return (
           <Redirect to ='/'/>
        )
    }
}

export default connect(null,{setAccessToken})(TokenHandler)
