import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard';
import { getCurrentBudget } from '@/actions/budget';

// All normal imports now
import CreateAccountDrawer from '@/components/createAccountDrawer';
import AccountCard from './_components/AccountCard';
import { BudgetProgress } from './_components/BudgetProgress';
import { DashboardOverview } from './_components/transaction-overview';

// Empty state component
const EmptyAccountsState = () => (
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
);

const DashboardPage = async () => {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className='space-y-8'>
      {defaultAccount && budgetData && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {accounts && accounts.length > 0 && (
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      )}

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
          <EmptyAccountsState />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;