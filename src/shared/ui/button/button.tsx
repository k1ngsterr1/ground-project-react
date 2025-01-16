interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?:
    | "outline"
    | "filled"
    | "blue"
    | "transparent_blue"
    | "transparent_red";
}

export function Button({
  className = "",
  fullWidth = false,
  variant = "filled",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 font-medium rounded-full transition-colors focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    filled: "bg-green text-white hover:bg-green/90 focus:ring-green",
    blue: "bg-blue text-white hover:bg-blue/90 focus:ring-blue",
    transparent_blue:
      "bg-light_blue text-blue hover:text-white hover:bg-blue/90 focus:ring-blue",
    outline:
      "bg-transparent text-green border border-green hover:bg-green/10 focus:ring-green",
    transparent:
      "bg-transparent text-blue border border-blue hover:bg-blue/10 focus:ring-blue",
    transparent_red:
      "bg-transparent text-red-500 border border-red-500 hover:bg-red-500/10 focus:ring-red",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    />
  );
}
