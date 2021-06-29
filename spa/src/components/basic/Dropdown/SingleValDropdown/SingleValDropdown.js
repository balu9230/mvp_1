import React from 'react';

export default function SingleValDropdown({ props }) {
  
  const {
    select_classname,
    select_name,
    select_id,
    option_classname,
    options_data,
    special_onchange,
    selected_option,
    select_disabled,
  } = props;

  return (
    <select 
      className={select_classname} name={select_name} 
      id={select_id} onChange={special_onchange} 
      value={selected_option} disabled={select_disabled}
    >
      {
        options_data.map((el, idx) => 
          <option 
            className={option_classname} 
            key={'option_'+idx+'_'+el['option_value']} value={el['option_value']}
          >
            {el['option_display_value']}
          </option>
      )}
    </select>
  );
}