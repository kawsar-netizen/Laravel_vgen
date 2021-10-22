import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { useStyles } from "../BaseStyles/BaseStyles";

const Rating = ({ rating }) => {
  const classes = useStyles();
  let totalStars = [];
  console.log(rating)
  let i;
  for (i = 0; i < 5; i++) {
    if (i < rating) {
      totalStars.push(
        <li className={classes.increaseStar} key={i}>
          <StarIcon className={classes.iconSize}/>
        </li>
      );
    } else {
      totalStars.push(
        <li className={classes.decreaseStar} key={i}>
          <StarIcon className={classes.iconSize} />
        </li>
      );
    }
  }
  return (
    <div className={classes.starRating}>
      <ul className={classes.starList}>{totalStars}</ul>
    </div>
  );
};

export default Rating;
