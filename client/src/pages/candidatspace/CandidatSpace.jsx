import React from "react";
import Layout from "../../components/layout/Layout";
import { Tabs } from "flowbite-react";
import AppliedJobs from "../../components/appliedjobs/AppliedJobs";
import { GetCandidaturesByCandidat } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const CandidatSpace = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { candidate } = useUser();
  const {
    isLoading,
    data: candidatures,
    refetch,
  } = useQuery(["candidatures", candidate?.id, token], () =>
    GetCandidaturesByCandidat(candidate?.id, token)
  );
  return (
    <Layout>
      <h1 className="text-4xl font-bold ml-3 mt-8">
        {t("candidateSpace.candidateSpace")}
      </h1>
      <Tabs.Group style="underline">
        <Tabs.Item title={t("candidateSpace.profile")}>{t("candidateSpace.profile")}</Tabs.Item>
        <Tabs.Item title="Applications" active={true}>
          {!isLoading && candidatures && (
            <AppliedJobs data={candidatures} refetch={refetch} />
          )}
        </Tabs.Item>
        <Tabs.Item title={t("candidateSpace.accepted")}>{t("candidateSpace.accepted")}</Tabs.Item>
        <Tabs.Item title={t("candidateSpace.rejected")}>{t("candidateSpace.rejected")}</Tabs.Item>
      </Tabs.Group>
    </Layout>
  );
};

export default CandidatSpace;
