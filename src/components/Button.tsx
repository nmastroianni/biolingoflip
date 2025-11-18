import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-95'

  const variants = {
    primary:
      'bg-brand text-white hover:bg-brand-hover shadow-indigo-200 dark:shadow-none',

    secondary:
      'bg-surface dark:bg-surface-dark text-text-main dark:text-text-main-dark border border-slate-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700',

    outline:
      'bg-transparent border border-brand text-brand hover:bg-brand hover:text-white',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
