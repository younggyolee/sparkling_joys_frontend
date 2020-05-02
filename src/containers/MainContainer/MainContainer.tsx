import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Main from '../../components/Main/Main';

export const MainContainer = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

// const mapStateToProps = state => ({
//   view: state.view
// });

export default withRouter(
  connect(null, null)(MainContainer)
  // connect(mapStateToProps, null)(AppContainer)
);
