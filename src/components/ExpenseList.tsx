import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";
import { motion } from "framer-motion";

export default function ExpenseList() {
    const { state } = useBudget();
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

    return (
        <motion.div
            className="mt-10 bg-white shadow-lg rounded-lg p-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No expenses</p> : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">List of Expenses.</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </motion.div>
    );
}
