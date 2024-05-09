import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

export default function BudgetTracker() {
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: percentage === 100 ? '#DC2626' : '#3b82f6',
                    })}
                    text={`${percentage}% Spend`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <motion.button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={() => dispatch({ type: 'reset-app' })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Reset App
                </motion.button>

                <AmountDisplay
                    label="Budget"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Available"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Spent"
                    amount={totalExpenses}
                />
            </div>
        </motion.div>
    );
}
