
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/auth">
        <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 border-0">
          Sign In
        </Button>
      </Link>
      <Link to="/auth">
        <Button className="bg-white text-primary hover:bg-white/90 shadow-soft font-medium">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default UserMenu;
