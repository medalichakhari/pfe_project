import { useFormik } from "formik";
import { useState, useEffect } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import Layout from "../../components/layout/Layout";
import CompanyForm from "../../components/recruiterform/CompanyForm";
import JobOfferForm from "../../components/recruiterform/JobOfferForm";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "react-query";
import {
  GetUser,
  CreateRecruteur,
  UpdateRecruteur,
  GetSocieteByRid,
  CreateSociete,
  UpdateSociete,
  CreateOffre,
} from "../../lib/fetch";

const STEPS_AMOUNT = 1;

const JobPosting = () => {
  const [formStep, setFormStep] = useState(0);
  const completeFormStep = () => {
    setFormStep(formStep + 1);
  };
  const previousFormStep = () => {
    setFormStep(formStep - 1);
  };
  const renderCompanyButtons = () => {
    if (formStep === 0) {
      return (
        <div className="flex flex-row-reverse">
          <PrimaryButton type="submit">Next</PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderJobOfferButtons = () => {
    if (formStep === STEPS_AMOUNT) {
      return (
        <div className="flex justify-between">
          <SecondaryButton type="button" onClick={previousFormStep}>
            Previous
          </SecondaryButton>
          <PrimaryButton type="submit">Create Job Offer</PrimaryButton>
        </div>
      );
    } else {
      return null;
    }
  };
  const { token, user, refreshToken } = useAuth();
  const { data: userInfo, isLoading: isLoadingUserInfo } = useQuery(
    ["userInfo", user?.user_id, token],
    () => GetUser(user?.user_id, token)
  );
  const { data: companyInfo, isLoading: isLoadingCompanyInfo } = useQuery(
    ["companyInfo", userInfo?.recruteur?.id, token],
    () => GetSocieteByRid(userInfo?.recruteur?.id, token)
  );
  const [initialValues, setInitialValues] = useState({
    profession: "",
    companyName: "",
    companyAddress: "",
    companyDomain: "",
    companyDescription: "",
  });
  useEffect(() => {
    if (!isLoadingUserInfo && !isLoadingCompanyInfo) {
      setInitialValues({
        profession: userInfo?.recruteur?.titre_professionelle || "",
        companyName: companyInfo[0]?.nom || "",
        companyAddress: companyInfo[0]?.adresse || "",
        companyDomain: "",
        companyDescription: companyInfo[0]?.description || "",
      });
    }
  }, [isLoadingUserInfo, isLoadingCompanyInfo, userInfo, companyInfo]);
  const handleCreateCompany = async (values, actions) => {
    let recruteurId = userInfo?.recruteur?.id;
    let companyId = companyInfo && companyInfo[0]?.id;
    let recruterData = {
      titre_professionelle: values.profession,
      userId: user?.user_id,
    };
    let companyData = {
      nom: values.companyName,
      adresse: values.companyAddress,
      description: values.companyDescription,
      recruteurId: recruteurId,
    };
    try {
      if (!isLoadingUserInfo && recruteurId) {
        await UpdateRecruteur(recruteurId, recruterData, token);
        console.log("Recruteur updated");
      } else {
        await CreateRecruteur(recruterData, token).then(async (res) => {
          console.log(res);
          recruteurId = res.data.id;
        });
      }
      if (recruteurId) {
        if (!isLoadingCompanyInfo && companyId) {
          await UpdateSociete(companyId, companyData, token);
          console.log("Company updated");
        } else {
          companyData.recruteurId = recruteurId; // Set the recruiter ID for the company
          await CreateSociete(companyData, token).then((res) =>
            console.log(res)
          );
        }
        completeFormStep();
      } else {
        console.log("Failed to create recruiter");
      }
    } catch (err) {
      console.log("Something wrong happened", err);
    }
  };
  const handleCreateJobOffer = async (values, actions) => {
    let offerData = {
      titre: jobOfferValues.title,
      lieux: jobOfferValues.address,
      domaine: jobOfferValues.domain,
      type: jobOfferValues.type,
      salaire: jobOfferValues.salary,
      // competences: jobOfferValues.qualification,
      description: jobOfferValues.description,
      categorieId: 1,
      recruteurId: userInfo?.recruteur?.id,
    };
    CreateOffre(offerData, token)
      .then((res) => {
        console.log(res);
        completeFormStep();
      })
      .catch((err) => console.log(err));
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: handleCreateCompany,
    enableReinitialize: true,
  });
  const {
    values: jobOfferValues,
    errors: jobOfferErrors,
    touched: jobOfferTouched,
    isSubmitting: jobOfferIsSubmitting,
    handleBlur: jobOfferHandleBlur,
    handleChange: jobOfferHandleChange,
    handleSubmit: jobOfferHandleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      address: "",
      type: "",
      domain: "",
      salary: "",
      qualification: "",
      description: "",
    },
    onSubmit: handleCreateJobOffer,
  });
  return (
    <Layout>
      <div className="my-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit}>
            {formStep === 0 && (
              <CompanyForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
              />
            )}
            {renderCompanyButtons()}
          </form>
          <form onSubmit={jobOfferHandleSubmit}>
            {formStep === 1 && (
              <JobOfferForm
                values={jobOfferValues}
                handleChange={jobOfferHandleChange}
                handleBlur={jobOfferHandleBlur}
                handleSubmit={jobOfferHandleSubmit}
              />
            )}
            {renderJobOfferButtons()}
          </form>
          {formStep === 2 && (
            <div className="mb-2">
              <h2 className="font-semibold text-3xl mb-4">Congratulations!</h2>
              <p>You can browse your jobs offer in your dashboard!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobPosting;
