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
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">{children}</div>
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ type = 'text', ...props }, ref) {
    return (
      <input
        type={type}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={ref}
        {...props}
      />
    );
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea(props, ref) {
    return (
      <textarea
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]}`}
      {...props}
    />
  );
} 