import { cn } from '../../lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn("flex h-48 flex-col items-center justify-center rounded-xl border bg-card text-card-foreground shadow-sm", className)}>
      <LoadingSpinner className="h-8 w-8" />
    </div>
  );
}
