import { Tabs } from "antd";
import type { TabsProps } from "antd";
import StudySpaceList from "../studySpaces/StudySpaceList";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `All study spaces`,
    children: <StudySpaceList colSpan={12} isJoined={true} />,
  },
  {
    key: "2",
    label: `Academic study spaces`,
    children: <StudySpaceList colSpan={12} isJoined={true} />,
  },
  {
    key: "3",
    label: `Intersting study spaces`,
    children: <StudySpaceList colSpan={12} isJoined={true} />,
  },
];

const StudySpaceTabs = () => {
  return (
    <div>
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default StudySpaceTabs;
