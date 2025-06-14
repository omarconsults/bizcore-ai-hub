
import { Resource, LearningTrack } from './types';

export const featuredResources: Resource[] = [
  {
    title: 'Complete Guide to CAC Business Registration',
    type: 'guide',
    category: 'compliance',
    duration: '15 min read',
    rating: 4.9,
    description: 'Step-by-step guide to registering your business with the Corporate Affairs Commission',
    tags: ['CAC', 'Registration', 'Legal'],
    featured: true
  },
  {
    title: 'Understanding Nigerian Tax Obligations',
    type: 'video',
    category: 'finance',
    duration: '22 min watch',
    rating: 4.8,
    description: 'Comprehensive overview of tax requirements for Nigerian businesses',
    tags: ['Tax', 'FIRS', 'Compliance'],
    featured: true
  },
  {
    title: 'NDPR Compliance Checklist',
    type: 'template',
    category: 'compliance',
    duration: '5 min read',
    rating: 4.7,
    description: 'Essential checklist to ensure your business complies with data protection laws',
    tags: ['NDPR', 'Data Protection', 'Privacy'],
    featured: true
  }
];

export const allResources: Resource[] = [
  {
    title: 'Employment Contract Templates',
    type: 'template',
    category: 'hr',
    duration: 'Download',
    description: 'Ready-to-use employment contract templates for Nigerian businesses',
    tags: ['HR', 'Contracts', 'Employment']
  },
  {
    title: 'Bookkeeping Best Practices',
    type: 'guide',
    category: 'finance',
    duration: '12 min read',
    description: 'Essential bookkeeping practices for small business owners',
    tags: ['Bookkeeping', 'Finance', 'Records']
  },
  {
    title: 'Social Media Marketing for Nigerian Businesses',
    type: 'course',
    category: 'marketing',
    duration: '45 min course',
    description: 'Learn effective social media strategies for the Nigerian market',
    tags: ['Social Media', 'Marketing', 'Digital']
  },
  {
    title: 'VAT Registration and Compliance',
    type: 'guide',
    category: 'finance',
    duration: '10 min read',
    description: 'When and how to register for VAT in Nigeria',
    tags: ['VAT', 'Tax', 'Registration']
  },
  {
    title: 'Payroll Management Template',
    type: 'template',
    category: 'hr',
    duration: 'Download',
    description: 'Excel template for managing employee payroll and deductions',
    tags: ['Payroll', 'HR', 'Templates']
  },
  {
    title: 'Business Plan Template',
    type: 'template',
    category: 'operations',
    duration: 'Download',
    description: 'Comprehensive business plan template for Nigerian startups',
    tags: ['Business Plan', 'Strategy', 'Template']
  }
];

export const learningTracks: LearningTrack[] = [
  {
    title: 'New Business Owner Essentials',
    description: 'Everything you need to know to start and run your business legally',
    lessons: 8,
    duration: '2 hours',
    level: 'Beginner',
    progress: 0
  },
  {
    title: 'Tax Compliance Mastery',
    description: 'Master Nigerian tax requirements and stay compliant',
    lessons: 6,
    duration: '1.5 hours',
    level: 'Intermediate',
    progress: 33
  },
  {
    title: 'HR and Employment Law',
    description: 'Navigate employment laws and build strong HR practices',
    lessons: 10,
    duration: '3 hours',
    level: 'Advanced',
    progress: 75
  }
];
