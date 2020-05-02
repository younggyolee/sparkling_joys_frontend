import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../store';
import { VIEW_TYPES } from '../../store/view/types';

// import Reception from '../../components/Reception/Reception';
// import Main from '../../components/Main/Main';

import MainContainer from '../MainContainer/MainContainer';

interface StateProps {
  view: string
};

export const AppContainer = ({ view }: StateProps) => {
  return (
    <div>
      {
        (view === VIEW_TYPES.RECEPTION) || 
        (view === VIEW_TYPES.MAIN) && 
        <MainContainer />
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  view: state.view
});

export default withRouter(
  connect(mapStateToProps)(AppContainer)
);
