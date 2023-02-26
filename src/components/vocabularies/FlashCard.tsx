import { faker } from "@faker-js/faker";
import { Col, Image, Row } from "antd";
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
      <div className={classes.back}>
        <Row wrap={false} align="middle">
          <Col span={16}>
            <span className="text-300" style={{ fontSize: "48px" }}>
              {define}
            </span>
          </Col>
          <Col span={8}>
            <Image
              src={faker.image.nightlife()}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FlashCard;
