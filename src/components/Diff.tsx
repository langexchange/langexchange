import { Typography } from "antd";

interface Props {
  originalText: string;
  correctedText: string;
  mode?: "characters" | "words";
  style?: React.CSSProperties;
  className?: string;
  code?: boolean;
  strikeThrough?: boolean;
}

const Diff = ({
  originalText = "",
  correctedText = "",
  mode = "words",
  className,
  style,
  code = false,
  strikeThrough = false,
}: Props) => {
  const styles = {
    added: {
      color: "#53c51a",
      backgroundColor: "#f6ffec",
    },
    removed: {
      color: "#ff4d4f",
      backgroundColor: "#fff2f0",
      textDecoration: strikeThrough ? "line-through" : "none",
    },
  };
  const diff = require("diff");
  let groups = [];

  if (mode === "characters")
    groups = diff.diffChars(originalText, correctedText);
  if (mode === "words") groups = diff.diffWords(originalText, correctedText);

  const mappedNodes = groups.map((group: any, index: number) => {
    const { value, added, removed } = group;
    let nodeStyles;
    if (added) nodeStyles = styles.added;
    if (removed) nodeStyles = styles.removed;
    return (
      <span style={nodeStyles} key={index}>
        {value}
      </span>
    );
  });

  if (code) {
    return (
      <Typography.Paragraph>
        <pre style={style} className={className}>
          {mappedNodes}
        </pre>
      </Typography.Paragraph>
    );
  } else {
    return (
      <span style={style} className={className}>
        {mappedNodes}
      </span>
    );
  }
};

export default Diff;
