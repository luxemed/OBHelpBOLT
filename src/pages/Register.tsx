import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const estados = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapa' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceara' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espirito Santo' },
  { sigla: 'GO', nome: 'Goias' },
  { sigla: 'MA', nome: 'Maranhao' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Para' },
  { sigla: 'PB', nome: 'Paraiba' },
  { sigla: 'PR', nome: 'Parana' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piaui' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondonia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'Sao Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

const especialidades = [
  'Generalista',
  'Ginecologia e Obstetricia',
  'Medicina Fetal',
  'Cirurgia Geral',
  'Clinica Medica',
  'Pediatria',
  'Neonatologia',
  'Anestesiologia',
  'Cardiologia',
  'Endocrinologia',
  'Medicina de Familia e Comunidade',
  'Medicina Intensiva',
  'Mastologia',
  'Uroginecologia',
  'Reproducao Humana',
  'Enfermagem Obstetrica',
  'Residente',
  'Estudante de Medicina',
  'Outra'
];

const capitais: { [key: string]: string } = {
  'AC': 'Rio Branco', 'AL': 'Maceio', 'AP': 'Macapa', 'AM': 'Manaus',
  'BA': 'Salvador', 'CE': 'Fortaleza', 'DF': 'Brasilia', 'ES': 'Vitoria',
  'GO': 'Goiania', 'MA': 'Sao Luis', 'MT': 'Cuiaba', 'MS': 'Campo Grande',
  'MG': 'Belo Horizonte', 'PA': 'Belem', 'PB': 'Joao Pessoa', 'PR': 'Curitiba',
  'PE': 'Recife', 'PI': 'Teresina', 'RJ': 'Rio de Janeiro', 'RN': 'Natal',
  'RS': 'Porto Alegre', 'RO': 'Porto Velho', 'RR': 'Boa Vista', 'SC': 'Florianopolis',
  'SP': 'Sao Paulo', 'SE': 'Aracaju', 'TO': 'Palmas'
};

export const Register = () => {
  const navigate = useNavigate();
  const { signUp, user, loading: authLoading } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [cidadeInput, setCidadeInput] = useState('');
  const [cidades, setCidades] = useState<string[]>([]);
  const [cidadesFiltradas, setCidadesFiltradas] = useState<string[]>([]);
  const [carregandoCidades, setCarregandoCidades] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const [aceite1, setAceite1] = useState(false);
  const [aceite2, setAceite2] = useState(false);
  const [aceite3, setAceite3] = useState(false);
  const [aceite4, setAceite4] = useState(false);
  const [aceite5, setAceite5] = useState(false);

  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const todosAceites = aceite1 && aceite2 && aceite3 && aceite4 && aceite5;
  const camposObrigatorios = nome.trim() && email.trim() && senha.trim() && senha.length >= 6;
  const podeEnviar = todosAceites && camposObrigatorios && !carregando;

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/pending-approval');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (estado) {
      setCarregandoCidades(true);
      setCidades([]);
      setCidade('');
      setCidadeInput('');
      
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then(res => res.json())
        .then(data => {
          const nomes = data.map((m: { nome: string }) => m.nome).sort((a: string, b: string) => a.localeCompare(b));
          const capital = capitais[estado];
          const cidadesOrdenadas = capital 
            ? [capital, ...nomes.filter((c: string) => c !== capital)]
            : nomes;
          setCidades(cidadesOrdenadas);
          setCarregandoCidades(false);
        })
        .catch(() => {
          setCidades([]);
          setCarregandoCidades(false);
        });
    } else {
      setCidades([]);
    }
  }, [estado]);

  useEffect(() => {
    if (cidadeInput.length >= 1) {
      const filtro = cidadeInput.toLowerCase();
      const filtradas = cidades.filter(c => c.toLowerCase().includes(filtro)).slice(0, 10);
      setCidadesFiltradas(filtradas);
      setMostrarSugestoes(filtradas.length > 0);
    } else {
      setCidadesFiltradas(cidades.slice(0, 10));
      setMostrarSugestoes(false);
    }
  }, [cidadeInput, cidades]);

  const handleEstadoChange = (uf: string) => {
    setEstado(uf);
    setCidade('');
    setCidadeInput('');
  };

  const handleCidadeSelect = (cidadeSelecionada: string) => {
    setCidade(cidadeSelecionada);
    setCidadeInput(cidadeSelecionada);
    setMostrarSugestoes(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!podeEnviar) return;

    setErro('');
    setCarregando(true);

    const { error } = await signUp(email, senha, {
      nome,
      especialidade,
      estado,
      cidade,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        setErro('Este email ja esta cadastrado. Tente fazer login.');
      } else {
        setErro('Erro ao criar conta. Tente novamente.');
      }
      setCarregando(false);
    } else {
      setSucesso(true);
    }
  };

  if (sucesso) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-[#f5f7fa] overflow-x-hidden justify-center items-center p-4">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center pt-8 pb-4">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h1 className="text-[#121417] tracking-tight text-2xl font-bold leading-tight text-center">
              Conta criada com sucesso!
            </h1>
            <p className="text-[#677283] text-base font-normal leading-normal pt-2 text-center px-4">
              Verifique seu email para confirmar o cadastro.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <p className="text-gray-600 text-sm text-center">
              Enviamos um link de confirmacao para <strong>{email}</strong>. 
              Clique no link para ativar sua conta.
            </p>
            <p className="text-gray-500 text-xs text-center">
              Nao recebeu o email? Verifique sua caixa de spam ou lixo eletronico.
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-xl h-14 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-all shadow-md"
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f5f7fa] overflow-x-hidden pb-8">
      <div className="w-full max-w-[480px] mx-auto flex flex-col gap-5 px-4 pt-6">
        <div className="flex flex-col items-center justify-center pb-2">
          <h1 className="text-[#121417] tracking-tight text-2xl font-bold leading-tight text-center">
            Criar sua conta
          </h1>
          <p className="text-[#677283] text-sm font-normal leading-normal pt-1 text-center">
            Cadastre-se no OBHelp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          {erro && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm text-red-600 text-center">{erro}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[#121417] text-sm font-medium">Nome completo *</label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Seu nome completo"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#121417] text-sm font-medium">E-mail *</label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#121417] text-sm font-medium">Senha * (minimo 6 caracteres)</label>
            <input
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Crie uma senha segura"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#121417] text-sm font-medium">
              Especialidade medica <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            >
              <option value="">Selecione sua especialidade</option>
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#121417] text-sm font-medium">
              Estado <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={estado}
              onChange={(e) => handleEstadoChange(e.target.value)}
            >
              <option value="">Selecione o estado</option>
              {estados.map((e) => (
                <option key={e.sigla} value={e.sigla}>{e.sigla} - {e.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[#121417] text-sm font-medium">
              Cidade <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              ref={inputRef}
              className="w-full rounded-xl border border-gray-200 bg-white h-11 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder={carregandoCidades ? 'Carregando...' : estado ? 'Digite para buscar...' : 'Selecione o estado primeiro'}
              type="text"
              value={cidadeInput}
              onChange={(e) => {
                setCidadeInput(e.target.value);
                setCidade('');
                setMostrarSugestoes(true);
              }}
              onFocus={() => {
                if (cidades.length > 0) {
                  setCidadesFiltradas(cidades.slice(0, 10));
                  setMostrarSugestoes(true);
                }
              }}
              onBlur={() => setTimeout(() => setMostrarSugestoes(false), 200)}
              disabled={!estado || carregandoCidades}
            />
            {mostrarSugestoes && cidadesFiltradas.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                {cidadesFiltradas.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 ${
                      i === 0 && c === capitais[estado] ? 'font-semibold text-blue-600' : 'text-gray-700'
                    } ${i === 0 ? 'rounded-t-xl' : ''} ${i === cidadesFiltradas.length - 1 ? 'rounded-b-xl' : ''}`}
                    onMouseDown={() => handleCidadeSelect(c)}
                  >
                    {c}
                    {i === 0 && c === capitais[estado] && (
                      <span className="ml-2 text-xs text-blue-500">(Capital)</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 -mt-1">
            Cidade e estado sao informacoes declaradas pelo usuario e utilizadas apenas para fins de organizacao e contexto profissional.
          </p>
        </form>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Declaracoes obrigatorias</h3>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceite1}
              onChange={(e) => setAceite1(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              Declaro que sou profissional de saude legalmente habilitado.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceite2}
              onChange={(e) => setAceite2(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              Estou ciente de que o OBHelp e uma ferramenta de apoio a decisao clinica e nao substitui o julgamento medico, a avaliacao presencial ou protocolos institucionais.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceite3}
              onChange={(e) => setAceite3(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              Reconheco que toda conduta clinica, prescricao ou decisao tomada com apoio do OBHelp e de minha exclusiva responsabilidade.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceite4}
              onChange={(e) => setAceite4(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              Comprometo-me a nao inserir dados identificaveis de pacientes no aplicativo.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aceite5}
              onChange={(e) => setAceite5(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700 leading-relaxed">
              Li e concordo com os{' '}
              <Link to="/termos" className="text-blue-500 underline hover:text-blue-600">
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link to="/privacidade" className="text-blue-500 underline hover:text-blue-600">
                Politica de Privacidade
              </Link>.
            </span>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!podeEnviar}
          className={`w-full rounded-xl h-14 text-base font-bold transition-all shadow-md ${
            podeEnviar
              ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {carregando ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            'Criar conta'
          )}
        </button>

        <div className="flex flex-col items-center gap-3 py-2">
          <p className="text-[#677283] text-sm font-normal text-center">
            Ja tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
          <p className="text-xs text-amber-800 text-center leading-relaxed">
            O OBHelp e destinado exclusivamente a profissionais de saude. O uso indevido do aplicativo e de responsabilidade do usuario.
          </p>
        </div>

        <div className="text-center pt-4 pb-2">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
            <Link to="/termos" className="hover:text-gray-600 transition-colors">Termos</Link>
            <span>•</span>
            <Link to="/privacidade" className="hover:text-gray-600 transition-colors">Privacidade</Link>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            © {new Date().getFullYear()} OBHelp
          </p>
        </div>
      </div>
    </div>
  );
};
