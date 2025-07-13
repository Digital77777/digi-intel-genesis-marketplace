
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Bot, Loader2, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SignInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  email: string;
  password: string;
  fullName: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const signInForm = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const signUpForm = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    }
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      console.log('User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleSignIn = async (data: SignInForm) => {
    setFormLoading(true);
    setSuccessMessage('');
    console.log('Handling sign in for:', data.email);
    
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        console.error('Sign in error:', error);
        let errorMessage = "Failed to sign in";
        
        if (error.message) {
          if (error.message.includes('Invalid login credentials')) {
            errorMessage = "Invalid email or password";
          } else if (error.message.includes('Email not confirmed')) {
            errorMessage = "Please check your email and confirm your account first";
          } else {
            errorMessage = error.message;
          }
        }
        
        toast({
          title: "Error signing in",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        console.log('Sign in successful');
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
      }
    } catch (error: any) {
      console.error('Sign in exception:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    setFormLoading(true);
    setSuccessMessage('');
    console.log('Handling sign up for:', data.email);
    
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      if (error) {
        console.error('Sign up error:', error);
        
        // Handle success message differently
        if (error.type === 'success') {
          setSuccessMessage(error.message);
          signUpForm.reset();
          toast({
            title: "Account created!",
            description: error.message
          });
          // Don't switch to sign in immediately if email confirmation might be required
          return;
        }
        
        let errorMessage = "Failed to create account";
        
        if (error.message) {
          if (error.message.includes('User already registered')) {
            errorMessage = "An account with this email already exists. Try signing in instead.";
          } else if (error.message.includes('Password should be at least')) {
            errorMessage = "Password must be at least 6 characters long";
          } else if (error.message.includes('Invalid email')) {
            errorMessage = "Please enter a valid email address";
          } else {
            errorMessage = error.message;
          }
        }
        
        toast({
          title: "Error creating account",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        console.log('Sign up successful');
        setSuccessMessage("Account created successfully! You can now sign in.");
        toast({
          title: "Account created!",
          description: "Welcome to Digital Intelligence Marketplace."
        });
        // Clear form and switch to sign in
        signUpForm.reset();
        setIsSignUp(false);
      }
    } catch (error: any) {
      console.error('Sign up exception:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };

  const isLoading = authLoading || formLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Digital Intelligence</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignUp 
              ? 'Join the AI marketplace community' 
              : 'Sign in to your account'
            }
          </p>
        </div>

        {successMessage && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Create an account to get started with AI tools' 
                : 'Enter your credentials to access your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    rules={{ required: 'Full name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    rules={{ 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setSuccessMessage('');
                  signInForm.reset();
                  signUpForm.reset();
                }}
                className="text-sm text-primary hover:underline"
                disabled={isLoading}
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
