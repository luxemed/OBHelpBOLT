import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './pages/SplashScreen';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { Favoritos } from './pages/Favoritos';

const Medications = lazy(() => import('./pages/Medications').then(m => ({ default: m.Medications })));
const MedicationDetail = lazy(() => import('./pages/MedicationDetail').then(m => ({ default: m.MedicationDetail })));
const Placeholder = lazy(() => import('./pages/Placeholder').then(m => ({ default: m.Placeholder })));
const CalculadoraIG = lazy(() => import('./pages/CalculadoraIG').then(m => ({ default: m.CalculadoraIG })));
const Cardiotocografia = lazy(() => import('./pages/Cardiotocografia').then(m => ({ default: m.Cardiotocografia })));
const GuiaConduta = lazy(() => import('./pages/GuiaConduta').then(m => ({ default: m.GuiaConduta })));
const Ultrassonografia = lazy(() => import('./pages/Ultrassonografia').then(m => ({ default: m.Ultrassonografia })));
const RestricaoCrescimento = lazy(() => import('./pages/RestricaoCrescimento').then(m => ({ default: m.RestricaoCrescimento })));
const Cromossomopatias = lazy(() => import('./pages/Cromossomopatias').then(m => ({ default: m.Cromossomopatias })));
const PreEclampsia = lazy(() => import('./pages/PreEclampsia').then(m => ({ default: m.PreEclampsia })));
const Sobre = lazy(() => import('./pages/Sobre').then(m => ({ default: m.Sobre })));
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade').then(m => ({ default: m.PoliticaPrivacidade })));
const TermosUso = lazy(() => import('./pages/TermosUso').then(m => ({ default: m.TermosUso })));
const RecuperarSenha = lazy(() => import('./pages/RecuperarSenha').then(m => ({ default: m.RecuperarSenha })));
const PendingApproval = lazy(() => import('./pages/PendingApproval').then(m => ({ default: m.PendingApproval })));
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(m => ({ default: m.AdminPanel })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <span className="text-sm text-gray-500 dark:text-gray-400">Carregando...</span>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <div className="antialiased text-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={
              <Suspense fallback={<PageLoader />}><RecuperarSenha /></Suspense>
            } />
            <Route path="/pending-approval" element={
              <Suspense fallback={<PageLoader />}><PendingApproval /></Suspense>
            } />
            
            <Route path="/termos" element={
              <Suspense fallback={<PageLoader />}><TermosUso /></Suspense>
            } />
            <Route path="/privacidade" element={
              <Suspense fallback={<PageLoader />}><PoliticaPrivacidade /></Suspense>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
            <Route path="/profile/terms" element={
              <Suspense fallback={<PageLoader />}><TermosUso /></Suspense>
            } />
            <Route path="/profile/privacy" element={
              <Suspense fallback={<PageLoader />}><PoliticaPrivacidade /></Suspense>
            } />
            <Route path="/profile/sobre" element={
              <Suspense fallback={<PageLoader />}><Sobre /></Suspense>
            } />

            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <Suspense fallback={<PageLoader />}><AdminPanel /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/medications" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Medications /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/medications/details" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><MedicationDetail /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/calc/ig" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><CalculadoraIG /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/calc/usg" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Ultrassonografia /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/calc/risk-pe" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><PreEclampsia /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/guides" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><GuiaConduta /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/guides/ctg" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Cardiotocografia /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/flow/ctg/start" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Cardiotocografia /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/flow/pe/triagem" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><PreEclampsia /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/flow/rcf/data" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><RestricaoCrescimento /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/cromossomopatias" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Cromossomopatias /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/restricao-crescimento" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><RestricaoCrescimento /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/pre-eclampsia" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><PreEclampsia /></Suspense>
              </ProtectedRoute>
            } />

            <Route path="/placeholder" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Placeholder title="Em desenvolvimento" /></Suspense>
              </ProtectedRoute>
            } />
            <Route path="/wizard/id" element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}><Placeholder title="Identificação" /></Suspense>
              </ProtectedRoute>
            } />
          </Routes>
          <BottomNav />
        </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
