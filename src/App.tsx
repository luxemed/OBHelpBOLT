import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './pages/SplashScreen';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Medications } from './pages/Medications';
import { MedicationDetail } from './pages/MedicationDetail';
import { Placeholder } from './pages/Placeholder';
import { CalculadoraIG } from './pages/CalculadoraIG';
import { Cardiotocografia } from './pages/Cardiotocografia';
import { GuiaConduta } from './pages/GuiaConduta';
import { Ultrassonografia } from './pages/Ultrassonografia';
import { RestricaoCrescimento } from './pages/RestricaoCrescimento';
import { Cromossomopatias } from './pages/Cromossomopatias';
import { PreEclampsia } from './pages/PreEclampsia';
import { Sobre } from './pages/Sobre';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { TermosUso } from './pages/TermosUso';
import { Perfil } from './pages/Perfil';
import { Favoritos } from './pages/Favoritos';
import { RecuperarSenha } from './pages/RecuperarSenha';
import { PendingApproval } from './pages/PendingApproval';
import { AdminPanel } from './pages/AdminPanel';

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
                <Placeholder title="Identificacao" />
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
