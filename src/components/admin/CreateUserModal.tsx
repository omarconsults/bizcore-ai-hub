
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateUserModalProps } from './create-user/types';
import { useCreateUser } from './create-user/useCreateUser';
import CreateUserForm from './create-user/CreateUserForm';

const CreateUserModal = ({ onUserCreated }: CreateUserModalProps) => {
  const [open, setOpen] = useState(false);
  const { form, loading, onSubmit } = useCreateUser(onUserCreated);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <CreateUserForm
          form={form}
          onSubmit={onSubmit}
          loading={loading}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
