import Layout from "../../components/layout/Layout";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidature } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import CandidatInfo from "../../components/candidatinfo/CandidatInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { GetOffre } from "../../lib/fetch";

const JobApplication = () => {
  const toast = useToast();
  const { token } = useAuth();
  const { offerId } = useParams();
  const { companyId } = useParams();
  const { userInfo, candidate } = useUser();
  const { data, isLoading } = useQuery(["offre", offerId, token], () =>
    GetOffre(offerId, token)
  );
  const navigate = useNavigate();
  const handleApplyJob = async (values, actions) => {
    let applicationData = {
      candidatId: candidate.id,
      offreId: offerId,
      societeId: companyId,
      message:!isLoading && `${userInfo.nom} ${userInfo.prenom} applied to ${data.titre}`,
    };
    CreateCandidature(applicationData, token)
      .then((res) => {
        console.log(res);
        toast({
          description: "succesfully applied",
          position: "bottom-left",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/candidatespace");
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: err.message,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <Layout>
      <div className="my-16 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <CandidatInfo />
          <div className="flex flex-row-reverse">
            <PrimaryButton type="button" onClick={handleApplyJob}>
              Apply
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;
