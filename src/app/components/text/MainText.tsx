interface MainTextProps {
  isHidden?: string;
  text: string;
  basicStyle?: string;
}

export default function MainText({ isHidden, text, basicStyle }: MainTextProps) {
  return <h1 className={`${isHidden} ${basicStyle} mb-2 text-[1.5rem] font-semibold`}>{text}</h1>;
}
