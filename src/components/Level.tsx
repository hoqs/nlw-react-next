import React, { useContext, useEffect } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export const Level=()=>{
    const {level} = useContext(ChallengesContext);

       return(
        <p>
        <img src="icons/level.svg"/>
        Level {level}
        </p> 
       )        
    
}