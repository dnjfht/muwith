interface ButtonPropsType {
  icon: React.ReactNode;
  basicStyle?: string;
}

export default function Button({ icon, basicStyle }: ButtonPropsType) {
  return <button className={`${basicStyle} opacity-0 group-hover:opacity-100 group-focus:opacity-100`}>{icon}</button>;
}
