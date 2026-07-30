/* eslint-disable react/sort-comp, react/button-has-type, import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMessage } from '@edx/frontend-platform/i18n';

import actions from 'data/actions';
import thunkActions from 'data/thunkActions';

import BulkManagementControls from './BulkManagementControls';
import EditModal from './EditModal';
import FilterBadges from './FilterBadges';
import FilteredUsersLabel from './FilteredUsersLabel';
import FilterMenuToggle from './FilterMenuToggle';
import GradebookTable from './GradebookTable';
import ImportSuccessToast from './ImportSuccessToast';
import InterventionsReport from './InterventionsReport';
import PageButtons from './PageButtons';
import ScoreViewInput from './ScoreViewInput';
import SearchControls from './SearchControls';
import SpinnerIcon from './SpinnerIcon';
import StatusAlerts from './StatusAlerts';
import messages from './messages';

export class GradesView extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterBadgeClose = this.handleFilterBadgeClose.bind(this);
  }

  handleFilterBadgeClose(filterNames) {
    return () => {
      this.props.resetFilters(filterNames);
      this.props.updateQueryParams(filterNames.reduce(
        (obj, filterName) => ({ ...obj, [filterName]: false }),
        {},
      ));
      this.props.fetchGrades();
    };
  }

  render() {
    return (
      <>
        <SpinnerIcon />

        <InterventionsReport />

        <section className="leti-gb-section leti-gb-section--filters">
          <header className="leti-gb-section__head">
            <span className="leti-gb-step" aria-hidden="true">1</span>
            <h2 className="leti-gb-section__title">
              <FormattedMessage {...messages.filterStepHeading} />
            </h2>
          </header>

          <div className="leti-gb-toolbar leti-gb-toolbar--filters">
            <div className="leti-gb-toolbar__filters-row">
              <FilterMenuToggle />
              <FilterBadges handleClose={this.handleFilterBadgeClose} />
            </div>
          </div>

          <StatusAlerts />
        </section>

        <section className="leti-gb-section leti-gb-section--grades">
          <header className="leti-gb-section__head">
            <span className="leti-gb-step" aria-hidden="true">2</span>
            <h2 className="leti-gb-section__title">
              <FormattedMessage {...messages.gradebookStepHeading} />
            </h2>
          </header>

          <div className="leti-gb-toolbar leti-gb-toolbar--grades">
            <div className="leti-gb-toolbar__start">
              <ScoreViewInput />
            </div>
            <div className="leti-gb-toolbar__end">
              <BulkManagementControls />
            </div>
          </div>

          <FilteredUsersLabel />

          <div className="leti-gb-search-bar">
            <SearchControls />
          </div>

          <GradebookTable />

          <PageButtons />
          <p className="leti-gb-masters-hint">
            * <FormattedMessage {...messages.mastersHint} />
          </p>
        </section>

        <EditModal />
        <ImportSuccessToast />
      </>
    );
  }
}

GradesView.defaultProps = {};

GradesView.propTypes = {
  updateQueryParams: PropTypes.func.isRequired,

  // redux
  fetchGrades: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({});

export const mapDispatchToProps = {
  fetchGrades: thunkActions.grades.fetchGrades,
  resetFilters: actions.filters.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(GradesView);
