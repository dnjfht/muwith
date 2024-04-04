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
      className="w-full sm:h-[76px] 2sm:h-[56px] 3sm:h-[52px] bg-[#1d1e22] sm:rounded-2xl rounded-lg border-[3px] border-solid border-[#1d1e22] sm:text-[1.3125rem] 2sm:text-[1.1rem] font-[900] cursor-pointer text-white"
      type={type}
      value={btnText}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default SnsButton;
