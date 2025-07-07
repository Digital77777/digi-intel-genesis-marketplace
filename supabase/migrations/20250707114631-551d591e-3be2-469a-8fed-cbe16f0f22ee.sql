
-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  stripe_price_id TEXT,
  price_monthly INTEGER NOT NULL, -- in cents
  price_yearly INTEGER NOT NULL, -- in cents
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due, etc.
  billing_period TEXT NOT NULL, -- monthly, yearly
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id) -- One subscription per user
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plans (public read access)
CREATE POLICY "subscription_plans_select" ON public.subscription_plans
  FOR SELECT USING (true);

-- RLS Policies for user_subscriptions (users can only see their own)
CREATE POLICY "user_subscriptions_select" ON public.user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_subscriptions_insert" ON public.user_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_subscriptions_update" ON public.user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, price_monthly, price_yearly, features) VALUES
('Freemium', 0, 0, '["AI Tools Directory access", "Learning Hub with basic courses", "Community Forum access", "Basic AI model templates", "5 model deployments/month", "Community support"]'::jsonb),
('Basic', 2100, 21000, '["AI Tools Directory access", "Learning Hub with basic courses", "Community Forum access", "Basic AI model templates", "5 model deployments/month", "Community support", "Advanced learning content", "Collaboration tools", "Custom model training", "50 model deployments/month", "Marketplace selling privileges", "Priority support", "Revenue analytics", "Team workspace (5 members)"]'::jsonb),
('Pro', 4600, 46000, '["AI Tools Directory access", "Learning Hub with basic courses", "Community Forum access", "Basic AI model templates", "5 model deployments/month", "Community support", "Advanced learning content", "Collaboration tools", "Custom model training", "50 model deployments/month", "Marketplace selling privileges", "Priority support", "Revenue analytics", "Team workspace (5 members)", "Unlimited deployments", "Advanced AI Studio", "Custom integrations", "Dedicated account manager", "SLA guarantees", "Custom compliance tools", "Advanced analytics", "Unlimited team members", "White-label options"]'::jsonb);
