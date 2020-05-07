import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { getUser } from '../utils/api';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import ItemDetailsContainer from './ItemDetailsContainer';
import HeaderContainer from './HeaderContainer';
import SearchContainer from './SearchContainer';
import Signup from '../components/Signup/Signup';

interface AppContainerProps {
  userId: string,
  setUserId: (userId: string) => void
};

const AppContainer: React.FC<AppContainerProps> = ({ userId, setUserId }) => {
  useEffect(() => {
    (async() => {
      const data = await getUser();
      if (data.userId) setUserId(data.userId);
      console.log('userData', data);
    })();
  }, [userId]);

  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/main' />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={LoginContainer} />
        <Route exact path='/main' render={() => (
          <>
            <HeaderContainer />
            <MainContainer />
          </>
        )} />
        <Route exact path='/items/:itemId' render={() => (
          <>
            <HeaderContainer />
            <ItemDetailsContainer />
          </>
        )} />
        <Route exact path='/search' render={() => (
          <>
            <HeaderContainer />
            <SearchContainer />
          </>
        )} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    },
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
