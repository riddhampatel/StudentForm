export function Button({
  theme = "primary",
  outline,
  size,
  icon,
  label,
  children,
  className,
  ...props
}) {
  const btnClass = outline ? `btn btn-outline-${theme}` : `btn btn-${theme}`;
  const sizeClass = size ? `btn-${size}` : "";

  return (
    <button
      className={`${btnClass} ${sizeClass} ${className || ""}`.trim()}
      {...props}
    >
      {icon && <i className={`bi ${icon} ${label ? "me-2" : ""}`}></i>}
      {label || children}
    </button>
  );
}

export default Button;
