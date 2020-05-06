import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { 
  withRouter,
  useHistory
 } from 'react-router-dom';
import Login from '../components/Login/Login';
import { setUserIdAction } from '../store/userId/actions';
import { RootState } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface LoginContainerProps {
  setUserId: (userId: string) => void,
};

const LoginContainer: React.FC<LoginContainerProps> = ({
  setUserId
}) => {
  const history = useHistory();

  async function handleLoginSubmit(username: string, password: string) {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`, {
        username,
        password
      });

    if (data.result === 'ok' && data.userId) {
      const userId = data.userId;
      setUserId(userId);
      history.push('/main');
    } else {
      // show some error message to user
    }
  }

  return (
    <div>
      <Login onLoginSubmit={handleLoginSubmit} /> 
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserId(userId: string) {
      dispatch(setUserIdAction(userId));
    },
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(LoginContainer)
);
