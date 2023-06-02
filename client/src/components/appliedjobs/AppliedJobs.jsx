import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "../shared/Pagination";
import { Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DeleteCandidature } from "../../lib/fetch";
import DeleteAlertDialog from "../shared/AlertDialog";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

function AppliedJobs({ data, refetch }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const jobList =
    data && data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidacyId, setSelectedCandidacyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsPerPage] = useState(5);

  const handleOpenModal = (candidacyId) => {
    setIsOpen(!isOpen);
    setSelectedCandidacyId(candidacyId);
  };
  const handleDeletCandidacy = () => {
    DeleteCandidature(selectedCandidacyId, token)
      .then((res) => {
        console.log("res", res);
        refetch();
        handleOpenModal();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  }

  function filterCandidacy(candidacy) {
    return (
      candidacy?.offre?.titre
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.offre?.societe?.nom
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.offre?.adresse
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.etat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const filteredCandidacy = jobList.filter(filterCandidacy);
  const pageCount = Math.ceil(filteredCandidacy.length / jobsPerPage); // Calculate total number of pages

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
  }

  const startIndex = currentPage * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedCandidates = filteredCandidacy.slice(startIndex, endIndex);
  return (
    <div className="max-w-7xl mx-auto pt-6 pb-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mr-4">
          {t("appliedJobs.jobApplication")}
        </h1>
        <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("appliedJobs.searchJob")}
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-auto"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {data.length > 0 ? (
          <>
            <DeleteAlertDialog
              label={"Delete Candidacy"}
              isOpen={isOpen}
              handleOpenDeleteModal={handleOpenModal}
              handleDelete={handleDeletCandidacy}
            />
            <div className="-my-2 overflow-y-hidden sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow  border-b border-gray-200 sm:rounded-lg">
                  <table className="table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("appliedJobs.company")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("appliedJobs.jobOffer")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("appliedJobs.address")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("appliedJobs.date")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("appliedJobs.status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedCandidates.map((candidacy) => (
                        <tr
                          key={candidacy.id}
                          className="bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <td
                            className="px-4 py-2 text-center cursor-pointer"
                            onClick={() =>
                              navigate(`/offer/${candidacy?.offre?.id}`)
                            }
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={candidacy?.offre?.societe?.logo}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                {candidacy?.offre?.societe?.nom}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidacy?.offre?.titre}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidacy?.offre?.societe?.adresse}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {moment(candidacy?.updatedAt).fromNow()}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidacy.etat === "accepted" ? (
                              <Badge colorScheme="green">Accepted</Badge>
                            ) : candidacy.etat === "rejected" ? (
                              <Badge colorScheme="red">Rejected</Badge>
                            ) : (
                              <Badge colorScheme="yellow">Pending</Badge>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <a
                              onClick={() => handleOpenModal(candidacy.id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              {t("appliedJobs.delete")}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {filteredCandidacy.length > jobsPerPage && (
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">{t("appliedJobs.noJob")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;
