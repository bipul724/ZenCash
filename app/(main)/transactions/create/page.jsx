import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {editId
              ? "Update the details of your transaction below"
              : "Track your income and expenses with ease"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
          <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={!!editId}
            initialData={initialData}
          />
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400 mt-6">
          💡 Tip: Use the AI receipt scanner to automatically fill in transaction details
        </p>
      </div>
    </div>
  );
}