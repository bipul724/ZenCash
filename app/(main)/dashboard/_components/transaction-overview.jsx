"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Receipt, ChevronRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const COLORS = [
  { bg: "bg-blue-500", light: "bg-blue-100" },
  { bg: "bg-emerald-500", light: "bg-emerald-100" },
  { bg: "bg-purple-500", light: "bg-purple-100" },
  { bg: "bg-amber-500", light: "bg-amber-100" },
  { bg: "bg-rose-500", light: "bg-rose-100" },
  { bg: "bg-cyan-500", light: "bg-cyan-100" },
  { bg: "bg-indigo-500", light: "bg-indigo-100" },
];

// Simple date formatter (no library needed)
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatRelativeDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Calculate total and percentages
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, val) => sum + val, 0);
  const expenseData = Object.entries(expensesByCategory)
    .map(([category, amount], index) => ({
      name: category,
      value: amount,
      percentage: ((amount / totalExpenses) * 100).toFixed(1),
      color: COLORS[index % COLORS.length]
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-5 blur-3xl" />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <Receipt className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Recent Transactions
            </CardTitle>
          </div>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[160px] bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="space-y-1">
          {recentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-2xl bg-gray-100 mb-4">
                <Receipt className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No recent transactions</p>
              <p className="text-sm text-gray-400 mt-1">Start tracking your spending</p>
            </div>
          ) : (
            <>
              {recentTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer",
                    index !== recentTransactions.length - 1 && "border-b border-gray-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      transaction.type === "EXPENSE" ? "bg-red-100" : "bg-green-100"
                    )}>
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {transaction.description || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatRelativeDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "text-sm font-bold",
                    transaction.type === "EXPENSE" ? "text-red-600" : "text-green-600"
                  )}>
                    {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}

              <Link
                href={`/account/${selectedAccountId}`}
                className="flex items-center justify-center gap-1 mt-4 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
              >
                View All Transactions
                <ChevronRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50/30 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-5 blur-3xl" />

        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Monthly Expenses
              </CardTitle>
              <p className="text-sm text-gray-500">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {expenseData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-2xl bg-purple-100 mb-4">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-gray-500 font-medium">No expenses this month</p>
              <p className="text-sm text-gray-400 mt-1">Your spending will appear here</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Total */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <span className="text-sm font-medium text-gray-600">Total Expenses</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Category Bars */}
              <div className="space-y-4">
                {expenseData.slice(0, 5).map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", item.color.bg)} />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {item.name.toLowerCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ${item.value.toFixed(2)}
                        <span className="text-gray-400 ml-1">({item.percentage}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700", item.color.bg)}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}