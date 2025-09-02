interface ButtonProps {
  handleClick: () => void;
  className?: string;
  text: string;
}

export default function Button({ handleClick, className, text }: ButtonProps) {
  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  );
}
