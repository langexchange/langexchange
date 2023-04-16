import { Col, Image, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Vocabulary } from "../../services/vocabulary/vocabularyService";
import classes from "./FlashCard.module.scss";

const FlashCard: React.FC<Vocabulary> = ({ term, define, imageUrl }) => {
  const [side, setSide] = useState<boolean>(false);
  const [t] = useTranslation(["commons"]);

  const handleClick = () => setSide(!side);

  return (
    <div
      className={`${classes.card} ${side ? classes.side : ""}`}
      onClick={handleClick}
    >
      <div className={classes.title}>{side ? t("Define") : t("Term")}</div>
      <div className={classes.front}>{term}</div>
      <div className={classes.back}>
        {imageUrl ? (
          <Row wrap={false} align="middle" gutter={12}>
            <Col span={16}>
              <span className="text-300" style={{ fontSize: "46px" }}>
                {define}
              </span>
            </Col>
            <Col span={8}>
              <Image
                src={imageUrl}
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
