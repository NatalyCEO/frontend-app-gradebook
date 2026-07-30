import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import selectors from 'data/selectors';
import thunkActions from 'data/thunkActions';
import messages from './messages';

/**
 * Parse ?page=N from a pagination URL (DRF-style previous/next).
 */
export const pageFromUrl = (url) => {
  if (!url) {
    return null;
  }
  try {
    const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const page = parseInt(parsed.searchParams.get('page') || '1', 10);
    return Number.isFinite(page) && page > 0 ? page : 1;
  } catch (e) {
    return null;
  }
};

/**
 * Derive current page + total pages from prev/next URLs and counts.
 */
export const getPaginationMeta = ({
  nextPage,
  prevPage,
  resultsCount,
  filteredUsersCount,
}) => {
  let currentPage = 1;
  if (nextPage) {
    const next = pageFromUrl(nextPage);
    currentPage = next && next > 1 ? next - 1 : 1;
  } else if (prevPage) {
    const prev = pageFromUrl(prevPage);
    currentPage = (prev || 1) + 1;
  }

  let pageSize = resultsCount > 0 ? resultsCount : 1;
  if (!nextPage && prevPage && currentPage > 1 && filteredUsersCount > resultsCount) {
    const estimated = Math.round((filteredUsersCount - resultsCount) / (currentPage - 1));
    if (estimated > 0) {
      pageSize = estimated;
    }
  }

  const totalPages = Math.max(
    1,
    Math.ceil((filteredUsersCount || resultsCount || 1) / pageSize),
  );

  return { currentPage, totalPages };
};

export class PageButtons extends React.Component {
  constructor(props) {
    super(props);
    this.getPrevGrades = this.getPrevGrades.bind(this);
    this.getNextGrades = this.getNextGrades.bind(this);
  }

  getPrevGrades() {
    if (this.props.prevPage) {
      this.props.getPrevNextGrades(this.props.prevPage);
    }
  }

  getNextGrades() {
    if (this.props.nextPage) {
      this.props.getPrevNextGrades(this.props.nextPage);
    }
  }

  render() {
    const { currentPage, totalPages } = getPaginationMeta({
      nextPage: this.props.nextPage,
      prevPage: this.props.prevPage,
      resultsCount: this.props.resultsCount,
      filteredUsersCount: this.props.filteredUsersCount,
    });

    const hasPrev = Boolean(this.props.prevPage);
    const hasNext = Boolean(this.props.nextPage);

    return (
      <nav
        className="leti-gb-pager"
        aria-label={this.props.intl.formatMessage(messages.paginationLabel)}
      >
        <button
          type="button"
          className="leti-gb-pager__btn"
          onClick={this.getPrevGrades}
          disabled={!hasPrev}
          aria-label={this.props.intl.formatMessage(messages.prevPage)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <span className="leti-gb-pager__status" aria-live="polite">
          <FormattedMessage
            {...messages.pageStatus}
            values={{ current: currentPage, total: totalPages }}
          />
        </span>
        <button
          type="button"
          className="leti-gb-pager__btn"
          onClick={this.getNextGrades}
          disabled={!hasNext}
          aria-label={this.props.intl.formatMessage(messages.nextPage)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </nav>
    );
  }
}

PageButtons.defaultProps = {
  nextPage: '',
  prevPage: '',
  resultsCount: 0,
  filteredUsersCount: 0,
};

PageButtons.propTypes = {
  intl: intlShape.isRequired,
  getPrevNextGrades: PropTypes.func.isRequired,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
  resultsCount: PropTypes.number,
  filteredUsersCount: PropTypes.number,
};

export const mapStateToProps = (state) => ({
  nextPage: selectors.grades.nextPage(state),
  prevPage: selectors.grades.prevPage(state),
  resultsCount: (selectors.grades.allGrades(state) || []).length,
  filteredUsersCount: selectors.grades.filteredUsersCount(state),
});

export const mapDispatchToProps = {
  getPrevNextGrades: thunkActions.grades.fetchPrevNextGrades,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PageButtons));
