import { useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  title: string;
  showMenu?: boolean;
}

export const BackHeader = ({ title, showMenu = false }: BackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#1a202c]/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <button
        onClick={() => navigate(-1)}
        className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white"
      >
        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
      </button>
      <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-10 truncate">
        {title}
      </h2>
      {showMenu && (
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white absolute right-4">
          <span className="material-symbols-outlined text-[24px]">more_vert</span>
        </button>
      )}
    </div>
  );
};
