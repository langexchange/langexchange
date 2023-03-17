import { Col, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";
import { useGetAllProfilesQuery } from "../../services/profile/profileServices";

const PartnerExplorePage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const { data: allProfiles, isLoading: isGettingAllProfiles } =
    useGetAllProfilesQuery();

  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("You may know")} />
      <FilterLine />
      <Skeleton loading={isGettingAllProfiles} active>
        <ExplorePartnerList colSpan={8} partnerList={allProfiles} />
      </Skeleton>
    </Col>
  );
};

export default PartnerExplorePage;
