interface ButtonProps {
  handleClick: () => void;
  className?: string;
  text: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  handleClick,
  className,
  text,
  disabled,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel ?? text}
    >
      {text}
    </button>
  );
}
