interface Props {
  originalText: string;
  correctedText: string;
  mode?: "characters" | "words";
}

const styles = {
  added: {
    color: "#53c51a",
    backgroundColor: "#f6ffec",
  },
  removed: {
    color: "#ff4d4f",
    backgroundColor: "#fff2f0",
  },
};

const Diff = ({
  originalText = "",
  correctedText = "",
  mode = "words",
}: Props) => {
  const diff = require("diff");
  let groups = [];

  if (mode === "characters")
    groups = diff.diffChars(originalText, correctedText);
  if (mode === "words") groups = diff.diffWords(originalText, correctedText);

  const mappedNodes = groups.map((group: any) => {
    const { value, added, removed } = group;
    let nodeStyles;
    if (added) nodeStyles = styles.added;
    if (removed) nodeStyles = styles.removed;
    return <span style={nodeStyles}>{value}</span>;
  });

  return <span>{mappedNodes}</span>;
};

export default Diff;
