import { Knex } from 'knex';
import { AlterTableBuilder, Transaction } from 'knex';

const championSchema = 'champion_service';
const { stagesTable, prospectsTable, prospectsActivationFormTable } = {
  stagesTable: `${championSchema}.onboarding_stages`,
  prospectsTable: `${championSchema}.prospective_champions`,
  prospectsActivationFormTable: `${championSchema}.prospective_champion_activation_form`
};

enum OldStagesColumn {
  TOP_OF_FUNNEL = 1,
  TESTING = 2,
  AWAITING_GUARANTOR_FORM = 3,
  VERIFICATION = 4,
  ONBOARDING = 5,
  ACTIVATION = 6
}

enum NewStagesColumn {
  TOP_OF_FUNNEL = 1,
  TEST_SCHEDULED = 2,
  TESTED = 3,
  ISSUED_GUARANTOR_FORM = 4,
  RECEIVED_GUARANTOR_FORM = 5,
  IN_VERIFICATION = 6,
  ONBOARDING = 7,
  AWAITING_ACTIVATION = 8,
  ACTIVATED = 9
}

interface NameLabel {
  name: string;
  label: string;
  rank: number;
}

interface Mapper {
  [key: string]: NameLabel;
}

interface OnboardingStages extends NameLabel {
  id: number;
}



async function addOnboardingStages(knex: Knex) {
  const stages: OnboardingStages[] = [
    { id: NewStagesColumn.ONBOARDING, name: 'onboarding', label: 'Onboarding', rank: 700 },
    { id: NewStagesColumn.AWAITING_ACTIVATION, name: 'awaiting_activation', label: 'Awaiting Activation', rank: 800 },
    { id: NewStagesColumn.ACTIVATED, name: 'activated', label: 'Activated', rank: 900 }
  ];

  await knex.table(stagesTable).insert(stages);
}







//******
//mins
