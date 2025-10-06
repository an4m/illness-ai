import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function EmergencyCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Emergency Code: {code}
          </h1>
          <p className="text-gray-600">
            This feature has not been implemented yet.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
