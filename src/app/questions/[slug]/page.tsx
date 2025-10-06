export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Questions Page {slug}</h1>
      <p className='text-lg text-gray-600'>This is where the questions will be displayed.</p>
    </div>
  );
}
