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
import ReceptionContainer from './ReceptionContainer';
import LoginContainer from './LoginContainer';
import MainContainer from './MainContainer';
import ItemDetailsContainer from './ItemDetailsContainer';
import HeaderContainer from './HeaderContainer';
import SearchContainer from './SearchContainer';
import Signup from '../components/Signup/Signup';
import { setUserNameAction } from '../store/userName/actions';

interface AppContainerProps {
  userId: string,
  userName: string,
  setUserId: (userId: string) => void,
  setUserName: (userName: string) => void
};

const AppContainer: React.FC<AppContainerProps> = ({
  userId,
  userName,
  setUserId,
  setUserName
}) => {
  useEffect(() => {
    (async() => {
      const data = await getUser();
      if (data.userId) setUserId(data.userId);
      if (data.username) setUserName(data.username);
      console.log('userdata', data);
    })();
  }, []);

  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/main' />
        <Route exact path='/reception' render={() => (
          <>
            <HeaderContainer />
            <ReceptionContainer />
          </>
        )} />
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
    setUserName(userName: string) {
      dispatch(setUserNameAction(userName));
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId,
  userName: state.userName
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
