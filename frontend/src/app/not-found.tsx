import { EmptyState } from '../components/common/EmptyState';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <EmptyState 
        icon={<Search />}
        title="Page not found"
        description="We couldn't find the page you're looking for. It might have been moved or deleted."
        action={
          <Link href="/dashboard">
            <Button>Return Home</Button>
          </Link>
        }
      />
    </div>
  );
}
