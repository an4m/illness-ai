'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertTriangle, AlertCircle, Phone, Calendar, MessageSquare, Copy, Check } from 'lucide-react';
import type { RAGStatus, RAGResults } from '@/types/rag';

export default function ResultsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RAGStatus>('green');
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem('ragStatus') as RAGStatus | null;
    if (savedStatus && (savedStatus === 'green' || savedStatus === 'amber' || savedStatus === 'red')) {
      setActiveTab(savedStatus);
    } else {
      // Default to green if no status or invalid status
      setActiveTab('green');
    }
  }, []);

  const copyCode = () => {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const results: RAGResults = {
    green: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Everything looks good',
      subtitle: "Your symptoms don&apos;t indicate an urgent concern",
      message: 'Based on your responses, your symptoms appear to be mild and manageable at home.',
      advice: [
        'Monitor your symptoms over the next 24-48 hours',
        'Stay hydrated and get adequate rest',
        'Over-the-counter pain relief may help if needed',
        'Maintain a healthy diet and light exercise if comfortable',
      ],
      followUp: {
        show: true,
        text: "We&apos;ll send you an SMS in 12 hours to check if your symptoms have improved.",
      },
      action: {
        text: 'If symptoms worsen, return to this app or contact NHS 111',
        buttons: [],
      },
    },
    amber: {
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      title: 'You may need further advice',
      subtitle: 'We recommend speaking to a healthcare professional',
      message: "Your symptoms require professional assessment, though they don&apos;t appear immediately life-threatening.",
      advice: [
        'Contact NHS 111 for medical advice within the next 24 hours',
        'Book a GP appointment as soon as possible',
        'Keep a symptom diary noting any changes',
        "Don&apos;t ignore worsening symptoms",
      ],
      followUp: {
        show: false,
      },
      action: {
        text: 'Recommended next steps:',
        buttons: [
          { text: 'Call NHS 111', icon: Phone, color: 'bg-amber-600 hover:bg-amber-700' },
          { text: 'Book GP Appointment', icon: Calendar, color: 'bg-blue-600 hover:bg-blue-700' },
        ],
      },
    },
    red: {
      icon: AlertCircle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: 'Urgent concern detected',
      subtitle: 'Immediate medical attention required',
      message: 'Your symptoms may indicate a serious condition requiring emergency care.',
      advice: [
        'Stay calm and call 999 immediately',
        'Do not drive yourself to hospital',
        'Have someone stay with you if possible',
        'Keep your phone nearby for emergency services',
      ],
      redFlags: ['Severe crushing chest pain radiating to arm/jaw', 'Difficulty breathing', 'Pain score: 8/10'],
      emergencyCode: 'HC-247XK',
      followUp: {
        show: false,
      },
      action: {
        text: 'Call 999 immediately',
        urgentText: 'This is a medical emergency. Do not delay.',
        buttons: [],
      },
    },
  };

  const current = results[activeTab];
  const Icon = current.icon;

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Result Card */}
        <div className={`bg-white rounded-b-xl shadow-xl overflow-hidden border-t-8 ${current.borderColor}`}>
          {/* Header */}
          <div className={`${current.bgColor} p-8 border-b ${current.borderColor}`}>
            <div className='flex items-center mb-4'>
              <Icon className={`w-16 h-16 ${current.iconColor} mr-4`} />
              <div>
                <h2 className='text-3xl font-bold text-gray-800'>{current.title}</h2>
                <p className='text-gray-600 mt-1'>{current.subtitle}</p>
              </div>
            </div>
            <p className='text-gray-700 text-lg'>{current.message}</p>
          </div>

          {/* Red Flags (RED only) */}
          {activeTab === 'red' && current.redFlags && (
            <div className='p-6 bg-red-50 border-b border-red-200'>
              <h3 className='font-semibold text-red-800 mb-3'>⚠️ Red flags identified:</h3>
              <ul className='space-y-2'>
                {current.redFlags.map((flag, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-red-500 mr-2'>•</span>
                    <span className='text-red-700'>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Advice Section */}
          <div className='p-8'>
            <h3 className='font-semibold text-gray-800 text-lg mb-4'>
              {activeTab === 'red' ? 'While waiting for emergency services:' : 'Recommended actions:'}
            </h3>
            <ul className='space-y-3'>
              {current.advice &&
                current.advice.map((item, index) => (
                  <li key={index} className='flex items-start'>
                    <CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Emergency Code (RED only) */}
          {activeTab === 'red' && current.emergencyCode && (
            <div className='p-6 bg-gray-50 border-t border-gray-200'>
              <h3 className='font-semibold text-gray-800 mb-3'>Emergency Consultation Code:</h3>
              <div className='flex items-center gap-3'>
                <div className='flex-1 bg-white border-2 border-gray-300 rounded-lg p-4'>
                  <p className='text-3xl font-mono font-bold text-center text-gray-800'>{current.emergencyCode}</p>
                </div>
                <button
                  onClick={copyCode}
                  className='px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2'
                >
                  {codeCopied ? <Check className='w-5 h-5' /> : <Copy className='w-5 h-5' />}
                  {codeCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className='text-sm text-gray-600 mt-3'>
                📱 Share this code with 999 operators. They can access your full symptom summary at:
                <span className='font-mono bg-gray-200 px-2 py-1 rounded ml-1'>healthapp.com/emergency/{current.emergencyCode}</span>
              </p>
            </div>
          )}

          {/* Follow-up (GREEN only) */}
          {current.followUp.show && (
            <div className='p-6 bg-blue-50 border-t border-blue-200'>
              <div className='flex items-start'>
                <MessageSquare className='w-6 h-6 text-blue-600 mr-3 mt-1' />
                <div>
                  <h3 className='font-semibold text-blue-800 mb-2'>12-Hour Follow-Up</h3>
                  <p className='text-blue-700'>{current.followUp.text}</p>
                  <p className='text-sm text-blue-600 mt-2'>Reply YES if improved, NO if symptoms worsen (we&apos;ll escalate to AMBER/RED if needed)</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='p-8 bg-gray-50 border-t border-gray-200'>
            <p className='text-gray-700 font-semibold mb-4'>{current.action.text}</p>
            {activeTab === 'red' && (
              <div className='space-y-3'>
                <button className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3 text-lg'>
                  <Phone className='w-6 h-6' />
                  Call 999 Now
                </button>
                <p className='text-center text-red-700 font-semibold'>{current.action.urgentText}</p>
              </div>
            )}
            {current.action.buttons && current.action.buttons.length > 0 && (
              <div className='flex gap-4'>
                {current.action.buttons.map((button, index) => {
                  const ButtonIcon = button.icon;
                  return (
                    <button
                      key={index}
                      className={`flex-1 ${button.color} text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2`}
                    >
                      <ButtonIcon className='w-5 h-5' />
                      {button.text}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className='mt-4 text-center text-sm text-gray-500'>Consultation completed: {new Date().toLocaleString('en-GB')}</div>
      </div>
    </div>
  );
}
