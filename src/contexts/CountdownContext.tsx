import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout;


interface CountdownContextData{
    minutes:number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    resetCountdonw:()=>void;
    startCountdonw:()=>void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData );

export function CountdownProvider({children}: CountdownProviderProps){
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdonw() {
        setIsActive(true);
    }

    function resetCountdonw() {
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            resetCountdonw,
            startCountdonw


        }}>
            {children}
        </CountdownContext.Provider>
    )
}