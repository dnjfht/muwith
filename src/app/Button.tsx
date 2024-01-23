interface Props {
  type: string;
  btnText: string;
  disabled: boolean;
}

const Button = ({ type, btnText, disabled }: Props) => {
  return (
    <input
      className={`${
        btnText === "Google 로그인" || btnText === "Kakao 로그인"
          ? "bg-[#1d1e22] text-white"
          : ""
      } w-full h-[76px] rounded-2xl border-[3px] border-solid border-[#1d1e22] text-[1.3125rem] font-[900] cursor-pointer`}
      type={type}
      value={btnText}
      disabled={disabled}
    />
  );
};

export default Button;
