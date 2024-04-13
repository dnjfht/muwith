interface SubTitleProps {
  text: string;
  basicStyle?: string;
  onClick?: () => void;
}

export default function SubText({ text, basicStyle, onClick }: SubTitleProps) {
  return (
    <p onClick={onClick} className={`${basicStyle} text-[#a1a1a1]`}>
      {text}
    </p>
  );
}
