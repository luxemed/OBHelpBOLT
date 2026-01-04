import { BackHeader } from '../components/BackHeader';

interface PlaceholderProps {
  title: string;
}

export const Placeholder = ({ title }: PlaceholderProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <BackHeader title={title} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-700 mb-4">construction</span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
          <p className="text-slate-500 dark:text-slate-400">Em desenvolvimento</p>
        </div>
      </div>
    </div>
  );
};
