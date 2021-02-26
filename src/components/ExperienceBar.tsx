import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar () {
    const {currentExperience, expericeToNextLevel} = useContext(ChallengesContext);
    let percentual = (currentExperience*100);

    return(<header className={styles.experienceBar}>
        <span> 0 xp </span>
            <div>
                <div style={{width:percentual/expericeToNextLevel+'%'}} />
                <span className={styles.currentExperience} style={{left:percentual/expericeToNextLevel+'%'}}>{currentExperience} xp</span>
            </div>
            <span> {expericeToNextLevel} xp </span>
    </header>);
}