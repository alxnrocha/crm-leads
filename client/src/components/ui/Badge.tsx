import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'stage-new'
    | 'stage-contacted'
    | 'stage-qualified'
    | 'stage-proposal'
    | 'stage-won'
    | 'stage-lost'
    | 'priority-low'
    | 'priority-medium'
    | 'priority-high';
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  dot = false,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border transition-colors';

  const variants = {
    default:
      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    secondary:
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    outline: 'border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300',
    success:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    warning:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    danger:
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    info: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',

    // Pipeline Stages
    'stage-new':
      'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
    'stage-contacted':
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    'stage-qualified':
      'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    'stage-proposal':
      'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    'stage-won':
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    'stage-lost':
      'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',

    // Priorities
    'priority-low':
      'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    'priority-medium':
      'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700',
    'priority-high':
      'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:border-rose-700',
  };

  const dotColors: Record<string, string> = {
    default: 'bg-indigo-500',
    secondary: 'bg-slate-500',
    outline: 'bg-slate-400',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    'stage-new': 'bg-sky-500',
    'stage-contacted': 'bg-amber-500',
    'stage-qualified': 'bg-purple-500',
    'stage-proposal': 'bg-indigo-500',
    'stage-won': 'bg-emerald-500',
    'stage-lost': 'bg-rose-500',
    'priority-low': 'bg-slate-400',
    'priority-medium': 'bg-amber-500',
    'priority-high': 'bg-rose-500',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant] || 'bg-current')} />
      )}
      {children}
    </span>
  );
}
