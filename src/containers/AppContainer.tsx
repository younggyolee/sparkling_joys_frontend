import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Signup from '../components/Signup/Signup';
import LoginContainer from './LoginContainer';
import HeaderContainer from './HeaderContainer';
import MainContainer from './MainContainer';
import ItemDetailsContainer from './ItemDetailsContainer';

const AppContainer: React.FC = () => {
  return (
    <div>
      <HeaderContainer />
      <Redirect from='/' to='/main' />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={LoginContainer} />
      <Route exact path='/main' component={MainContainer} />
      <Route exact path='/items/:itemId' component={ItemDetailsContainer} />
    </div>
  );
};

export default withRouter(
  connect(null, null)(AppContainer)
);
