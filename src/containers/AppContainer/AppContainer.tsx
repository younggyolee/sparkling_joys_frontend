import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainContainer from '../MainContainer/MainContainer';
import { RootState } from '../../store';
import { VIEW_TYPES } from '../../store/view/types';

interface StateProps {
  view: string
};

export const AppContainer = ({ view }: StateProps) => {
  return (
    <div>
      {view === VIEW_TYPES.MAIN && <MainContainer />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  view: state.view
});

export default withRouter(
  connect(mapStateToProps)(AppContainer)
);
