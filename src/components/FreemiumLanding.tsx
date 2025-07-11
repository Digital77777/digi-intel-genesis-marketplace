import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, GraduationCap, DollarSign, Rocket, Users, Zap, Star, CheckCircle, PlayCircle, TrendingUp, Clock, Target, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { useEngagementTracking } from "@/hooks/useEngagementTracking";
const FreemiumLanding = () => {
  const {
    subscription,
    loading
  } = useSubscription();
  const {
    user
  } = useAuth();
  const {
    trackEvent
  } = useEngagementTracking();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const userTier = subscription?.planName?.toLowerCase() || "freemium";
  const userName = user?.email?.split('@')[0] || "Creator";

  // Demo carousel content
  const demoSlides = [{
    title: "AI Tools Directory",
    description: "Discover thousands of AI tools curated by experts",
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    image: "🤖",
    link: "/ai-tools"
  }, {
    title: "Learning Hub",
    description: "Master AI with interactive courses and tutorials",
    icon: <GraduationCap className="h-8 w-8 text-green-600" />,
    image: "📚",
    link: "/learning-hub"
  }, {
    title: "AI Streams",
    description: "Join live AI development sessions and workshops",
    icon: <Rocket className="h-8 w-8 text-red-600" />,
    image: "🔴",
    link: "/ai-streams"
  }, {
    title: "Marketplace",
    description: "Trade AI models, datasets, and solutions",
    icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
    image: "🛒",
    link: "/marketplace"
  }, {
    title: "Community Forum",
    description: "Connect with AI enthusiasts worldwide",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    image: "💬",
    link: "/community"
  }];

  // Gamified achievements
  const achievements = [{
    id: 1,
    title: "First Login",
    completed: true,
    icon: "🎉"
  }, {
    id: 2,
    title: "Explore AI Tools",
    completed: false,
    icon: "🔍"
  }, {
    id: 3,
    title: "Join Community",
    completed: false,
    icon: "👥"
  }, {
    id: 4,
    title: "Watch AI Stream",
    completed: false,
    icon: "📺"
  }, {
    id: 5,
    title: "Complete Tutorial",
    completed: false,
    icon: "🎓"
  }];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % demoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(75), 500);
    return () => clearTimeout(timer);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-background dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-25 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 text-center">
          {/* Personalized welcome */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-8 border border-blue-200 dark:border-blue-800">
            <Sparkles className="h-4 w-4" />
            <span>Welcome back, {userName}!</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6 text-blue-800 sm:text-5xl">
            Start building smarter —
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              no cost, no limits on creativity
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Unleash your AI potential with our comprehensive toolkit. From learning resources to live streams, 
            marketplace access to community collaboration — everything you need to innovate is at your fingertips.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/ai-tools" onClick={() => trackEvent('hero_cta_click', {
              button: 'start_creating'
            })}>
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:bg-muted/50 transition-all duration-300">
              <Link to="#features">Explore Features</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1M+</div>
              <div className="text-sm text-muted-foreground">AI Tools Accessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-muted-foreground">Free to Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Carousel */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your AI Toolkit Awaits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the features that are transforming how creators build with AI
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{demoSlides[currentSlide].image}</div>
                <div className="mb-4">{demoSlides[currentSlide].icon}</div>
                <h3 className="text-2xl font-bold mb-2">{demoSlides[currentSlide].title}</h3>
                <p className="text-muted-foreground mb-6">{demoSlides[currentSlide].description}</p>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Link to={demoSlides[currentSlide].link} onClick={() => trackEvent('carousel_cta_click', {
                  feature: demoSlides[currentSlide].title
                })}>
                    Explore Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {demoSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />)}
            </div>
            <blockquote className="text-2xl font-medium text-foreground mb-6">
              "Thousands are creating daily — all for free. This platform has completely transformed how I approach AI development."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div className="text-left">
                <div className="font-semibold">Alex Chen</div>
                <div className="text-sm text-muted-foreground">AI Developer & Creator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progressive Encouragement */}
      <section id="features" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Progress & Achievements */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Your AI Journey Progress</h3>
              
              {/* Usage Progress */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Monthly Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Tools Explored</span>
                      <span>15 / 20</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Great progress! You're making the most of your free access.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Achievement Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-3">
                    {achievements.map(achievement => <div key={achievement.id} className="text-center">
                        <div className={`text-2xl mb-1 ${achievement.completed ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                          {achievement.icon}
                        </div>
                        <div className="text-xs font-medium">{achievement.title}</div>
                        {achievement.completed && <CheckCircle className="h-3 w-3 text-green-600 mx-auto mt-1" />}
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Discovery Checklist */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Discover More Features</h3>
              <div className="space-y-4">
                {demoSlides.map((feature, index) => <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={feature.link}>
                            <PlayCircle className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What's Next on Your Journey?</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              You're doing amazing with the Freemium tier! Here's what you can unlock as you grow.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Freemium Benefits */}
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-blue-600" />
                    Your Current Access
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">Free Forever</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">AI Tools Directory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Basic Learning Hub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Community Forum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Marketplace Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">AI Streams</span>
                  </div>
                </CardContent>
              </Card>

              {/* Future Growth */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader className="bg-slate-950">
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-purple-600" />
                    Ready for More?
                  </CardTitle>
                  <Badge className="w-fit bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Coming Soon
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3 bg-slate-950">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Team Collaboration Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Advanced Learning Content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">AI Studio Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Custom AI Solutions</span>
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Keep creating and we'll notify you when these features launch!
                    </p>
                    <Button variant="outline" disabled className="opacity-60">
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA - Mobile responsive */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Button size="lg" asChild className="shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white animate-pulse hover:animate-none text-sm md:text-base px-3 md:px-6">
          <Link to="/ai-tools" onClick={() => trackEvent('sticky_cta_click', {
          button: 'start_creating'
        })}>
            <Zap className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Start Creating</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </Button>
      </div>
    </div>;
};
export default FreemiumLanding;