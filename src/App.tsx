import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';
import { AuthGuard } from './components/auth/AuthGuard';
import { CurriculumTree } from './components/curriculum2/CurriculumTree';
import { TopicDetails } from './components/curriculum2/TopicDetails';
import { MicroLearning } from './pages/MicroLearning';
import { ContentGeneration } from './pages/ContentGeneration';
import Curriculum from './pages/Curriculum';

const queryClient = new QueryClient();

function App() {
  const [activeTab, setActiveTab] = React.useState<'curriculum' | 'generation' | 'dashboard'>('curriculum');

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthGuard>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Educational Content Management
                </h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'curriculum'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => setActiveTab('generation')}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'generation'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    AI Generation
                  </button>
                </div>
              </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 py-6">

              {activeTab === 'dashboard' ? (
                <div className="flex gap-6">
                  <CurriculumTree />
                  <div className="flex-1">
                    <MicroLearning />
                  </div>
                </div>
              ) : ( activeTab === 'generation' ? (
                <ContentGeneration />
              ) : (
                <Curriculum />
              ) )}
            </main>
          </div>
        </AuthGuard>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;