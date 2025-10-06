'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import type { RAGStatus } from '@/types/rag';
import { getGeneralQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = getGeneralQuestions(slug);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // For now, randomly assign a RAG status for testing
      // Later this will be determined by the AI API
      const ragStatuses: RAGStatus[] = ['green', 'amber', 'red'];
      const randomStatus = ragStatuses[Math.floor(Math.random() * ragStatuses.length)];

      localStorage.setItem('ragStatus', randomStatus);
      localStorage.setItem('consultationAnswers', JSON.stringify(answers));
      router.push('/results');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
    } else {
      console.log('Already at first question');
    }
  };

  const renderQuestionInput = (question: Question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'radio':
        return (
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
            {question.options?.map(option => (
              <div key={option.value} className='flex items-center space-x-3'>
                <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className='text-base font-normal cursor-pointer flex-1 text-gray-500'>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'scale':
        return (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              {Array.from({ length: question.scaleMax! - question.scaleMin! + 1 }, (_, i) => {
                const value = question.scaleMin! + i;
                const isSelected = currentAnswer === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 scale-110'
                        : 'border-gray-300 hover:border-blue-400 hover:scale-105 text-gray-500'
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className='flex justify-between text-sm text-gray-500'>
              <span>{question.scaleLabels?.min}</span>
              <span>{question.scaleLabels?.max}</span>
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <div className='space-y-3'>
            {question.options?.map(option => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id={option.value}
                  checked={currentAnswer?.includes(option.value) || false}
                  onChange={e => {
                    const newValue = currentAnswer || [];
                    if (e.target.checked) {
                      handleAnswer([...newValue, option.value]);
                    } else {
                      handleAnswer(newValue.filter((v: string) => v !== option.value));
                    }
                  }}
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600'
                />
                <Label htmlFor={option.value} className='text-base font-normal cursor-pointer flex-1 py-2 text-gray-500'>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={currentAnswer || ''}
            onChange={e => handleAnswer(e.target.value)}
            className='w-full min-h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-500'
            placeholder='Type your answer here...'
          />
        );

      default:
        return null;
    }
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiselect') {
      return answer && answer.length > 0;
    }
    if (currentQuestion.type === 'text') {
      return answer && answer.trim().length > 0;
    }
    return answer !== undefined && answer !== null;
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-3xl mx-auto'>
        {/* Progress bar */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm font-medium text-gray-700'>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className='text-sm text-gray-600'>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question card */}
        <Card>
          <CardHeader>
            <div className='mb-3'>
              <span className='text-xs font-semibold text-blue-600 uppercase tracking-wide'>
                {currentQuestion.framework} - {currentQuestion.component}
              </span>
            </div>
            <CardTitle className='text-3xl mb-3 text-gray-600'>{currentQuestion.question}</CardTitle>
            <CardDescription className='text-base text-gray-400'>
              Please answer as accurately as possible to help us understand your symptoms
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderQuestionInput(currentQuestion)}

            {/* Navigation buttons */}
            <div className='flex justify-between mt-8 pt-6 border-t'>
              <Button variant='outline' onClick={handleBack} disabled={currentQuestionIndex === 0} type='button' className='text-gray-700'>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!isAnswered()} type='button'>
                {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Helper text */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>⚠️ This tool does not diagnose. It provides guidance on next steps based on your symptoms.</p>
        </div>
      </div>
    </div>
  );
}
