import { useState } from "react";

const useVisualMode = (initial) => {
    const [mode, setMode] = useState(initial);
    const transition = (newMode, replace) => {
        if (replace) {
            let replaceMode = [...mode];
            replaceMode[replaceMode.length - 1] = mode;
            setMode((prev) => newMode);
        }
    }
    return { mode, transition };
}

export default useVisualMode;