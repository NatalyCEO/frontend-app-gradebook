import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  filterStepHeading: {
    id: 'gradebook.GradesView.filterHeading',
    defaultMessage: 'Filter the Grade Report',
    description: 'Filter controls section title (step number shown in UI)',
  },
  gradebookStepHeading: {
    id: 'gradebook.GradesView.gradebookStepHeading',
    defaultMessage: 'View or Modify Individual Grades',
    description: 'Grades table section title (step number shown in UI)',
  },
  mastersHint: {
    id: 'gradebook.GradesView.mastersHint',
    defaultMessage: "available for learners in the Master's track only",
    description: 'Masters feature availability hint on Grades Tab',
  },
});

export default messages;
