'use client';

import { useState } from 'react';

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h3l2-6 4 12 2-6h3"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Illness.AI</h2>
          </div>
          <a
            href="https://github.com/an4m/illness-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">View Code</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center px-6 py-12 md:py-20">
        <div className="max-w-7xl w-full">
          {/* Title & Description */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              AI-Powered Health Triage
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Your AI Powered
              <br />
              <span className="text-blue-600">Diagnostic Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A safe, structured health checkup tool for common conditions. Get guided through professional
              symptom assessment and receive appropriate care recommendations.
            </p>
          </div>

          {/* Category Selection */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">
              Select Your Health Concern
            </h2>

            {/* Disease Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🎗️</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Cancer Concerns
                    </h3>
                    <p className="text-sm text-slate-600">Screening & early detection</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🩸</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Diabetes & Blood Sugar
                    </h3>
                    <p className="text-sm text-slate-600">Type 2 / Prediabetes</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">💓</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Heart Disease & Chest Pain
                    </h3>
                    <p className="text-sm text-slate-600">Cardiovascular concerns</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🌙</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Depression & Anxiety
                    </h3>
                    <p className="text-sm text-slate-600">Mental health support</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🩺</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      High Blood Pressure
                    </h3>
                    <p className="text-sm text-slate-600">Hypertension monitoring</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🤧</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Flu & Cold Symptoms
                    </h3>
                    <p className="text-sm text-slate-600">Respiratory infections</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🧠</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      ADHD & Memory Issues
                    </h3>
                    <p className="text-sm text-slate-600">Focus & cognitive health</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🫁</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Asthma & Breathing
                    </h3>
                    <p className="text-sm text-slate-600">Respiratory conditions</p>
                  </div>
                </div>
              </button>

              <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🦴</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      Arthritis & Joint Pain
                    </h3>
                    <p className="text-sm text-slate-600">Musculoskeletal health</p>
                  </div>
                </div>
              </button>
            </div>

            {/* More Conditions Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowMore(!showMore)}
                className="w-full p-5 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{showMore ? '➖' : '➕'}</span>
                  <p className="font-semibold text-slate-800">
                    {showMore ? 'Show Less' : 'More Health Conditions'}
                  </p>
                  <svg
                    className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Additional Conditions (collapsible) */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showMore ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">💧</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        UTI & Kidney Stones
                      </h3>
                      <p className="text-sm text-slate-600">Urinary tract health</p>
                    </div>
                  </div>
                </button>

                <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🤰</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        Women's Health
                      </h3>
                      <p className="text-sm text-slate-600">PCOS / Menstrual issues</p>
                    </div>
                  </div>
                </button>

                <button className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">🩹</div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        Skin Conditions
                      </h3>
                      <p className="text-sm text-slate-600">Eczema / Rashes / Acne</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* General Option */}
            <div className="max-w-2xl mx-auto">
              <button className="w-full p-5 bg-slate-100 border border-slate-300 rounded-xl hover:bg-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">❓</span>
                  <p className="font-semibold text-slate-800">Not sure? Start with a General Checkup (GP)</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </main>
  );
}
