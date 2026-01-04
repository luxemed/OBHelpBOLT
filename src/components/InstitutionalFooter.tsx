import { Link } from 'react-router-dom';

export const InstitutionalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center">
      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
        <Link to="/termos" className="hover:text-gray-700 hover:underline">
          Termos
        </Link>
        <span>•</span>
        <Link to="/privacidade" className="hover:text-gray-700 hover:underline">
          Privacidade
        </Link>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        © {currentYear} OBHelp
      </p>
    </footer>
  );
};
