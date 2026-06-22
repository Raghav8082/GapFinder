import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper-50 topo-field flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-terra-100 shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-900 mb-2">
          Welcome, {user?.name || 'there'}
        </h1>
        <p className="text-ink-400 text-sm mb-6">
          Your skill map dashboard goes here. This is a placeholder.
        </p>
        <Button variant="secondary" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
};
