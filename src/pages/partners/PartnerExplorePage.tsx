import { Col, Divider, FloatButton, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";
import {
  FriendSuggestionsQuery,
  useGetFriendSuggestionsQuery,
} from "../../services/friend/friendService";
import { Profile } from "../../services/profile/profileServices";

const defaultFilters: FriendSuggestionsQuery = {
  nativeLangs: [],
  targetLangs: [],
  countryCodes: [],
};

const PartnerExplorePage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [data, setData] = useState<Profile[]>([]);
  const [filters, setFilters] =
    useState<FriendSuggestionsQuery>(defaultFilters);
  const { data: suggestFriends, isLoading } = useGetFriendSuggestionsQuery(
    filters,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!suggestFriends) return;
    setData(suggestFriends);
  }, [suggestFriends, isLoading]);

  const onSearch = (value: string) => {
    if (!suggestFriends) return;

    if (!value) {
      setData(suggestFriends);
      return;
    }
    const newData = suggestFriends?.filter((item) => {
      const names = [
        item.firstName,
        item.lastName,
        `${item.firstName} ${item.lastName}`,
        `${item.lastName} ${item.firstName}`,
      ];
      return names.some((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setData(newData);
  };

  return (
    <div
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden "
      id="partner_explore"
    >
      <ContentTitleWithSearch title={t("You may know")} onSearch={onSearch} />
      <FilterLine defaultFilters={defaultFilters} setFilters={setFilters} />
      <Divider plain />
      <div className="mx-2">
        <Skeleton loading={isLoading} active>
          <ExplorePartnerList colSpan={6} partnerList={data} />
        </Skeleton>
      </div>
      <FloatButton.BackTop
        target={() => document.getElementById("partner_explore") || window}
        style={{ bottom: 154, right: 8, height: "48px", width: "48px" }}
      />
    </div>
  );
};

export default PartnerExplorePage;
