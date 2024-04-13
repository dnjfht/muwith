interface ButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  isHidden?: string;
  basicStyle?: string;
}

export default function Button({ onClick, icon, isHidden, basicStyle }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${isHidden} ${basicStyle}`}>
      {icon}
    </button>
  );
}
