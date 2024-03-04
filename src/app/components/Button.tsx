'use client';

interface Props {
  type: string;
  btnText: string;
  isBtnStyle: boolean;
  disabled: boolean;
  onClick?: () => void;
}

const Button = ({ type, btnText, isBtnStyle, disabled, onClick }: Props) => {
  return (
    <input
      className={`${
        isBtnStyle && 'bg-[#1d1e22] text-white'
      } w-full h-[76px] rounded-2xl border-[3px] border-solid border-[#1d1e22] text-[1.3125rem] font-[900] cursor-pointer`}
      type={type}
      value={btnText}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default Button;
