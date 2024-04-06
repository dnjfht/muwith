interface ButtonPropsType {
  onClick?: () => void;
  icon: React.ReactNode;
  isHiddenButton: boolean;
  basicStyle?: string;
}

export default function Button({ onClick, icon, isHiddenButton, basicStyle }: ButtonPropsType) {
  return (
    <button onClick={onClick} className={`${!isHiddenButton ? 'block' : 'hidden'} ${basicStyle}`}>
      {icon}
    </button>
  );
}
