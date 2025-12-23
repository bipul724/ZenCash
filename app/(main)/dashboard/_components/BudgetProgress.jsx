"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Target, TrendingUp } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const remaining = initialBudget ? initialBudget.amount - currentExpenses : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const getProgressColor = () => {
    if (percentUsed >= 90) return "from-red-500 to-red-600";
    if (percentUsed >= 75) return "from-orange-400 to-amber-500";
    if (percentUsed >= 50) return "from-yellow-400 to-orange-400";
    return "from-green-400 to-emerald-500";
  };

  const getStatusColor = () => {
    if (percentUsed >= 90) return "text-red-600 bg-red-50";
    if (percentUsed >= 75) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border border-gray-100 shadow-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400 to-cyan-500 rounded-full opacity-5 blur-3xl" />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Monthly Budget
            </CardTitle>
            <CardDescription className="text-gray-500">
              Default Account Tracking
            </CardDescription>
          </div>
        </div>

        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {isEditing ? (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-gray-500">$</span>
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter budget amount"
              autoFocus
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleUpdateBudget}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Budget</p>
                <p className="text-xl font-bold text-gray-900">
                  ${initialBudget?.amount?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Spent</p>
                <p className="text-xl font-bold text-orange-600">
                  ${currentExpenses?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Remaining</p>
                <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(remaining).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {initialBudget && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor()}`}>
                    {percentUsed >= 100 ? "Over Budget!" : percentUsed >= 75 ? "Almost There" : "On Track"}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {percentUsed.toFixed(0)}% used
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}