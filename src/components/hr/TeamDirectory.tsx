
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TeamMember, NewMemberForm } from './types';

interface TeamDirectoryProps {
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
}

export const TeamDirectory: React.FC<TeamDirectoryProps> = ({
  teamMembers,
  setTeamMembers
}) => {
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState<NewMemberForm>({
    name: '',
    role: '',
    status: 'Active'
  });
  const { toast } = useToast();

  const addTeamMember = () => {
    if (!newMemberForm.name || !newMemberForm.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: newMemberForm.name,
      role: newMemberForm.role,
      status: newMemberForm.status as 'Active' | 'Contract' | 'Intern',
      joinDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberForm({ name: '', role: '', status: 'Active' });
    setShowAddMemberForm(false);
    
    toast({
      title: "Team Member Added",
      description: `${newMemberForm.name} has been added to the team.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Team Directory</h3>
        <Button 
          className="bg-blue-900 hover:bg-blue-800"
          onClick={() => setShowAddMemberForm(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {showAddMemberForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-4">Add New Team Member</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="member-name">Name</Label>
                <Input
                  id="member-name"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({...newMemberForm, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="member-role">Role</Label>
                <Input
                  id="member-role"
                  value={newMemberForm.role}
                  onChange={(e) => setNewMemberForm({...newMemberForm, role: e.target.value})}
                  placeholder="Enter role"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addTeamMember} className="bg-emerald-600 hover:bg-emerald-700">
                Add Member
              </Button>
              <Button variant="outline" onClick={() => setShowAddMemberForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    member.status === 'Active' ? 'bg-green-100 text-green-800' :
                    member.status === 'Contract' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
