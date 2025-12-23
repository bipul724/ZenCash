"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Wallet, CreditCard, Tag, FileText, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import CreateAccountDrawer from "@/components/createAccountDrawer";
import useFetch from "@/hooks/useFetch";
import { ReceiptScanner } from "./receipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
          type: initialData.type,
          amount: initialData.amount.toString(),
          description: initialData.description,
          accountId: initialData.accountId,
          category: initialData.category,
          date: new Date(initialData.date),
          isRecurring: initialData.isRecurring,
          ...(initialData.recurringInterval && {
            recurringInterval: initialData.recurringInterval,
          }),
        }
        : {
          type: "EXPENSE",
          amount: "",
          description: "",
          accountId: accounts.find((ac) => ac.isDefault)?.id,
          date: new Date(),
          isRecurring: false,
        },
  });


  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
    error: transactionError,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);


  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/*AI Receipt Scanner */}
      {!editMode && <ReceiptScanner onScanComplete={handleScanComplete} />}

      {/* Transaction Type Toggle */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("type", "EXPENSE")}
            className={cn(
              "px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border-2",
              type === "EXPENSE"
                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white border-transparent shadow-lg shadow-red-500/25"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-red-300 hover:bg-red-50"
            )}
          >
            💸 Expense
          </button>
          <button
            type="button"
            onClick={() => setValue("type", "INCOME")}
            className={cn(
              "px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border-2",
              type === "INCOME"
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-lg shadow-emerald-500/25"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
            )}
          >
            💰 Income
          </button>
        </div>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Amount and Account - Two Column */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span className="text-lg">$</span>
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount")}
              className="pl-8 h-12 text-lg font-medium bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gray-400" />
            Account
          </label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="w-full h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-400 rounded-xl">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {account.name} (${parseFloat(account.balance).toFixed(2)})
                  </span>
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground text-blue-600"
                >
                  + Create New Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          Category
        </label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue={getValues("category")}
        >
          <SelectTrigger className="w-full h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-400 rounded-xl">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 pl-4 text-left font-normal bg-gray-50/50 border-gray-200 hover:bg-white hover:border-blue-400 rounded-xl justify-start",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "EEEE, MMMM do, yyyy") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 text-gray-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          Description
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <Input
          placeholder="e.g., Coffee at Starbucks"
          {...register("description")}
          className="w-full h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Recurring Toggle */}
      <div className="flex flex-row items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50/50 to-blue-50/30 p-4 hover:border-blue-200 transition-colors">
        <div className="space-y-0.5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Recurring Transaction</label>
            <div className="text-xs text-gray-500">
              Automatically repeat this transaction
            </div>
          </div>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
          className="data-[state=checked]:bg-blue-600"
        />
      </div>

      {/* Recurring Interval */}
      {isRecurring && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label className="text-sm font-semibold text-gray-700">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="w-full h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-400 rounded-xl">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DAILY">📅 Daily</SelectItem>
              <SelectItem value="WEEKLY">📆 Weekly</SelectItem>
              <SelectItem value="MONTHLY">🗓️ Monthly</SelectItem>
              <SelectItem value="YEARLY">📊 Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 rounded-xl border-gray-200 hover:bg-gray-50 font-medium"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 font-semibold"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}