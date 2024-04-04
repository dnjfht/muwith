'use client';

interface Props {
  type: string;
  btnText: string;
  disabled: boolean;
  onClick?: () => void;
}

const SnsButton = ({ type, btnText, disabled, onClick }: Props) => {
  return (
    <input
      className="w-full h-[76px] bg-[#1d1e22] rounded-2xl border-[3px] border-solid border-[#1d1e22] text-[1.3125rem] font-[900] cursor-pointer text-white"
      type={type}
      value={btnText}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default SnsButton;
