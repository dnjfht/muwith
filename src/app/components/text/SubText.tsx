interface SubTitleProps {
  text: string;
  basicStyle?: string;
}

export default function SubText({ text, basicStyle }: SubTitleProps) {
  return <p className={`${basicStyle} text-[#a1a1a1]`}>{text}</p>;
}
