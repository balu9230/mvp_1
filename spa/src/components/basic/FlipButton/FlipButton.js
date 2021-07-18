import React from 'react';
import styles from './FlipButton.module.scss';
import cn from 'classnames';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modeState, toggleModeState } from '../../globalState/modeState';

export default function FlipButton() {
  
  const mode = useRecoilValue(modeState);
  const toggleMode = useSetRecoilState(toggleModeState);
  
  return (
    <div class={styles.FlipButton}>
      {console.log(`Mode: ${mode}`)}
      <div class={cn(styles.Btn, mode == "solo" ? null: styles.ToggleToAlternate)}>
        <div class={cn(styles.Side, styles.DefaultSide)} onClick={toggleMode}>Solo Mode</div>
        <div class={cn(styles.Side, styles.AlternateSide)} onClick={toggleMode}>Dual Mode</div>
      </div>
    </div>
  )
}