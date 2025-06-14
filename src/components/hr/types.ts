
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Contract' | 'Intern';
  joinDate: string;
}

export interface LeaveRequest {
  id: number;
  name: string;
  type: string;
  dates: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ContractData {
  type: string;
  role: string;
  salary: string;
  startDate: Date | undefined;
}

export interface NewMemberForm {
  name: string;
  role: string;
  status: string;
}

export interface RecentContract {
  name: string;
  type: string;
  date: string;
}
