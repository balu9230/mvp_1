import React from 'react';
import styles from './Bid.module.scss';
import BidUnit from './BidUnit/BidUnit';

// @Dev: user selections must be cached
export default function Bid (props) {

  
  let bid_elements = [
    {
      "element_name": "time_slot",
      "title": "Votes for today's Live Time Slot",
      "chart": null,
      "user_prompt": "Select all time slots that are suitable for you and vote.",
      "path": ""
    },
    {
      "element_name": "chat_duration",
      "title": "Votes for today's Single Chat Duration",
      "chart": null,
      "user_prompt": "Select all chat durations that are suitable for you and vote."
    }
  ];
  
  /*
  let bid_elements = [
    {
      "element_name": "time_slot",
      "title": "Votes for today's Live Time Slot",
      "chart": null,
      "user_prompt": "Select all time slots that are suitable for you and vote.",
      "path": ""
    }
  ];
  */
  
  return (
    <div className={styles.Bid}>
      {
        bid_elements.map(
            (el, index) => <BidUnit 
            key={el["element_name"]+"_bidUnit"} 
            parity={index%2 === 0 ? "Even": "Odd"} 
            type={el["element_name"]} params={el}/>
          )
      }
    </div>
  );
}