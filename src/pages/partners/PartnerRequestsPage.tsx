import { Col, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import PartnerRequestList from "../../components/partners/PartnerRequestList";
import { useGetFriendRequestsQuery } from "../../services/friend/friendService";

const PartnerRequestsPage = () => {
  const [t] = useTranslation(["commons"]);
  const [requestList, setRequestList] = useState([]);
  const { data, isLoading, refetch } = useGetFriendRequestsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!data) return;
    setRequestList(data);
  }, [data]);

  const onSearch = (value: string) => {
    setRequestList(
      data.filter((item: any) =>
        [item.firstName, item.lastName].join(" ").includes(value)
      )
    );
  };

  return (
    <div className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden">
      <ContentTitleWithSearch
        title={t("Partner request").toString()}
        onSearch={onSearch}
      />
      <Skeleton loading={isLoading} active>
        <PartnerRequestList
          colSpan={6}
          partnerList={requestList}
          refetch={refetch}
        />
      </Skeleton>
    </div>
  );
};

export default PartnerRequestsPage;
