interface CategoryCardProps {
  icon: React.ElementType;
  label: string;
  selected: boolean;
  onClick?: () => void;
}

export const CategoryCard = ({ icon: Icon, label, selected, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-28 h-28 rounded-xl transition-colors
        ${selected ? 'bg-orange-400' : 'bg-gray-100'}
      `}
    >
      <Icon className="w-12 h-12" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
