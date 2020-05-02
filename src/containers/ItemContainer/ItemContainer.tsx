import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const ItemContainer = () => {
  return (
    <div>
    </div>
  );
};

// const mapStateToProps = state => ({
//   view: state.view
// });

export default withRouter(
  connect(null, null)(ItemContainer)
  // connect(mapStateToProps, null)(AppContainer)
);
