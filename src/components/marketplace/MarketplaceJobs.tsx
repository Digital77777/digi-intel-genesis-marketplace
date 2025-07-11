import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, MapPin, Briefcase, Users, Calendar, Target, Zap, Building, Star, Eye, BookmarkPlus } from "lucide-react";
interface JobsProps {
  searchQuery: string;
}
const jobs = [{
  id: 1,
  title: "Senior ML Engineer - Computer Vision",
  company: "TechVision AI",
  location: "Remote",
  type: "Full-time",
  budget: {
    min: 120000,
    max: 180000,
    currency: "$",
    period: "year"
  },
  description: "We're looking for an experienced ML engineer to lead our computer vision initiatives. You'll work on cutting-edge projects involving autonomous vehicles and medical imaging.",
  requirements: ["5+ years ML experience", "Computer Vision expertise", "PyTorch/TensorFlow", "Production ML systems"],
  skills: ["Computer Vision", "Deep Learning", "PyTorch", "Python", "MLOps"],
  posted: "2 hours ago",
  applications: 12,
  urgency: "high",
  verified: true,
  rating: 4.8,
  reviews: 34,
  duration: "Long-term",
  experience_level: "Expert",
  category: "Machine Learning"
}, {
  id: 2,
  title: "Freelance NLP Developer - Chatbot Project",
  company: "StartupHub Inc",
  location: "Remote",
  type: "Contract",
  budget: {
    min: 5000,
    max: 8000,
    currency: "$",
    period: "project"
  },
  description: "Build an intelligent customer service chatbot using state-of-the-art NLP models. Integration with existing CRM system required.",
  requirements: ["3+ years NLP experience", "Chatbot development", "API integration", "Real-time systems"],
  skills: ["NLP", "Chatbots", "GPT", "Node.js", "APIs"],
  posted: "1 day ago",
  applications: 8,
  urgency: "medium",
  verified: true,
  rating: 4.6,
  reviews: 18,
  duration: "1-3 months",
  experience_level: "Intermediate",
  category: "Natural Language Processing"
}, {
  id: 3,
  title: "Data Scientist - Predictive Analytics",
  company: "DataCore Solutions",
  location: "New York, NY (Hybrid)",
  type: "Full-time",
  budget: {
    min: 90000,
    max: 130000,
    currency: "$",
    period: "year"
  },
  description: "Join our data science team to build predictive models for financial forecasting. Work with large datasets and modern ML infrastructure.",
  requirements: ["Statistics/ML background", "Python/R proficiency", "SQL expertise", "Business acumen"],
  skills: ["Data Science", "Statistics", "Python", "SQL", "Tableau"],
  posted: "3 days ago",
  applications: 24,
  urgency: "low",
  verified: true,
  rating: 4.9,
  reviews: 67,
  duration: "Long-term",
  experience_level: "Intermediate",
  category: "Data Science"
}, {
  id: 4,
  title: "AI Research Intern - Reinforcement Learning",
  company: "AI Research Lab",
  location: "San Francisco, CA",
  type: "Internship",
  budget: {
    min: 6000,
    max: 8000,
    currency: "$",
    period: "month"
  },
  description: "Summer internship opportunity to work on cutting-edge RL research. Publish papers and contribute to open-source projects.",
  requirements: ["PhD student preferred", "RL knowledge", "Research experience", "Python programming"],
  skills: ["Reinforcement Learning", "Research", "Python", "Mathematics"],
  posted: "5 days ago",
  applications: 31,
  urgency: "medium",
  verified: true,
  rating: 4.7,
  reviews: 12,
  duration: "3-6 months",
  experience_level: "Entry Level",
  category: "Research"
}, {
  id: 5,
  title: "MLOps Engineer - Cloud Infrastructure",
  company: "CloudAI Systems",
  location: "Remote",
  type: "Contract",
  budget: {
    min: 80,
    max: 120,
    currency: "$",
    period: "hour"
  },
  description: "Design and implement MLOps pipelines on AWS. Automate model training, deployment, and monitoring for production systems.",
  requirements: ["MLOps experience", "AWS expertise", "Docker/Kubernetes", "CI/CD pipelines"],
  skills: ["MLOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
  posted: "1 week ago",
  applications: 15,
  urgency: "high",
  verified: true,
  rating: 4.5,
  reviews: 23,
  duration: "6+ months",
  experience_level: "Expert",
  category: "MLOps"
}];
const MarketplaceJobs = ({
  searchQuery
}: JobsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [jobTypeFilter, setJobTypeFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()) || job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesType = jobTypeFilter === "all" || job.type === jobTypeFilter;
    const matchesExperience = experienceFilter === "all" || job.experience_level === experienceFilter;
    return matchesSearch && matchesCategory && matchesType && matchesExperience;
  });
  const categories = [...new Set(jobs.map(job => job.category))];
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  const formatBudget = (budget: any) => {
    const {
      min,
      max,
      currency,
      period
    } = budget;
    const formatNumber = (num: number) => {
      if (num >= 1000) return `${num / 1000}k`;
      return num.toString();
    };
    if (period === "hour") {
      return `${currency}${min}-${max}/hr`;
    } else if (period === "year") {
      return `${currency}${formatNumber(min)}-${formatNumber(max)}/year`;
    } else {
      return `${currency}${formatNumber(min)}-${formatNumber(max)}`;
    }
  };
  const getExperienceColor = (level: string) => {
    switch (level) {
      case "Entry Level":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-green-100 text-green-800";
      case "Expert":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <select value={selectedCategory || ""} onChange={e => setSelectedCategory(e.target.value || null)} className="w-full px-3 py-2 border rounded-md text-sm bg-blue-700">
            <option value="">All Categories</option>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Job Type</label>
          <select value={jobTypeFilter} onChange={e => setJobTypeFilter(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-[#1919be]">
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Experience</label>
          <select value={experienceFilter} onChange={e => setExperienceFilter(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-sky-700">
            <option value="all">All Levels</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Button className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map(job => <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    {job.verified && <Badge variant="default">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>}
                    <Badge className={`text-xs ${getUrgencyColor(job.urgency)}`}>
                      {job.urgency === "high" && <Zap className="h-3 w-3 mr-1" />}
                      {job.urgency.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                  </div>
                  
                  <CardDescription className="mb-4">
                    {job.description}
                  </CardDescription>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-xl font-bold text-green-600">
                      {formatBudget(job.budget)}
                    </span>
                  </div>
                  <Badge className={getExperienceColor(job.experience_level)}>
                    {job.experience_level}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => <Badge key={idx} variant="outline">
                        {skill}
                      </Badge>)}
                  </div>
                </div>
                
                {/* Requirements */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {job.requirements.slice(0, 3).map((req, idx) => <li key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        {req}
                      </li>)}
                  </ul>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{job.applications} applications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{job.rating} ({job.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {filteredJobs.length === 0 && <div className="text-center py-12">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or check back later for new opportunities
          </p>
        </div>}
    </div>;
};
export default MarketplaceJobs;