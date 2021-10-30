import { useState } from "react";

export default function useVisualMode (initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    const transition = (newMode, replace) => {
        if (!replace) {
            setMode((prev) => newMode);
            let newModeTrans = [...history];
            newModeTrans.push(newMode);
            setHistory((prev) => newModeTrans);
        }
    }
    const back = () => {
        let newModeTrans = [...history];
        newModeTrans.pop(mode);
        setHistory((prev) => newModeTrans);
        setMode((prev) => newModeTrans[(newModeTrans.length - 1)]);
    }
    return { mode, transition, back };
}

