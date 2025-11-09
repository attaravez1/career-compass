
export type Career = {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  avgSalary: string;
  requiredEducation: string;
  skills: string[];
  imagePlaceholderId: string;
};

export const careers: Career[] = [
  {
    slug: 'software-developer',
    title: 'Software Developer',
    category: 'Technology',
    description: 'Create applications and systems that run on computers and other devices.',
    longDescription: 'Software developers are the creative minds behind computer programs. Some develop the applications that allow people to do specific tasks on a computer or another device. Others develop the underlying systems that run the devices or that control networks. Their work is essential in a huge range of industries, from gaming to finance to healthcare.',
    avgSalary: '$110,140 per year',
    requiredEducation: "Bachelor's degree in computer science or a related field.",
    skills: ['JavaScript', 'Python', 'Java', 'C++', 'SQL', 'Problem-solving'],
    imagePlaceholderId: 'career-tech',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Analyze and interpret complex data to help organizations make better decisions.',
    longDescription: 'Data scientists use their analytical, statistical, and programming skills to collect, analyze, and interpret large data sets. They then use this information to develop data-driven solutions to difficult business challenges. They are part statistician, part computer scientist, and part business strategist.',
    avgSalary: '$126,830 per year',
    requiredEducation: "Master's or PhD in a quantitative field.",
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
    imagePlaceholderId: 'career-data',
  },
  {
    slug: 'ux-ui-designer',
    title: 'UX/UI Designer',
    category: 'Technology',
    description: 'Design user-friendly interfaces and experiences for digital products.',
    longDescription: 'UX (User Experience) and UI (User Interface) designers work to make technology easy and enjoyable to use. UX designers focus on the overall feel of the product, while UI designers work on how the interface looks and functions. They are crucial for creating products that users love.',
    avgSalary: '$92,750 per year',
    requiredEducation: 'Bachelor\'s degree in design, HCI, or related field.',
    skills: ['Figma', 'Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
    imagePlaceholderId: 'career-creative',
  },
  {
    slug: 'registered-nurse',
    title: 'Registered Nurse',
    category: 'Healthcare',
    description: 'Provide and coordinate patient care, educate patients, and offer emotional support.',
    longDescription: 'Registered nurses (RNs) are the backbone of the healthcare system. They provide and coordinate patient care, educate patients and the public about various health conditions, and provide advice and emotional support to patients and their families. They work in a variety of settings, including hospitals, physicians\' offices, and schools.',
    avgSalary: '$77,600 per year',
    requiredEducation: 'Associate\'s or Bachelor\'s degree in nursing.',
    skills: ['Patient Care', 'Communication', 'Empathy', 'Attention to Detail', 'Critical Thinking'],
    imagePlaceholderId: 'career-healthcare',
  },
   {
    slug: 'dentist',
    title: 'Dentist',
    category: 'Healthcare',
    description: 'Diagnose and treat problems with patients’ teeth, gums, and related parts of the mouth.',
    longDescription: 'Dentists provide vital oral healthcare. They diagnose and treat problems with teeth and gums, perform surgical procedures, and advise patients on diet, brushing, and other aspects of dental care. Many own their own businesses and manage a team of dental hygienists and assistants.',
    avgSalary: '$164,010 per year',
    requiredEducation: 'Doctor of Dental Surgery (DDS) or Doctor of Medicine in Dentistry (DMD).',
    skills: ['Oral Health', 'Patient Care', 'Manual Dexterity', 'Attention to Detail', 'Problem-solving'],
    imagePlaceholderId: 'career-dentist',
  },
  {
    slug: 'physical-therapist',
    title: 'Physical Therapist',
    category: 'Healthcare',
    description: 'Help injured or ill people improve their movement and manage their pain.',
    longDescription: 'Physical therapists are movement experts who improve quality of life through prescribed exercise, hands-on care, and patient education. They diagnose and treat individuals of all ages, from newborns to the very oldest, who have medical problems or other health-related conditions that limit their abilities to move and function in their daily lives.',
    avgSalary: '$91,010 per year',
    requiredEducation: 'Doctor of Physical Therapy (DPT) degree.',
    skills: ['Anatomy', 'Exercise Physiology', 'Patient Rehabilitation', 'Communication', 'Empathy'],
    imagePlaceholderId: 'career-physical-therapy',
  },
  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    category: 'Creative Arts',
    description: 'Create visual concepts to communicate ideas that inspire and captivate.',
    longDescription: 'Graphic designers create visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers. They develop the overall layout and production design for applications such as advertisements, brochures, magazines, and reports. Their work is essential for branding and marketing.',
    avgSalary: '$53,380 per year',
    requiredEducation: 'Bachelor\'s degree in graphic design or a related field.',
    skills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Creativity', 'Communication'],
    imagePlaceholderId: 'career-creative',
  },
  {
    slug: 'marketing-manager',
    title: 'Marketing Manager',
    category: 'Business',
    description: 'Plan and oversee advertising and promotion to generate interest in products and services.',
    longDescription: 'Marketing managers plan strategies to promote products or services. They estimate the demand for products and services that an organization, and its competitors, offer. They identify potential markets and develop pricing strategies while overseeing product development and monitoring trends that indicate the need for new products and services.',
    avgSalary: '$141,490 per year',
    requiredEducation: 'Bachelor\'s degree in marketing or business administration.',
    skills: ['SEO/SEM', 'Data Analysis', 'Social Media Marketing', 'Leadership', 'Creativity'],
    imagePlaceholderId: 'career-business',
  },
  {
    slug: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'Business',
    description: 'Provide guidance to businesses and individuals making investment decisions.',
    longDescription: 'Financial analysts assess the performance of stocks, bonds, and other types of investments. They work for banks, insurance companies, and other financial institutions, providing guidance to businesses and individuals to help them with their investment decisions. They must be analytical, detail-oriented, and have a strong understanding of financial markets.',
    avgSalary: '$83,660 per year',
    requiredEducation: 'Bachelor\'s degree in finance, economics, or a related field.',
    skills: ['Financial Modeling', 'Data Analysis', 'Excel', 'Valuation', 'Communication'],
    imagePlaceholderId: 'career-finance',
  },
  {
    slug: 'elementary-teacher',
    title: 'Elementary School Teacher',
    category: 'Education',
    description: 'Instruct young students in basic subjects, such as reading and math, and in social skills.',
    longDescription: 'Elementary school teachers are crucial to the development of young minds. They prepare younger students for future schooling by teaching them basic subjects such as reading, writing, and mathematics. They also help students learn social skills and develop a positive attitude toward learning.',
    avgSalary: '$61,400 per year',
    requiredEducation: 'Bachelor\'s degree in education and state certification.',
    skills: ['Patience', 'Communication', 'Curriculum Development', 'Classroom Management'],
    imagePlaceholderId: 'career-education',
  },
  {
    slug: 'lawyer',
    title: 'Lawyer',
    category: 'Legal',
    description: 'Advise and represent individuals, businesses, and government agencies on legal issues and disputes.',
    longDescription: 'Lawyers, also known as attorneys, are essential to the justice system. They counsel clients on their legal rights and obligations and suggest courses of action in business and personal matters. All attorneys must have a law degree and must also typically pass a state’s written bar examination.',
    avgSalary: '$126,930 per year',
    requiredEducation: 'Juris Doctor (J.D.) degree.',
    skills: ['Legal Research', 'Analytical Reasoning', 'Persuasion', 'Writing', 'Negotiation'],
    imagePlaceholderId: 'career-legal',
  },
  {
    slug: 'electrician',
    title: 'Electrician',
    category: 'Skilled Trades',
    description: 'Install, maintain, and repair electrical systems in various settings.',
    longDescription: 'Electricians ensure that our homes, businesses, and factories have the power they need. They install, maintain, and repair electrical power, communications, lighting, and control systems. This is a hands-on career that requires technical knowledge and a strong commitment to safety.',
    avgSalary: '$60,040 per year',
    requiredEducation: 'High school diploma or equivalent; apprenticeship.',
    skills: ['Electrical Systems', 'Troubleshooting', 'Safety Procedures', 'Blueprint Reading'],
    imagePlaceholderId: 'career-trades',
  },
];

export const careerCategories = [...new Set(careers.map(c => c.category))].sort();

export type Post = {
  id: number;
  author: string;
  avatarUrl: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  replies: number;
};

export const communityPosts: Post[] = [
  {
    id: 1,
    author: 'Alex J.',
    avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    title: 'Confused between a career in Data Science vs. Software Engineering. Help!',
    content: "I'm a junior in college and I love both coding and working with data. I'm not sure which path to focus on for internships. What are the pros and cons of each from people in the industry?",
    category: 'Technology',
    timestamp: '2 hours ago',
    replies: 12,
  },
  {
    id: 2,
    author: 'Maria G.',
    avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    title: 'How to build a good portfolio for creative fields?',
    content: "I'm trying to become a graphic designer, but I feel like my portfolio is weak. What kind of projects should I include to stand out to employers?",
    category: 'Creative Arts',
    timestamp: '5 hours ago',
    replies: 8,
  },
  {
    id: 3,
    author: 'Sam T.',
    avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    title: 'Is going into healthcare worth the long years of study?',
    content: "Thinking about med school, but the commitment is huge. For those who have gone through it, do you feel it was worth it in the end? What are the biggest challenges?",
    category: 'Healthcare',
    timestamp: '1 day ago',
    replies: 25,
  },
  {
    id: 4,
    author: 'David Chen',
    avatarUrl: 'https://picsum.photos/seed/avatar4/40/40',
    title: 'Best way to get started in skilled trades with no experience?',
    content: "I'm considering becoming an electrician or a plumber, but I have no hands-on experience. What's the best first step? A community college program or trying to find an apprenticeship directly?",
    category: 'Skilled Trades',
    timestamp: '2 days ago',
    replies: 15,
  },
];

export const quizQuestions = [
    {
      question: "Which of these activities sounds most appealing to you?",
      options: [
        "Building something with your hands or with code.",
        "Helping people solve their personal or health problems.",
        "Creating art, music, or stories.",
        "Organizing a team or a project to achieve a goal.",
      ],
    },
    {
      question: "When faced with a complex problem, what is your first instinct?",
      options: [
        "Break it down into smaller, logical steps.",
        "Understand how it affects people and find a compassionate solution.",
        "Think of a completely new and unconventional way to approach it.",
        "Create a plan, delegate tasks, and manage resources.",
      ],
    },
    {
      question: "What kind of work environment do you prefer?",
      options: [
        "A focused environment where I can concentrate on technical tasks.",
        "A collaborative, people-focused environment.",
        "A flexible, dynamic environment that encourages self-expression.",
        "A structured, goal-oriented corporate environment.",
      ],
    },
    {
      question: "What subject did you enjoy most in school?",
      options: ["Math or Science", "Psychology or Biology", "Art or English", "Business or Economics"],
    },
];
