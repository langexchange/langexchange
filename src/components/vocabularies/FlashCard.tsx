import { useState } from "react";
import classes from "./FlashCard.module.scss";

interface CardProps {
  id: string;
  term: string;
  define: string;
}

const FlashCard = ({ id, term, define }: CardProps) => {
  const [side, setSide] = useState<boolean>(false);

  function handleClick() {
    console.log("clicked!");
    setSide(!side);
    console.log(side);
  }

  return (
    <div
      className={`${classes.card} ${side ? classes.side : ""}`}
      onClick={handleClick}
    >
      <div className={classes.title}>{side ? "Define" : "Term"}</div>
      <div className={classes.front}>{term}</div>
      <div className={classes.back}>{define}</div>
    </div>
  );
};

export default FlashCard;
