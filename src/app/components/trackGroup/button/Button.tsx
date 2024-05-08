interface ButtonPropsType {
  icon: React.ReactNode;
  basicStyle?: string;
  opacityStyle: string;
}

export default function Button({ icon, basicStyle, opacityStyle }: ButtonPropsType) {
  return (
    <button className={`${basicStyle} ${opacityStyle} group-hover:opacity-100 group-focus:opacity-100`}>{icon}</button>
  );
}
