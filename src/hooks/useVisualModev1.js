import { useState } from "react";
// credit to: https://github.com/yuzhakova/scheduler/blob/master/src/hooks/useVisualMode.js
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    const transition = (newMode, replace) => {
        if (!replace) {
            setMode((prev) => newMode);
            let newModeTrans = [...history];
            newModeTrans.push(newMode);
            setHistory((prev) => newModeTrans);
        } else {
            setMode((prev) => newMode)
            let replaceHistory = [...history];
            replaceHistory[replaceHistory.length - 1] = mode;
            setHistory((prev) => replaceHistory);
        }
    }
    const back = () => {
        let newModeTrans = [...history];
        newModeTrans.pop(mode);
        setHistory((prev) => newModeTrans);
        if (history.length > 1) {
            setMode((prev) => newModeTrans[(newModeTrans.length - 1)]);
        }
    }
    return { mode, transition, back };
}

