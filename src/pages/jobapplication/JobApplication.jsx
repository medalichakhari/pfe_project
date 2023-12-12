import Layout from "@/layout/Layout";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidature } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import CandidatInfo from "@/candidatinfo/CandidatInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { GetOffre } from "../../lib/fetch";
import { useState } from "react";

const JobApplication = () => {
  const toast = useToast();
  const { token } = useAuth();
  const { offerId } = useParams();
  const { userId } = useParams();
  const { userInfo, candidate } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const { data, isLoading } = useQuery(["offre", offerId, token], () =>
    GetOffre(offerId, token)
  );
  console.log("user Id for job", userId);
  const navigate = useNavigate();
  const handleApplyJob = async (values, actions) => {
    setSubmitting(true);
    let applicationData = {
      candidatId: candidate.id,
      offreId: offerId,
      userId: userId,
      message:
        !isLoading &&
        `${userInfo.nom} ${userInfo.prenom} applied to ${data.titre}`,
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
      <div className="flex justify-center items-center">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <CandidatInfo />
          <div className="flex flex-row-reverse">
            <PrimaryButton
              type="button"
              onClick={handleApplyJob}
              disabled={submitting}
            >
              Apply
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;
