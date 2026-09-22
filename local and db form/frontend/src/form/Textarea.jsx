import { forwardRef } from "react";

export const Textarea = forwardRef(function Textarea(
  { name, label, fgroupClass, error, hint, className, ...props },
  ref
) {
  return (
    <div className={`mb-3 ${fgroupClass || ""}`}>
      {label && (
        <label htmlFor={props.id || name} className="form-label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        name={name}
        id={props.id || name}
        className={`form-control ${error ? "is-invalid" : ""} ${className || ""}`.trim()}
        {...props}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {hint && <small className="form-text text-muted">{hint}</small>}
    </div>
  );
});

export default Textarea;
