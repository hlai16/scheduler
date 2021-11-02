import { useState } from "react";
// update with Vishesh's help
export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]);

    const transition = (mode, replace) => {
        setHistory(prev => {
            if (!replace) {
                return [...prev, mode]
            } else {
                return [...prev.slice(0, prev.length - 1), mode];
            }
        });
    }

    const back = () => {
        setHistory((prev) => {
            if (prev.length < 2) {
                return prev;
            }
            
            return prev.slice(0, prev.length - 1);
        });       
    }
    return { mode: history[history.length - 1], transition, back };
}

