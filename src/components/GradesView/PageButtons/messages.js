import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  prevPage: {
    id: 'gradebook.GradesView.PageButtons.prevPage',
    defaultMessage: 'Previous page',
    description: 'Accessible label for previous grades page control',
  },
  nextPage: {
    id: 'gradebook.GradesView.PageButtons.nextPage',
    defaultMessage: 'Next page',
    description: 'Accessible label for next grades page control',
  },
  paginationLabel: {
    id: 'gradebook.GradesView.PageButtons.paginationLabel',
    defaultMessage: 'Gradebook pages',
    description: 'ARIA label for gradebook table pagination',
  },
  pageStatus: {
    id: 'gradebook.GradesView.PageButtons.pageStatus',
    defaultMessage: '{current} / {total}',
    description: 'Current page and total pages counter',
  },
});

export default messages;
