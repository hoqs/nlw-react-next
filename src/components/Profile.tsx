import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
import {Level} from '../components/Level'

export function Profile(){
    const {level} = useContext(ChallengesContext);
    return(<div  className={styles.profileContainer}>
        <img src="https://github.com/hoqs.png">
        </img>
        <div>
            <strong>
                Henrique Oliveira
            </strong>
            
            <Level/>
        
        </div>
    </div>);
}