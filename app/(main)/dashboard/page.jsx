import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Wallet, TrendingUp, PiggyBank } from 'lucide-react';
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
    <Card className="border border-gray-100 bg-gradient-to-br from-white to-blue-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-5 mb-6 shadow-lg">
          <Wallet className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Create Your First Account
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm leading-relaxed">
          Start your financial journey by creating an account to track your income, expenses, and savings.
        </p>
        <CreateAccountDrawer>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Account
          </button>
        </CreateAccountDrawer>
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
      {/* Budget Progress Section */}
      {defaultAccount && budgetData && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview Cards */}
      {accounts && accounts.length > 0 && (
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      )}

      {/* Account Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Accounts</h2>
          <span className="text-sm text-gray-500">{accounts?.length || 0} accounts</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Add New Account Card */}
          <CreateAccountDrawer>
            <Card className="group cursor-pointer border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[180px] pt-6">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-4 mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300 group-hover:scale-110">
                  <Plus className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <p className="text-sm font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">
                  Add New Account
                </p>
                <p className="text-xs text-gray-400 mt-1">Track more finances</p>
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
    </div>
  );
};

export default DashboardPage;