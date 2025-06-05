import { ReactNode, forwardRef } from 'react';
import { useForm, type FieldError, type DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: DefaultValues<z.infer<T>>;
  children: (methods: ReturnType<typeof useForm>) => ReactNode;
}

export function Form<T extends z.ZodType>({
  schema,
  onSubmit,
  defaultValues,
  children,
}: FormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
      {children(methods)}
    </form>
  );
}

export function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | FieldError;
  children: ReactNode;
}) {
  const errorMessage = error && typeof error === 'object' ? error.message : error;

  return (
    <div>
      <label className="block text-sm font-medium text-text-base font-inter mb-1">{label}</label>
      <div className="mt-1">{children}</div>
      {errorMessage && <p className="mt-1.5 text-sm text-error">{errorMessage}</p>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ type = 'text', className = '', ...props }, ref) {
    return (
      <input
        type={type}
        className={`block w-full rounded-lg bg-surface border-border shadow-sm focus:border-primary focus:ring-primary text-text-base placeholder-text-muted sm:text-sm font-inter transition-colors ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea({ className = '', ...props }, ref) {
    return (
      <textarea
        className={`block w-full rounded-lg bg-surface border-border shadow-sm focus:border-primary focus:ring-primary text-text-base placeholder-text-muted sm:text-sm font-inter transition-colors ${className}`}
        rows={3}
        ref={ref}
        {...props}
      />
    );
  }
);

export function Button({
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 active:bg-primary/80 text-text-inverse',
    secondary: 'bg-muted hover:bg-muted/90 active:bg-muted/80 text-text-base',
    danger: 'bg-error hover:bg-error/90 active:bg-error/80 text-text-inverse',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border border-transparent text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
} 