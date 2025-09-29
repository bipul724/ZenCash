import React, { Suspense } from 'react';
import CreateAccountDrawer from '@/components/createAccountDrawer';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import AccountCard from './_components/AccountCard';
import { BudgetProgress } from './_components/BudgetProgress';
import { getCurrentBudget } from '@/actions/budget';
import { DashboardOverview } from './_components/transaction-overview';

// Skeleton loaders
const BudgetSkeleton = () => (
  <div className="rounded-lg border border-gray-800 bg-black p-6">
    <div className="space-y-3">
      <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
      <div className="h-8 w-full bg-gray-800 rounded animate-pulse" />
      <div className="h-3 w-32 bg-gray-800 rounded animate-pulse" />
    </div>
  </div>
);

const OverviewSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-lg border border-gray-800 bg-black p-6">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

// Separate Budget Section for Suspense
const BudgetSection = async ({ defaultAccountId }) => {
  const budgetData = await getCurrentBudget(defaultAccountId);
  
  return (
    <BudgetProgress
      initialBudget={budgetData?.budget}
      currentExpenses={budgetData?.currentExpenses || 0}
    />
  );
};

const DashboardPage = async () => {
  // Fetch accounts and transactions in parallel
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  return (
    <div className='space-y-8'>
      {/* Budget Progress - Only show if default account exists */}
      {defaultAccount && (
        <Suspense fallback={<BudgetSkeleton />}>
          <BudgetSection defaultAccountId={defaultAccount.id} />
        </Suspense>
      )}

      {/* Overview */}
      <Suspense fallback={<OverviewSkeleton />}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Accounts grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md bg-black border-gray-800 transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2 text-cyan-400" />
              <p className="text-sm font-medium text-white">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        
        {accounts && accounts.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="col-span-full">
            <Card className="border-gray-800 bg-black/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-cyan-400/10 p-4 mb-4">
                  <Plus className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No Accounts Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Get started by creating your first account to track your finances
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;