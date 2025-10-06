export type QuestionType = 'radio' | 'scale' | 'text' | 'multiselect';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: QuestionOption[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  framework: 'SOCRATES' | 'ICE' | 'RED_FLAG';
  component: string; // SOCRATES component (Site, Onset, etc.) or ICE component
}

// Generic questions that apply to all diseases - will be customized by AI later
export const getGeneralQuestions = (diseaseCategory: string): Question[] => {
  return [
    // SOCRATES: Site
    {
      id: 'site',
      question: `Where exactly do you feel the main symptoms related to ${diseaseCategory}?`,
      type: 'text',
      framework: 'SOCRATES',
      component: 'Site'
    },
    // SOCRATES: Onset
    {
      id: 'onset',
      question: 'When did these symptoms first start?',
      type: 'radio',
      options: [
        { value: 'sudden', label: 'Suddenly (within minutes to hours)' },
        { value: 'gradual', label: 'Gradually (over days)' },
        { value: 'chronic', label: 'Slowly over weeks/months' },
        { value: 'recurring', label: 'Comes and goes' }
      ],
      framework: 'SOCRATES',
      component: 'Onset'
    },
    // SOCRATES: Character
    {
      id: 'character',
      question: 'How would you describe the nature of your symptoms?',
      type: 'multiselect',
      options: [
        { value: 'sharp', label: 'Sharp/Stabbing' },
        { value: 'dull', label: 'Dull/Aching' },
        { value: 'burning', label: 'Burning' },
        { value: 'throbbing', label: 'Throbbing/Pulsing' },
        { value: 'cramping', label: 'Cramping' },
        { value: 'pressure', label: 'Pressure/Tightness' }
      ],
      framework: 'SOCRATES',
      component: 'Character'
    },
    // SOCRATES: Radiation
    {
      id: 'radiation',
      question: 'Do the symptoms spread anywhere else in your body?',
      type: 'radio',
      options: [
        { value: 'no', label: 'No, stays in one place' },
        { value: 'yes_nearby', label: 'Yes, spreads to nearby areas' },
        { value: 'yes_distant', label: 'Yes, spreads to distant areas' }
      ],
      framework: 'SOCRATES',
      component: 'Radiation'
    },
    // SOCRATES: Associations
    {
      id: 'associations',
      question: 'Are there any other symptoms you\'re experiencing?',
      type: 'multiselect',
      options: [
        { value: 'nausea', label: 'Nausea/Vomiting' },
        { value: 'sweating', label: 'Sweating' },
        { value: 'breathlessness', label: 'Breathlessness' },
        { value: 'dizziness', label: 'Dizziness/Lightheadedness' },
        { value: 'fatigue', label: 'Fatigue/Weakness' },
        { value: 'fever', label: 'Fever/Chills' },
        { value: 'none', label: 'None of these' }
      ],
      framework: 'SOCRATES',
      component: 'Associations'
    },
    // SOCRATES: Timing
    {
      id: 'timing',
      question: 'How often do these symptoms occur?',
      type: 'radio',
      options: [
        { value: 'constant', label: 'Constantly present' },
        { value: 'intermittent', label: 'Comes and goes' },
        { value: 'specific_times', label: 'Only at specific times (e.g., morning, night)' },
        { value: 'triggered', label: 'Only with certain activities' }
      ],
      framework: 'SOCRATES',
      component: 'Timing'
    },
    // SOCRATES: Exacerbating/Relieving
    {
      id: 'exacerbating',
      question: 'What makes your symptoms better or worse?',
      type: 'multiselect',
      options: [
        { value: 'rest', label: 'Rest makes it better' },
        { value: 'activity', label: 'Activity/movement makes it worse' },
        { value: 'food', label: 'Related to eating' },
        { value: 'position', label: 'Related to body position' },
        { value: 'medication', label: 'Medication helps' },
        { value: 'nothing', label: 'Nothing seems to affect it' }
      ],
      framework: 'SOCRATES',
      component: 'Exacerbating/Relieving'
    },
    // SOCRATES: Severity
    {
      id: 'severity',
      question: 'On a scale of 1-10, how severe are your symptoms right now?',
      type: 'scale',
      scaleMin: 1,
      scaleMax: 10,
      scaleLabels: { min: 'Mild', max: 'Unbearable' },
      framework: 'SOCRATES',
      component: 'Severity'
    },
    // ICE: Ideas
    {
      id: 'ice_ideas',
      question: 'What do you think might be causing these symptoms?',
      type: 'text',
      framework: 'ICE',
      component: 'Ideas'
    },
    // ICE: Concerns
    {
      id: 'ice_concerns',
      question: 'How worried are you about these symptoms?',
      type: 'scale',
      scaleMin: 1,
      scaleMax: 5,
      scaleLabels: { min: 'Not worried', max: 'Very worried' },
      framework: 'ICE',
      component: 'Concerns'
    },
    // ICE: Expectations
    {
      id: 'ice_expectations',
      question: 'What are you hoping to get from this checkup today?',
      type: 'radio',
      options: [
        { value: 'reassurance', label: 'Reassurance that it\'s nothing serious' },
        { value: 'advice', label: 'Advice on what to do next' },
        { value: 'referral', label: 'Referral to a specialist' },
        { value: 'treatment', label: 'Treatment or medication' },
        { value: 'understanding', label: 'Better understanding of my symptoms' }
      ],
      framework: 'ICE',
      component: 'Expectations'
    }
  ];
};
