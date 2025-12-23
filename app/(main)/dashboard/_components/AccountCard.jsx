"use client";

import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Switch } from '@/components/ui/switch';
import { ArrowDownRight, ArrowUpRight, Trash2, CreditCard, Wallet, PiggyBank, Building2 } from 'lucide-react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { updateDefaultAccount, deleteAccount } from '@/actions/accounts';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Account type icons and colors
const accountTypeConfig = {
  CHECKING: { icon: CreditCard, gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
  SAVINGS: { icon: PiggyBank, gradient: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' },
  CREDIT: { icon: CreditCard, gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
  INVESTMENT: { icon: Building2, gradient: 'from-orange-500 to-amber-500', bg: 'from-orange-50 to-amber-50' },
  CURRENT: { icon: Wallet, gradient: 'from-indigo-500 to-blue-500', bg: 'from-indigo-50 to-blue-50' },
};

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;
  const config = accountTypeConfig[type] || accountTypeConfig.CURRENT;
  const IconComponent = config.icon;

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
    if (isDefault) {
      toast.warning("You need at least 1 default account");
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
    <Card className={`group relative overflow-hidden bg-gradient-to-br ${config.bg} border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      {/* Decorative gradient orb */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${config.gradient} rounded-full opacity-10 group-hover:opacity-20 blur-2xl transition-opacity`} />

      {/* Default badge */}
      {isDefault && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-sm">
            Default
          </span>
        </div>
      )}

      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-8">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-gray-800">{name}</CardTitle>
              <p className="text-xs text-gray-500 capitalize">{type.toLowerCase()} Account</p>
            </div>
          </div>
          <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
            <Switch
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              disabled={deleteLoading}
              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className={`text-3xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            ${parseFloat(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between text-sm border-t border-gray-100/50 pt-4 mt-2">
          <div className="flex items-center gap-1.5 text-green-600 font-medium">
            <div className="p-1 rounded-full bg-green-100">
              <ArrowUpRight className="h-3 w-3" />
            </div>
            Income
          </div>
          <div className="flex items-center gap-1.5 text-red-500 font-medium">
            <div className="p-1 rounded-full bg-red-100">
              <ArrowDownRight className="h-3 w-3" />
            </div>
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default AccountCard
