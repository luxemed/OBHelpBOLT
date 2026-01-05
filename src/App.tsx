import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './pages/SplashScreen';

const Welcome = lazy(() => import('./pages/Welcome').then(m => ({ default: m.Welcome })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
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
const Perfil = lazy(() => import('./pages/Perfil').then(m => ({ default: m.Perfil })));
const Favoritos = lazy(() => import('./pages/Favoritos').then(m => ({ default: m.Favoritos })));
const RecuperarSenha = lazy(() => import('./pages/RecuperarSenha').then(m => ({ default: m.RecuperarSenha })));
const PendingApproval = lazy(() => import('./pages/PendingApproval').then(m => ({ default: m.PendingApproval })));
const AdminPanel = lazy(() => import('./pages/AdminPanel').then(m => ({ default: m.AdminPanel })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f5f7fa] dark:bg-gray-900">
    <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <div className="antialiased text-slate-900 dark:text-white">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<RecuperarSenha />} />
              <Route path="/pending-approval" element={<PendingApproval />} />
              
              <Route path="/termos" element={<TermosUso />} />
              <Route path="/privacidade" element={<PoliticaPrivacidade />} />

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
              <Route path="/profile/terms" element={<TermosUso />} />
              <Route path="/profile/privacy" element={<PoliticaPrivacidade />} />
              <Route path="/profile/sobre" element={<Sobre />} />

              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              } />

              <Route path="/medications" element={
                <ProtectedRoute>
                  <Medications />
                </ProtectedRoute>
              } />
              <Route path="/medications/details" element={
                <ProtectedRoute>
                  <MedicationDetail />
                </ProtectedRoute>
              } />

              <Route path="/calc/ig" element={
                <ProtectedRoute>
                  <CalculadoraIG />
                </ProtectedRoute>
              } />
              <Route path="/calc/usg" element={
                <ProtectedRoute>
                  <Ultrassonografia />
                </ProtectedRoute>
              } />
              <Route path="/calc/risk-pe" element={
                <ProtectedRoute>
                  <PreEclampsia />
                </ProtectedRoute>
              } />

              <Route path="/guides" element={
                <ProtectedRoute>
                  <GuiaConduta />
                </ProtectedRoute>
              } />
              <Route path="/guides/ctg" element={
                <ProtectedRoute>
                  <Cardiotocografia />
                </ProtectedRoute>
              } />

              <Route path="/flow/ctg/start" element={
                <ProtectedRoute>
                  <Cardiotocografia />
                </ProtectedRoute>
              } />

              <Route path="/flow/pe/triagem" element={
                <ProtectedRoute>
                  <PreEclampsia />
                </ProtectedRoute>
              } />
              <Route path="/flow/rcf/data" element={
                <ProtectedRoute>
                  <RestricaoCrescimento />
                </ProtectedRoute>
              } />

              <Route path="/cromossomopatias" element={
                <ProtectedRoute>
                  <Cromossomopatias />
                </ProtectedRoute>
              } />
              <Route path="/restricao-crescimento" element={
                <ProtectedRoute>
                  <RestricaoCrescimento />
                </ProtectedRoute>
              } />
              <Route path="/pre-eclampsia" element={
                <ProtectedRoute>
                  <PreEclampsia />
                </ProtectedRoute>
              } />

              <Route path="/placeholder" element={
                <ProtectedRoute>
                  <Placeholder title="Em desenvolvimento" />
                </ProtectedRoute>
              } />
              <Route path="/wizard/id" element={
                <ProtectedRoute>
                  <Placeholder title="Identificação" />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
          <BottomNav />
        </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
