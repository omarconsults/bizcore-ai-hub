
import { EntityType, LaunchStep } from './types';

export const entityTypes: EntityType[] = [
  {
    type: 'Business Name',
    description: 'Simple structure for individual business owners',
    pros: ['Easy to set up', 'Complete control', 'Simple taxation'],
    cons: ['Unlimited liability', 'Limited funding options'],
    bestFor: 'Freelancers, consultants, small traders',
    cost: '₦25,000'
  },
  {
    type: 'Limited Liability Company (LLC)',
    description: 'Most popular choice for growing businesses',
    pros: ['Limited liability', 'Professional credibility', 'Easy to raise funds'],
    cons: ['More paperwork', 'Higher costs', 'Annual filings required'],
    bestFor: 'Startups, SMEs, businesses seeking investment',
    cost: '₦60,000'
  },
  {
    type: 'Private Limited Company (LTD)',
    description: 'Corporate structure with share capital and limited liability',
    pros: ['Limited liability protection', 'Separate legal entity', 'Transferable shares', 'Tax advantages'],
    cons: ['Complex compliance requirements', 'Higher setup costs', 'Mandatory audits', 'Statutory meetings required'],
    bestFor: 'Medium to large businesses, companies seeking investment, export businesses',
    cost: '₦60,000'
  },
  {
    type: 'Partnership',
    description: 'Shared ownership and responsibilities',
    pros: ['Shared costs', 'Combined expertise', 'Shared liability'],
    cons: ['Potential conflicts', 'Joint liability', 'Profit sharing'],
    bestFor: 'Professional services, joint ventures',
    cost: '₦₦50,000'
  }
];

export const createLaunchSteps = (currentStep: number): LaunchStep[] => [
  { 
    step: 'Business Name Search & Reservation', 
    status: currentStep >= 1 ? 'completed' : 'pending', 
    description: 'Check availability and reserve your business name',
    timeframe: '1-2 days'
  },
  { 
    step: 'Prepare Incorporation Documents', 
    status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'in-progress' : 'pending', 
    description: 'Memorandum and Articles of Association',
    timeframe: '2-3 days'
  },
  { 
    step: 'CAC Registration & Certificate', 
    status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'in-progress' : 'pending', 
    description: 'Submit documents and pay registration fees',
    timeframe: '5-10 days'
  },
  { 
    step: 'Tax Identification Number (TIN)', 
    status: currentStep >= 4 ? 'completed' : currentStep === 3 ? 'in-progress' : 'pending', 
    description: 'Register with Federal Inland Revenue Service',
    timeframe: '3-5 days'
  },
  { 
    step: 'Open Corporate Bank Account', 
    status: currentStep >= 5 ? 'completed' : currentStep === 4 ? 'in-progress' : 'pending', 
    description: 'Choose bank and complete account opening',
    timeframe: '1-3 days'
  },
  { 
    step: 'Business Permits & Licenses', 
    status: currentStep >= 6 ? 'completed' : currentStep === 5 ? 'in-progress' : 'pending', 
    description: 'Industry-specific licenses and permits',
    timeframe: '1-4 weeks'
  }
];
