import React, { useState, useRef } from 'react';
import styles from './SlicerDropdown.module.scss';
import cn from 'classnames';

export default function SlicerDropdown({ props }) {
  
  const {
    id,
    question,
    options_data,
    select_disabled,
  } = props;

  const [valOne, setValOne] = useState(25);
  const [valTwo, setValTwo] = useState(62);
  const [valThree, setValThree] = useState(87);

  let [val1, val2, val3, val4] = [3, 3, 3, 3];
  let total = 12;

  function HandlerValOne(e) {
    const newV = Math.min(parseInt(e.target.value), valTwo);
    setValOne(newV);
  }

  function HandlerValTwo(e) {
    const value = parseInt(e.target.value);
    let newV;
    if (value < valOne) {
      setValTwo(valOne);
      newV = valOne;
    } else if (value > valThree) {
      setValTwo(valThree);
      newV = valThree;
    } else {
      setValTwo(value);
      newV = value;
    }
  }

  function HandlerValThree(e) {
    const newV = Math.max(parseInt(e.target.value), valTwo);
    setValThree(newV);
  }

  return (
    <div className={styles.CardLayout}>
      <div className={styles.Card}>
        <div className={styles.Question}>{question}</div>
        <div className={styles.SelectionSection}>
          <SelectNCounter id={1} count={valOne} options_data={options_data} select_disabled={select_disabled}/>
          <SelectNCounter id={2} count={valTwo-valOne} options_data={options_data} select_disabled={select_disabled}/>
          <SelectNCounter id={3} count={valThree-valTwo} options_data={options_data} select_disabled={select_disabled}/>
          <SelectNCounter id={4} count={100-valThree} options_data={options_data} select_disabled={select_disabled}/>
        </div>
        <div className={styles.RangeSection}>
          {/* codementor issue */}
          <input className={cn(styles.SliderInput, styles.One)} type="range" id="ip_1" 
            min="0" max="100" value={valOne.toString()} onChange={HandlerValOne}></input>
          <input className={cn(styles.SliderInput, styles.Two)} type="range" id="ip_2" 
            min="0" max="100" value={valTwo.toString()} onChange={HandlerValTwo}></input>
          <input className={cn(styles.SliderInput, styles.Three)} type="range" id="ip_3" 
            min="0" max="100" value={valThree.toString()} onChange={HandlerValThree}></input>
          <div className={styles.RangesNThumb}>
            <div className={styles.vertiAlign}>
              <div className={cn(styles.Thumb, styles["Left"+valOne])}></div>
              <div className={cn(styles.Thumb, styles["Left"+valTwo])}></div>
              <div className={cn(styles.Thumb, styles["Left"+valThree])}></div>
            </div>
          </div>
          {/* codementor issue */}
        </div>
      </div>
    </div>
  );
}

export function SelectNCounter({id, count, options_data, select_disabled}) {

  return (
    <div className={styles.SelectNCounter}>
      <select className={styles.Select} name={"select_"+id} id={id} disabled={select_disabled}>
        {
          options_data.map((el, idx) => 
            <option className={styles.Option} key={idx} value={el['option_value']}>
              {el['option_display_value']}
            </option>
        )}
      </select>
      <div className={styles.Counter}>{count}</div>
    </div>
  );
}