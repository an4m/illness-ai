'use client';

import { useRouter, useParams } from 'next/navigation';
import type { RAGStatus } from '@/types/rag';

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const handleRAGSelection = (status: RAGStatus) => {
    localStorage.setItem('ragStatus', status);
    router.push('/results');
  };

  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Questions Page {slug}</h1>
      <p className='text-lg text-gray-600 mb-8'>This is where the questions will be displayed.</p>

      <div className='flex gap-4'>
        <button
          onClick={() => handleRAGSelection('green')}
          className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors'
        >
          GREEN
        </button>
        <button
          onClick={() => handleRAGSelection('amber')}
          className='px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors'
        >
          AMBER
        </button>
        <button
          onClick={() => handleRAGSelection('red')}
          className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors'
        >
          RED
        </button>
      </div>
    </div>
  );
}
