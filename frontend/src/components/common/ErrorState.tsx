import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'An error occurred while loading this content. Please try again.', 
  action, 
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive", className)}>
      <AlertCircle className="h-10 w-10 mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm max-w-sm opacity-90">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
