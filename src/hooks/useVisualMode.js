import { useState } from "react";
// edit with Vishesh's help
export default function useVisualMode(initial) {
    const [history, setHistory] = useState([initial]);
    
    const transition = (mode, replace) => {
        // replace is to address the back() issue when users click cancel, or encountring error, and needs to go back to what they previously did.
        setHistory(prev => {
            if (!replace) {
                return [...prev, mode]
                // stay in current MODE after onClose() the ERROR mode
            } else {
                return [...prev.slice(0, prev.length - 1), mode];
                // using slice() instead of pop() to ensure we are getting the very last mode when users back()
            }
        });
    }

    const back = () => {
        setHistory((prev) => {
            if (prev.length < 2) {
                return prev;
                // to prevent backing out of all the MODEs.
            }
            
            return prev.slice(0, prev.length - 1);
        });       
    }
    return { mode: history[history.length - 1], transition, back };
    // mode is the most current history state
}

