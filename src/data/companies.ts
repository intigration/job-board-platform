interface Company {
  id: number;
  name: string;
  description: string;
  location: string;
  size: string;
  industry: string;
  website: string;
  stats: {
    activeJobs: number;
    totalApplicants: number;
    averageSalary: string;
  };
  jobs?: Array<{
    id: string;
    title: string;
    applicants: number;
    posted: string;
    status: string;
  }>;
}

export const companies: Company[] = [
  {
    id: 1,
    name: "Tech Corp",
    description: "A leading technology company focused on building innovative solutions.",
    location: "San Francisco, CA",
    size: "50-200 employees",
    industry: "Technology",
    website: "https://techcorp.com",
    stats: {
      activeJobs: 2,
      totalApplicants: 77,
      averageSalary: "$125k"
    },
    jobs: [
      {
        id: "1",
        title: "Senior Software Engineer",
        applicants: 45,
        posted: "2 weeks ago",
        status: "active"
      }
    ]
  },
  {
    id: 2,
    name: "Design Studio",
    description: "Creative design agency specializing in brand identity and user experience.",
    location: "New York, NY",
    size: "20-50 employees",
    industry: "Design",
    website: "https://designstudio.com",
    stats: {
      activeJobs: 3,
      totalApplicants: 45,
      averageSalary: "$95k"
    },
    jobs: [
      {
        id: "2",
        title: "UI/UX Designer",
        applicants: 28,
        posted: "1 week ago",
        status: "active"
      }
    ]
  },
  {
    id: 3,
    name: "Global Solutions Inc",
    description: "International consulting firm providing business and technology solutions.",
    location: "London, UK",
    size: "500+ employees",
    industry: "Consulting",
    website: "https://globalsolutions.com",
    stats: {
      activeJobs: 5,
      totalApplicants: 120,
      averageSalary: "$110k"
    },
    jobs: [
      {
        id: "3",
        title: "Business Analyst",
        applicants: 35,
        posted: "3 days ago",
        status: "active"
      }
    ]
  }
] 