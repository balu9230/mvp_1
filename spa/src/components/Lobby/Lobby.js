import React from 'react';
import styles from './Lobby.module.scss';
import PathwaySolo from './Solo/Pathway/Pathway';
import SeatSolo from './Solo/Seat/Seat';
import PathwayDual from './Dual/Pathway/Pathway';
import SeatDual from './Dual/Seat/Seat';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modeState, toggleModeState } from '../globalState/modeState';
import { seatedState, toggleSeatedState } from '../globalState/seatedState';

export default function Lobby (props) {

  const mode = useRecoilValue(modeState);
  const seated = useRecoilValue(seatedState);
  const toggleSeated = useSetRecoilState(toggleSeatedState);

  return (
    <div className={styles.Lobby}>
      {console.log(`seated: ${seated}`)}
      {
        mode === "solo" ?
        (
          <>
            {console.log(`seated Mode Solo: ${seated}`)}
            {seated ? <SeatSolo /> : <PathwaySolo toSeatCB={toggleSeated}/>}
          </>
        )
        :
        (
          <>
            {seated ? <SeatDual /> : <PathwayDual toSeatCB={toggleSeated}/>}
          </>
        )
      }
    </div>
  );
};