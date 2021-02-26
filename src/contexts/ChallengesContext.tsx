import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import { CountdownContext } from './CountdownContext';


interface Challenge{
    type: 'body' | 'eye';
    description:string;
    amount:number;
}


interface ChallengesContextData{
    level:number;
    levelUp:()=>void;
    currentExperience:number; 
    challengesCompleted:number;
    startNewChallenge:()=>void;
    activeChallenge:Challenge;
    expericeToNextLevel:number;
    resetChallenge:()=>void;
    completeChallenge:()=>void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}:ChallengesProviderProps){

    const[level, setLevel] = useState(1);
    const[currentExperience, setCurrentExperience] = useState(0);
    const[challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const expericeToNextLevel = Math.pow((level+1)*4,2);



    useEffect(()=>{
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel(level + 1);
        
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission != 'granted'){
            new Notification('Novo Desafio!',{body:`Valendo ${challenge.amount}xp!`})
        }
    }

    function resetChallenge(){
    setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= expericeToNextLevel){
            finalExperience = finalExperience - expericeToNextLevel;
            setCurrentExperience(finalExperience);
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        resetChallenge();
    }
    return(
    <ChallengesContext.Provider value={{
    level, 
    levelUp, 
    currentExperience, 
    challengesCompleted, 
    startNewChallenge, 
    activeChallenge, 
    expericeToNextLevel, 
    resetChallenge, 
    completeChallenge}}>
        {children}
    </ChallengesContext.Provider>
    );
}