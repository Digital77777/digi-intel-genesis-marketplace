
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  hasSubscription: boolean;
  planName: string;
  status: string;
  billingPeriod?: string;
  currentPeriodEnd?: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const checkSubscription = async () => {
    if (!user) {
      setSubscription({
        hasSubscription: false,
        planName: 'Freemium',
        status: 'inactive'
      });
      setLoading(false);
      return;
    }

    try {
      console.log('Checking subscription for user:', user.email);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        throw error;
      }

      console.log('Subscription data:', data);
      setSubscription(data);
    } catch (error) {
      console.error('Failed to check subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive",
      });
      // Fallback to free tier
      setSubscription({
        hasSubscription: false,
        planName: 'Freemium',
        status: 'inactive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (planName: string, billingPeriod: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating checkout for:', { planName, billingPeriod });
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planName, billingPeriod }
      });

      if (error) {
        console.error('Error creating checkout:', error);
        throw error;
      }

      if (data.isFree) {
        toast({
          title: "Success!",
          description: "You're now subscribed to the free plan",
        });
        checkSubscription(); // Refresh subscription data
        return;
      }

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Failed to create checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start subscription process",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return {
    subscription,
    loading,
    checkSubscription,
    createCheckout,
  };
};
