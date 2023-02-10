import { Tabs, Input } from "antd";
import type { TabsProps } from "antd";
import StudySpaceList from "../studySpaces/StudySpaceList";

const { Search } = Input;

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `All study spaces`,
    children: <StudySpaceList colSpan={8} isJoined={true} />,
  },
  {
    key: "2",
    label: `Academic study spaces`,
    children: <StudySpaceList colSpan={8} isJoined={true} />,
  },
  {
    key: "3",
    label: `Intersting study spaces`,
    children: <StudySpaceList colSpan={8} isJoined={true} />,
  },
];

const onSearch = (value: string) => console.log(value);

const StudySpaceTabs = () => {
  return (
    <div>
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarExtraContent={
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 400 }}
          />
        }
      />
    </div>
  );
};

export default StudySpaceTabs;
