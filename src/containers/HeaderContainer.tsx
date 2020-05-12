import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,
  useHistory
} from 'react-router-dom';
import Header from '../components/Header/Header';
import { RootState } from '../store';
import { setUserIdAction } from '../store/userId/actions';
import { logout } from '../utils/api';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface HeaderContainerProps {
  userId: string,
  userName: string,
  setUserId: (userId: string) => void,
};

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  userId,
  userName,
  setUserId
}) => {
  const history = useHistory();

  async function handleLogout() {
    await logout();
    setUserId('');
    history.push('/main');
  }

  return (
    <Header
      userId={userId}
      userName={userName}
      onLogout={handleLogout} 
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  userId: state.userId,
  userName: state.userName
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);
