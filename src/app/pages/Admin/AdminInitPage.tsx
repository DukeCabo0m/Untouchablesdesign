import { useState } from 'react';
import { initApi, authApi, statsApi } from '../../utils/api';
import { publicAnonKey } from '/utils/supabase/info';

export function AdminInitPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>('');
  const [healthCheck, setHealthCheck] = useState<string>('');

  async function handleSeedDatabase() {
    setLoading(true);
    setMessage('⏳ Initialisation en cours...');
    console.log('[SEED] Starting database seeding...');
    
    try {
      console.log('[SEED] Calling initApi.seedDatabase()...');
      const result = await initApi.seedDatabase();
      console.log('[SEED] Success! Result:', result);
      
      setMessage(`✅ ${result.message}`);
      
      if (result.stats) {
        console.log('[SEED] Stats:', result.stats);
        setMessage(`✅ ${result.message}\n📊 Créé: ${result.stats.users} users, ${result.stats.articles} articles, ${result.stats.albums} albums, ${result.stats.concerts} concerts, ${result.stats.comments} comments`);
      }
      
      // Don't load stats yet - need to login first
    } catch (error: any) {
      console.error('[SEED] Error details:', error);
      setMessage(`❌ Erreur: ${error.message}`);
      
      // Show more detailed error info
      if (error.message.includes('401')) {
        setMessage(`❌ Erreur 401: Le serveur Supabase n'est pas accessible ou nécessite une configuration. Vérifiez que le serveur Edge Function est déployé.`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function testHealthCheck() {
    setHealthCheck('⏳ Test en cours...');
    console.log('[HEALTH CHECK] Starting test...');
    console.log('[HEALTH CHECK] Using publicAnonKey:', publicAnonKey.substring(0, 20) + '...');
    
    try {
      const response = await fetch('https://kuardczdmvagzgszydco.supabase.co/functions/v1/make-server-d462d5d8/health', {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      console.log('[HEALTH CHECK] Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('[HEALTH CHECK] Response data:', data);
        setHealthCheck(`✅ Serveur accessible: ${JSON.stringify(data)}`);
      } else {
        const errorText = await response.text();
        console.error('[HEALTH CHECK] Error response:', errorText);
        setHealthCheck(`❌ Erreur HTTP ${response.status}: ${errorText}`);
      }
    } catch (error: any) {
      console.error('[HEALTH CHECK] Network error:', error);
      setHealthCheck(`❌ Erreur réseau: ${error.message}`);
    }
  }

  async function loadStats() {
    try {
      const data = await statsApi.getDashboard();
      setStats(data);
    } catch (error: any) {
      console.error('Stats error:', error);
    }
  }

  async function testLogin() {
    setTestResult('');
    try {
      const result = await authApi.login('admin@untouchables.fr', 'admin123');
      setTestResult(`✅ Login réussi ! User: ${result.user.username}`);
      console.log('Login result:', result);
      
      // Load stats after login
      await loadStats();
    } catch (error: any) {
      setTestResult(`❌ Erreur login: ${error.message}`);
      console.error('Login error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F0F0F0] mb-2" style={{ fontFamily: 'monospace' }}>
            [INIT] Backend Initialization
          </h1>
          <p className="text-sm text-[#808080]" style={{ fontFamily: 'monospace' }}>
            Initialize database with test data and verify backend connectivity
          </p>
        </div>

        {/* Health Check Section */}
        <div className="mb-8 bg-[#0A0A0A] border border-[#8B0000] p-6">
          <h2 className="text-lg font-bold text-[#8B0000] mb-4" style={{ fontFamily: 'monospace' }}>
            {'>'} STEP 0: Health Check (Optional)
          </h2>
          <p className="text-xs text-[#808080] mb-4" style={{ fontFamily: 'monospace' }}>
            Test if the Supabase Edge Function server is accessible
          </p>
          
          <button
            onClick={testHealthCheck}
            className="bg-[#8B0000] text-[#F0F0F0] px-6 py-2 text-sm font-bold hover:bg-[#6B0000]"
            style={{ fontFamily: 'monospace' }}
          >
            [TEST SERVER]
          </button>

          {healthCheck && (
            <div className="mt-4 p-3 bg-[#0A0A0A] border border-[#808080]">
              <p className="text-xs text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>
                {healthCheck}
              </p>
            </div>
          )}
        </div>

        {/* Seed Database Section */}
        <div className="mb-8 bg-[#0A0A0A] border border-[#8B0000] p-6">
          <h2 className="text-lg font-bold text-[#8B0000] mb-4" style={{ fontFamily: 'monospace' }}>
            {'>'} STEP 1: Seed Database
          </h2>
          <p className="text-xs text-[#808080] mb-4" style={{ fontFamily: 'monospace' }}>
            This will create initial data:
            <br />- 5 users (including admin)
            <br />- 3 albums
            <br />- 4 articles
            <br />- 4 concerts
            <br />- 5 comments
          </p>
          
          <button
            onClick={handleSeedDatabase}
            disabled={loading}
            className="bg-[#8B0000] text-[#F0F0F0] px-6 py-2 text-sm font-bold hover:bg-[#6B0000] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'monospace' }}
          >
            {loading ? '[LOADING...]' : '[INITIALIZE DATABASE]'}
          </button>

          {message && (
            <div className="mt-4 p-3 bg-[#0A0A0A] border border-[#808080]">
              <p className="text-xs text-[#F0F0F0] whitespace-pre-line" style={{ fontFamily: 'monospace' }}>
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Test Login Section */}
        <div className="mb-8 bg-[#0A0A0A] border border-[#8B0000] p-6">
          <h2 className="text-lg font-bold text-[#8B0000] mb-4" style={{ fontFamily: 'monospace' }}>
            {'>'} STEP 2: Test Admin Login
          </h2>
          <div className="mb-4 p-3 bg-[#0A0A0A] border border-[#808080]">
            <p className="text-xs text-[#F0F0F0] mb-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-[#8B0000]">Email:</span> admin@untouchables.fr
            </p>
            <p className="text-xs text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>
              <span className="text-[#8B0000]">Password:</span> admin123
            </p>
          </div>
          
          <button
            onClick={testLogin}
            className="bg-[#8B0000] text-[#F0F0F0] px-6 py-2 text-sm font-bold hover:bg-[#6B0000]"
            style={{ fontFamily: 'monospace' }}
          >
            [TEST LOGIN]
          </button>

          {testResult && (
            <div className="mt-4 p-3 bg-[#0A0A0A] border border-[#808080]">
              <p className="text-xs text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>
                {testResult}
              </p>
            </div>
          )}
        </div>

        {/* Stats Display */}
        {stats && (
          <div className="bg-[#0A0A0A] border border-[#8B0000] p-6">
            <h2 className="text-lg font-bold text-[#8B0000] mb-4" style={{ fontFamily: 'monospace' }}>
              {'>'} DATABASE STATS
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Total Users</p>
                <p className="text-2xl font-bold text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Total Articles</p>
                <p className="text-2xl font-bold text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>{stats.totalArticles}</p>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Total Albums</p>
                <p className="text-2xl font-bold text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>{stats.totalAlbums}</p>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Total Concerts</p>
                <p className="text-2xl font-bold text-[#F0F0F0]" style={{ fontFamily: 'monospace' }}>{stats.totalConcerts}</p>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Active Users</p>
                <p className="text-2xl font-bold text-[#8B0000]" style={{ fontFamily: 'monospace' }}>{stats.activeUsers}</p>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#808080]">
                <p className="text-xs text-[#808080] mb-1" style={{ fontFamily: 'monospace' }}>Upcoming Concerts</p>
                <p className="text-2xl font-bold text-[#8B0000]" style={{ fontFamily: 'monospace' }}>{stats.upcomingConcerts}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-[#0A0A0A] border border-[#808080]">
          <h3 className="text-sm font-bold text-[#8B0000] mb-2" style={{ fontFamily: 'monospace' }}>
            {'>'} INSTRUCTIONS
          </h3>
          <ol className="text-xs text-[#808080] space-y-2" style={{ fontFamily: 'monospace' }}>
            <li>1. Click [INITIALIZE DATABASE] to create test data</li>
            <li>2. Click [TEST LOGIN] to verify authentication works</li>
            <li>3. Check browser console for detailed logs</li>
            <li>4. If successful, go to /admin/login to access the cPanel</li>
          </ol>
        </div>

        {/* Documentation Link */}
        <div className="mt-4 text-center">
          <p className="text-xs text-[#808080]" style={{ fontFamily: 'monospace' }}>
            📚 See <span className="text-[#8B0000]">BACKEND_GUIDE.md</span> for complete documentation
          </p>
        </div>
      </div>
    </div>
  );
}