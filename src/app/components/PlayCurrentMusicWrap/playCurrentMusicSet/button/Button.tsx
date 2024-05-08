interface ButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  isHidden?: string;
  basicStyle?: string;
  disabled?: boolean;
}

export default function Button({ onClick, icon, isHidden, basicStyle, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${isHidden} ${basicStyle}`} disabled={disabled}>
      {icon}
    </button>
  );
}
