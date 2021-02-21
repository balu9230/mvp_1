import React from 'react';

export default function DoubleValDropdown(props) {
  
  return (
    <div className={props.div_classname}>
      <select className={props.select_classname} name={props.select_name} id={props.select_id}>
        {props.options_data.map((el) => 
          <option className={props.option_classname} value={el['option_value']}>{el['option_display_value']}</option>
        )}
      </select>
    </div>
    
  );
}