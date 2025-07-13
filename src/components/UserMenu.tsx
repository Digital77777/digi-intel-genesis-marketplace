import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/auth">
        <Button variant="ghost" className="text-white hover:bg-blue-500">Sign In</Button>
      </Link>
      <Link to="/auth">
        <Button className="bg-white text-blue-600 hover:bg-blue-50">Get Started</Button>
      </Link>
    </div>
  );
};

export default UserMenu;