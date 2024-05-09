import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    };
    
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } });
    };

    return (
        <motion.form
            className="space-y-5"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Define a budget
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="$25,$50,$75..."
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <motion.input
                type="submit"
                value="Create"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            />
        </motion.form>
    );
}
