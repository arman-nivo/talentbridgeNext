import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "w-full rounded-xl border bg-surface-solid px-4 py-3 text-sm text-fg placeholder:text-subtle transition focus:outline-none focus:ring-4 focus:ring-accent/15";

function borderFor(error?: string) {
  return error ? "border-rose-500/70 focus:border-rose-500" : "border-line focus:border-accent";
}

type FieldShellProps = { label: string; htmlFor: string; error?: string; required?: boolean; children: ReactNode };

function FieldShell({ label, htmlFor, error, required, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-muted">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-rose-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; error?: string };

export function InputField({ label, name, error, required, className = "", ...rest }: InputFieldProps) {
  const id = rest.id ?? `f-${name}`;
  return (
    <FieldShell label={label} htmlFor={id} error={error} required={required}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} ${borderFor(error)} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  options: readonly string[];
  error?: string;
};

export function SelectField({ label, name, options, error, required, className = "", ...rest }: SelectFieldProps) {
  const id = rest.id ?? `f-${name}`;
  return (
    <FieldShell label={label} htmlFor={id} error={error} required={required}>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        className={`${control} ${borderFor(error)} ${className}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string; error?: string };

export function TextareaField({ label, name, error, required, className = "", ...rest }: TextareaFieldProps) {
  const id = rest.id ?? `f-${name}`;
  return (
    <FieldShell label={label} htmlFor={id} error={error} required={required}>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        className={`${control} ${borderFor(error)} resize-y ${className}`}
        {...rest}
      />
    </FieldShell>
  );
}

/** Off-screen field that only bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="f-website">Website</label>
      <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
