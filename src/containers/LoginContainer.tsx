import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import { setUserIdAction } from '../store/userId/actions';

interface LoginContainerProps {
  setUserId: (userId: string) => void
};

const LoginContainer: React.FC<LoginContainerProps> = ({
  setUserId
}) => {
  return (
    <div>
      <Login onLogin={setUserId}/>
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
