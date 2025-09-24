"use client";

import React, { use, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Switch } from '@/components/ui/switch';
import { parse } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { updateDefaultAccount, deleteAccount } from '@/actions/accounts';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const AccountCard = ({ account }) => {
    const { name, type , balance , id , isDefault } = account;

    const {
    loading: updateDefaultLoading,
    fn: updateDefaultAccountFn,
    error,
    data: updatedAccount,
    } = useFetch(updateDefaultAccount);

    const {
      loading: deleteLoading,
      fn: deleteAccountFn,
      data: deleteResult,
    } = useFetch(deleteAccount);

    const handleDefaultChange = async (event) => {
        event.preventDefault();
        if(isDefault){
          toast.warning("You need atleast 1 default account");
          return;
        }

        await updateDefaultAccountFn(id);
    }

    useEffect(() => {
      if (updatedAccount?.success) {
        toast.success("Default account updated successfully");
      }
    }, [updatedAccount, updateDefaultLoading]);

    useEffect(() => {
      if (error) {
        toast.error(error.message || "Failed to update default account");
      }
    }, [error]);

    const onDelete = async (e) => {
      e.preventDefault();
      const confirmed = window.confirm('Delete this account? This will also delete its transactions.');
      if (!confirmed) return;
      const res = await deleteAccountFn(id);
      if (res?.success) {
        toast.success('Account deleted');
      }
    }

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
      <Link href={`/account/${id}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm  font-medium">{name}</CardTitle>
        <div className="flex items-center gap-2">
          <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading} />
          <Button size="icon" variant="outline" onClick={onDelete} disabled={deleteLoading}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
            ${parseFloat(balance).toFixed(2)}
        </div>
        <div className='text-sm text-muted-foreground '>
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className='flex items-center'>
            <ArrowUpRight className='mr-1 h-4 w-4 text-green-500' />
            Income
        </div>
        <div className='flex items-center'>
            <ArrowDownRight className='mr-1 h-4 w-4 text-red-500' />
            Expense
        </div>

      </CardFooter>
      </Link>
    </Card>
  )
}

export default AccountCard
