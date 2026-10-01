export interface RoleInfo {
  id: string;
  name: string;
  category: string;
  averagePackage: string;
  topCompanies: string[];
  primarySkills: string[];
  secondarySkills: string[];
  description: string;
  interviewRounds: string[];
  atsKeywords: string[];
}

export const TARGET_ROLES: RoleInfo[] = [
  {
    id: 'sde',
    name: 'Software Development Engineer',
    category: 'Core Engineering',
    averagePackage: '12 - 24 LPA',
    topCompanies: ['Amazon', 'Microsoft', 'Google', 'Flipkart', 'Cisco'],
    primarySkills: ['Data Structures & Algorithms', 'C++', 'Java', 'OOP', 'System Design'],
    secondarySkills: ['SQL', 'Git', 'Operating Systems', 'Computer Networks'],
    description: 'Focuses on designing resilient, scalable software architectures, algorithmic problem solving, and low-latency system components.',
    interviewRounds: ['Online Assessment (DSA + Aptitude)', 'Technical 1 (DSA & Problem Solving)', 'Technical 2 (System Design & CS Fundamentals)', 'Bar Raiser / HR'],
    atsKeywords: ['Data Structures', 'Algorithms', 'LeetCode', 'System Design', 'C++', 'Java', 'Object Oriented Programming', 'Concurrency'],
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    category: 'Web Engineering',
    averagePackage: '8 - 18 LPA',
    topCompanies: ['Razorpay', 'Swiggy', 'Zomato', 'Freshworks', 'Atlassian'],
    primarySkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    secondarySkills: ['Next.js', 'Tailwind CSS', 'Docker', 'GraphQL', 'Redis'],
    description: 'Builds end-to-end web applications, uniting responsive user interfaces with robust server architectures, database modeling, and microservices.',
    interviewRounds: ['Coding Assessment & Take-Home Project', 'Technical 1 (Frontend & State Management)', 'Technical 2 (Backend APIs & Database Design)', 'Culture Fit & Behavioral'],
    atsKeywords: ['React', 'Node.js', 'Express', 'TypeScript', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Full Stack Architecture'],
  },
  {
    id: 'frontend',
    name: 'Frontend Developer',
    category: 'Client Engineering',
    averagePackage: '7 - 16 LPA',
    topCompanies: ['CleverTap', 'BrowserStack', 'Postman', 'InMobi', 'Zoho'],
    primarySkills: ['React', 'JavaScript ES6+', 'TypeScript', 'HTML5/CSS3', 'Tailwind CSS'],
    secondarySkills: ['Next.js', 'Vite', 'Redux / Zustand', 'Web Performance', 'Testing (Jest/Playwright)'],
    description: 'Crafts accessible, high-performance web experiences with smooth animations, responsive typography, and state-of-the-art UI architectures.',
    interviewRounds: ['UI Machine Coding Round', 'Technical 1 (DOM, JS Internals, React Lifecycle)', 'Technical 2 (Web Vitals & Performance)', 'Managerial'],
    atsKeywords: ['React', 'JavaScript', 'CSS3', 'Responsive Design', 'Web Accessibility', 'Performance Optimization', 'Component Systems'],
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    category: 'Server & API Systems',
    averagePackage: '9 - 20 LPA',
    topCompanies: ['Oracle', 'Paytm', 'PhonePe', 'Dell', 'Morgan Stanley'],
    primarySkills: ['Java / Spring Boot', 'Node.js', 'Python / Django', 'SQL & RDBMS', 'REST / gRPC'],
    secondarySkills: ['Kafka', 'Redis', 'Docker', 'Microservices', 'Database Indexing'],
    description: 'Architects fault-tolerant server systems, manages data consistency, optimizes database queries, and develops high-throughput distributed microservices.',
    interviewRounds: ['Machine Coding Round (API design)', 'Technical 1 (Concurrency, Transactions, SQL)', 'Technical 2 (System Architecture)', 'HR Discussion'],
    atsKeywords: ['Microservices', 'Spring Boot', 'Node.js', 'SQL', 'Database Design', 'Caching', 'Message Queues', 'RESTful APIs'],
  },
  {
    id: 'aiml',
    name: 'AI/ML Engineer',
    category: 'Applied Intelligence',
    averagePackage: '12 - 28 LPA',
    topCompanies: ['NVIDIA', 'Adobe', 'Microsoft Research', 'Fractal', 'Wipro AI'],
    primarySkills: ['Python', 'PyTorch / TensorFlow', 'Machine Learning Algorithms', 'Scikit-learn', 'NLP / LLMs'],
    secondarySkills: ['Pandas / NumPy', 'Hugging Face', 'FastAPI', 'MLOps', 'Vector Databases'],
    description: 'Designs, trains, and deploys predictive machine learning models, fine-tunes large language models, and builds production-grade intelligent pipelines.',
    interviewRounds: ['ML Math & Coding Assessment', 'Technical 1 (Deep Learning & Feature Engineering)', 'Technical 2 (Model Evaluation & Deployment)', 'Research / Team Fit'],
    atsKeywords: ['PyTorch', 'TensorFlow', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'LLMs', 'MLOps', 'Vector Search'],
  },
  {
    id: 'dataanalyst',
    name: 'Data Analyst',
    category: 'Analytics & Insights',
    averagePackage: '6 - 14 LPA',
    topCompanies: ['Mu Sigma', 'Tiger Analytics', 'EXL', 'Deloitte', 'Accenture Strategy'],
    primarySkills: ['SQL', 'Python (Pandas, Matplotlib)', 'Power BI / Tableau', 'Advanced Excel', 'Statistics'],
    secondarySkills: ['Business Intelligence', 'A/B Testing', 'Data Cleaning', 'Data Storytelling'],
    description: 'Transforms raw organizational data into actionable decision-making metrics through statistical modeling, exploratory queries, and visual dashboards.',
    interviewRounds: ['SQL & Analytics Test', 'Technical 1 (Complex SQL Queries & Business Case)', 'Technical 2 (Dashboard Demonstration & Storytelling)', 'Fitment Round'],
    atsKeywords: ['SQL', 'Power BI', 'Tableau', 'Data Visualization', 'Exploratory Data Analysis', 'Statistical Modeling', 'Business Metrics'],
  },
  {
    id: 'dataengineer',
    name: 'Data Engineer',
    category: 'Data Platform',
    averagePackage: '10 - 22 LPA',
    topCompanies: ['Snowflake', 'Databricks', 'Walmart Global Tech', 'Target', 'JPMorgan Chase'],
    primarySkills: ['Python', 'SQL', 'Apache Spark', 'Data Warehousing', 'ETL Pipelines'],
    secondarySkills: ['Airflow', 'Kafka', 'Snowflake / BigQuery', 'AWS / GCP Data Services'],
    description: 'Engineers robust data pipelines, ingests petabyte-scale data streams, and maintains low-latency analytical data warehouses for downstream AI consumers.',
    interviewRounds: ['Data Structures & SQL Round', 'Technical 1 (ETL Pipeline Design & Spark)', 'Technical 2 (Distributed Systems & Data Modeling)', 'Leadership Round'],
    atsKeywords: ['Apache Spark', 'ETL', 'Data Pipeline', 'Snowflake', 'BigQuery', 'Airflow', 'Data Modeling', 'Distributed Computing'],
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    category: 'Cloud & Infrastructure',
    averagePackage: '9 - 22 LPA',
    topCompanies: ['Red Hat', 'VMware', 'Cisco', 'ThoughtWorks', 'Salesforce'],
    primarySkills: ['Docker', 'Kubernetes', 'Linux Systems', 'CI/CD Pipelines (GitHub Actions/Jenkins)', 'Cloud (AWS/GCP/Azure)'],
    secondarySkills: ['Terraform', 'Prometheus & Grafana', 'Bash Scripting', 'Networking & Security'],
    description: 'Automates cloud infrastructure provisioning, constructs resilient continuous integration workflows, and guarantees 99.99% system availability.',
    interviewRounds: ['Hands-on Linux & Scripting Round', 'Technical 1 (Containers, CI/CD, Kubernetes)', 'Technical 2 (Cloud Infrastructure & Incident Triage)', 'Culture Fit'],
    atsKeywords: ['Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform', 'Linux', 'Monitoring', 'Infrastructure as Code'],
  },
];

export const POPULAR_COLLEGES = [
  'Indian Institute of Technology (IIT)',
  'National Institute of Technology (NIT)',
  'Birla Institute of Technology and Science (BITS)',
  'Vellore Institute of Technology (VIT)',
  'SRM Institute of Science and Technology',
  'Delhi Technological University (DTU)',
  'International Institute of Information Technology (IIIT)',
  'Manipal Institute of Technology (MIT)',
  'Thapar Institute of Engineering and Technology',
  'Anna University',
  'Jawaharlal Nehru Technological University (JNTU)',
  'Visvesvaraya Technological University (VTU)',
];

export const POPULAR_DEGREES = [
  'B.Tech / B.E.',
  'M.Tech / M.E.',
  'MCA',
  'BCA',
  'B.Sc Computer Science / IT',
  'M.Sc Computer Science / Data Science',
  'Dual Degree (B.Tech + M.Tech)',
];

export const POPULAR_BRANCHES = [
  'Computer Science and Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Electronics and Communication Engineering (ECE)',
  'Electrical and Electronics Engineering (EEE)',
  'Mechanical Engineering',
  'Data Science & Analytics',
  'Cybersecurity & Network Engineering',
];

export const QUICK_SKILL_SUGGESTIONS = [
  'Data Structures & Algorithms',
  'Python',
  'Java',
  'C++',
  'React',
  'TypeScript',
  'Node.js',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'System Design',
  'Docker',
  'Kubernetes',
  'Git',
  'REST APIs',
  'Machine Learning',
  'PyTorch',
  'Power BI',
  'AWS',
  'Linux',
];
