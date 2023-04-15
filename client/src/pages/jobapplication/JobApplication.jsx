import { useState } from "react";
import Layout from "../../components/layout/Layout";
import PrimaryButton from "../../components/buttons/primarybutton";
import { useAuth } from "../../context/AuthContext";
import { CreateCandidature } from "../../lib/fetch";
import { useUser } from "../../context/UserContext";
import CandidatInfo from "../../components/candidatinfo/CandidatInfo";
import { useNavigate, useParams } from "react-router-dom";

const STEPS_AMOUNT = 1;

const JobApplication = () => {
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const {offerId} = useParams();
  const { token } = useAuth();
  const { candidate } = useUser();
  const navigate = useNavigate();
  console.log("offre id", offerId)
  console.log("czaaz id", candidate.id)
  const handleApplyJob = async (values, actions) => {
    let applicationData = {
      etat: "Waiting",
      candidatId: candidate.id,
      offreId: offerId,
    };
    console.log("czaaazdad", applicationData)
    CreateCandidature(applicationData, token)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const renderCandidatButtons = () => {
    if (formStep === 0) {
      return (
        <div className="flex flex-row-reverse">
          <PrimaryButton type="button" onClick={handleApplyJob}>
            Apply
          </PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            {formStep === 0 && <CandidatInfo />}
            {renderCandidatButtons()}
          </div>
          <div className="flex flex-row-reverse"></div>
          {formStep === 1 && (
            <div className="mb-2">
              <h2 className="font-semibold text-3xl mb-4">Request sent!</h2>
              <p>Good Luck</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobApplication;
