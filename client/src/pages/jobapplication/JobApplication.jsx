import Layout from "../../components/layout/Layout";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidature } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import CandidatInfo from "../../components/candidatinfo/CandidatInfo";
import { useNavigate, useParams } from "react-router-dom";

const JobApplication = () => {
  const { token } = useAuth();
  const { offerId } = useParams();
  const { companyId } = useParams();
  console.log("companyId", companyId);
  const { candidate } = useUser();
  const navigate = useNavigate();
  const handleApplyJob = async (values, actions) => {
    let applicationData = {
      candidatId: candidate.id,
      offreId: offerId,
      societeId: companyId,
    };
    CreateCandidature(applicationData, token)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
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
