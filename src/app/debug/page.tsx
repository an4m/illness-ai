'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const exampleRequests = [
  {
    id: 1,
    name: 'Suspected Cancer - RED',
    severity: 'RED',
    data: {
      disease_type: 'Cancer Concerns',
      SOCRATES_answers: {
        site: 'Upper abdomen - large palpable mass',
        onset: 'Mass noticed 2 weeks ago, now severe pain and bleeding',
        character: 'Hard lump with severe cramping pain, rectal bleeding',
        radiation: 'Yes - pain radiating to back',
        associations: 'Unintentional weight loss (10kg in 2 months), severe fatigue, dark tarry stools, vomiting blood',
        timing: 'Constant mass, pain worsening daily, bleeding today',
        exacerbating: 'Eating, any pressure on abdomen',
        relieving: 'Nothing helps',
        severity: 8
      },
      ICE_answers: {
        ideas: 'Very worried it could be cancer',
        concerns: 5,
        expectations: 'Need urgent investigation and treatment'
      },
      red_flags: ['Palpable abdominal mass', 'Hematemesis (vomiting blood)', 'Melena (dark stools)', 'Unexplained weight loss', 'Severe pain', 'Anemia symptoms']
    }
  },
  {
    id: 2,
    name: 'Severe Chest Pain - RED',
    severity: 'RED',
    data: {
      disease_type: 'Heart Disease & Chest Pain',
      SOCRATES_answers: {
        site: 'Center of chest - crushing sensation',
        onset: 'Started 30 minutes ago',
        character: 'Crushing, heavy pressure like elephant on chest',
        radiation: 'Yes - radiating to left arm and jaw',
        associations: 'Sweating profusely, nausea, shortness of breath',
        timing: 'Continuous, getting worse',
        exacerbating: 'Any movement',
        relieving: 'Nothing helps',
        severity: 9
      },
      ICE_answers: {
        ideas: 'Think it might be a heart attack',
        concerns: 5,
        expectations: 'Need emergency care immediately'
      },
      red_flags: ['Crushing chest pain', 'Radiation to arm/jaw', 'Profuse sweating', 'Shortness of breath', 'Sudden onset']
    }
  },
  {
    id: 3,
    name: 'Severe Breathing Issues - RED',
    severity: 'RED',
    data: {
      disease_type: 'Asthma & Breathing',
      SOCRATES_answers: {
        site: 'Chest - difficulty getting air in',
        onset: 'Progressive over 2 hours',
        character: 'Cannot complete sentences, gasping, severe wheezing',
        radiation: 'No',
        associations: 'Blue lips, confusion, chest tightness',
        timing: 'Getting rapidly worse',
        exacerbating: 'Any activity, even sitting',
        relieving: 'Inhaler not helping',
        severity: 9
      },
      ICE_answers: {
        ideas: 'Severe asthma attack',
        concerns: 5,
        expectations: 'Need oxygen, emergency help'
      },
      red_flags: ['Severe breathlessness', 'Blue lips', 'Confusion', 'Cannot complete sentences', 'Rapid deterioration']
    }
  },
  {
    id: 4,
    name: 'High Blood Sugar Crisis - AMBER',
    severity: 'AMBER',
    data: {
      disease_type: 'Diabetes & Blood Sugar',
      SOCRATES_answers: {
        site: 'General systemic symptoms',
        onset: 'Over the past 24 hours',
        character: 'Extreme thirst, frequent urination, blurred vision',
        radiation: 'No',
        associations: 'Fatigue, fruity breath odor, nausea',
        timing: 'Continuous and worsening',
        exacerbating: 'Eating sugary foods',
        relieving: 'Drinking water helps slightly',
        severity: 6
      },
      ICE_answers: {
        ideas: 'Blood sugar might be very high',
        concerns: 4,
        expectations: 'Need urgent medical assessment'
      },
      red_flags: ['Extreme thirst', 'Fruity breath', 'Blurred vision', 'Rapid onset']
    }
  },
  {
    id: 5,
    name: 'Severe Depression - AMBER',
    severity: 'AMBER',
    data: {
      disease_type: 'Depression & Anxiety',
      SOCRATES_answers: {
        site: 'Mental/emotional state',
        onset: 'Worsening over past 2 months',
        character: 'Persistent low mood, loss of interest in everything',
        radiation: 'No',
        associations: 'Suicidal thoughts, not eating, not sleeping, isolated from friends',
        timing: 'All day every day',
        exacerbating: 'Being alone, nighttime',
        relieving: 'Nothing helps anymore',
        severity: 8
      },
      ICE_answers: {
        ideas: 'Severe depression',
        concerns: 5,
        expectations: 'Need urgent mental health support'
      },
      red_flags: ['Suicidal thoughts', 'Complete loss of interest', 'Social isolation', 'Not eating']
    }
  },
  {
    id: 6,
    name: 'High Blood Pressure - AMBER',
    severity: 'AMBER',
    data: {
      disease_type: 'High Blood Pressure',
      SOCRATES_answers: {
        site: 'General - blood pressure reading 180/110',
        onset: 'Discovered today at pharmacy',
        character: 'Severe headache, dizziness',
        radiation: 'No',
        associations: 'Nosebleed, visual changes, chest discomfort',
        timing: 'Constant headache for past 6 hours',
        exacerbating: 'Standing up quickly',
        relieving: 'Lying down helps slightly',
        severity: 7
      },
      ICE_answers: {
        ideas: 'Blood pressure dangerously high',
        concerns: 4,
        expectations: 'Need medical assessment today'
      },
      red_flags: ['BP 180/110', 'Nosebleed', 'Visual changes', 'Severe headache']
    }
  },
  {
    id: 7,
    name: 'Joint Pain - GREEN',
    severity: 'GREEN',
    data: {
      disease_type: 'Arthritis & Joint Pain',
      SOCRATES_answers: {
        site: 'Right knee',
        onset: 'After running 3 days ago',
        character: 'Dull ache, mild stiffness',
        radiation: 'No',
        associations: 'Slight swelling',
        timing: 'Worse in morning, improves with movement',
        exacerbating: 'Going up stairs',
        relieving: 'Rest, ice, ibuprofen',
        severity: 3
      },
      ICE_answers: {
        ideas: 'Overuse injury from running',
        concerns: 2,
        expectations: 'Advice on recovery and prevention'
      },
      red_flags: []
    }
  },
  {
    id: 8,
    name: 'Mild Anxiety - GREEN',
    severity: 'GREEN',
    data: {
      disease_type: 'Depression & Anxiety',
      SOCRATES_answers: {
        site: 'General anxiety, chest tightness',
        onset: 'Past month, work stress',
        character: 'Racing thoughts, restlessness',
        radiation: 'No',
        associations: 'Difficulty sleeping, mild palpitations',
        timing: 'Mainly evenings and before sleep',
        exacerbating: 'Work deadlines, caffeine',
        relieving: 'Exercise, meditation, talking to friends',
        severity: 4
      },
      ICE_answers: {
        ideas: 'Work stress causing anxiety',
        concerns: 2,
        expectations: 'Self-help strategies and lifestyle advice'
      },
      red_flags: []
    }
  },
  {
    id: 9,
    name: 'Skin Rash - GREEN',
    severity: 'GREEN',
    data: {
      disease_type: 'Skin Conditions',
      SOCRATES_answers: {
        site: 'Inner elbows and knees',
        onset: 'Noticed 1 week ago',
        character: 'Dry, slightly itchy patches',
        radiation: 'No',
        associations: 'Slight redness, no pain',
        timing: 'Constant, slightly itchy at night',
        exacerbating: 'Hot showers, wool clothing',
        relieving: 'Moisturizer helps',
        severity: 2
      },
      ICE_answers: {
        ideas: 'Maybe eczema or dry skin',
        concerns: 1,
        expectations: 'Skincare advice and recommendations'
      },
      red_flags: []
    }
  }
];

export default function DebugPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestRequest = async (example: typeof exampleRequests[0]) => {
    setLoading(example.id);
    setError(null);

    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(example.data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Store result in localStorage for the results page
      localStorage.setItem('triageResult', JSON.stringify(result));
      localStorage.setItem('ragStatus', result.ragStatus);

      // Redirect to results page
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Triage API Debug Page</h1>
            <p className="text-gray-600">
              Test the triage API with pre-configured examples covering RED, AMBER, and GREEN outcomes.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exampleRequests.map((example) => (
              <div
                key={example.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4"
                style={{
                  borderLeftColor:
                    example.severity === 'RED'
                      ? '#EF4444'
                      : example.severity === 'AMBER'
                      ? '#F59E0B'
                      : '#10B981',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {example.name}
                  </h3>
                  <span
                    className="px-2 py-1 text-xs font-bold rounded"
                    style={{
                      backgroundColor:
                        example.severity === 'RED'
                          ? '#FEE2E2'
                          : example.severity === 'AMBER'
                          ? '#FEF3C7'
                          : '#D1FAE5',
                      color:
                        example.severity === 'RED'
                          ? '#991B1B'
                          : example.severity === 'AMBER'
                          ? '#92400E'
                          : '#065F46',
                    }}
                  >
                    {example.severity}
                  </span>
                </div>

                <div className="mb-4 text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Disease:</strong> {example.data.disease_type}
                  </p>
                  <p>
                    <strong>Main Symptom:</strong>{' '}
                    {example.data.SOCRATES_answers.character}
                  </p>
                  <p>
                    <strong>Severity:</strong> {example.data.SOCRATES_answers.severity}/10
                  </p>
                  <p>
                    <strong>Concern Level:</strong> {example.data.ICE_answers.concerns}/5
                  </p>
                  {example.data.red_flags.length > 0 && (
                    <p>
                      <strong>Red Flags:</strong> {example.data.red_flags.length}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleTestRequest(example)}
                  disabled={loading !== null}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading === example.id ? 'Processing...' : 'Test Request'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
