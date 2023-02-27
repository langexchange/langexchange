import { Col, Image, Row } from "antd";
import { useState } from "react";
import Vocabulary from "../../types/Vocabulary";
import classes from "./FlashCard.module.scss";

const FlashCard: React.FC<Vocabulary> = ({ id, term, define, image }) => {
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
        {image ? (
          <Row wrap={false} align="middle">
            <Col span={16}>
              <span className="text-300" style={{ fontSize: "48px" }}>
                {define}
              </span>
            </Col>
            <Col span={8}>
              <Image
                src={image}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
            </Col>
          </Row>
        ) : (
          define
        )}
      </div>
    </div>
  );
};

export default FlashCard;
