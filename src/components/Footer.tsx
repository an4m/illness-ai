export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm font-medium text-amber-800">
            This is a triage tool, not a diagnostic service. Always seek professional medical advice.
          </p>
        </div>
        <p className="text-sm text-slate-600">
          Built with love by{" "}
          <a
            href="https://github.com/an4m"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            an4m ❤️
          </a>
        </p>
      </div>
    </footer>
  );
}
