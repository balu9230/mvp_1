import React from 'react';

export default function SingleValDropdown({ props }) {
  
  return (
    <select className={props.select_classname} name={props.select_name} id={props.select_id}>
      {
        props['options_data'].map((el, idx) => 
          <option 
            className={props.option_classname} 
            key={'option_'+idx+'_'+el['option_value']} value={el['option_value']}
          >
            {el['option_display_value']}
          </option>
      )}
    </select>
  );
}