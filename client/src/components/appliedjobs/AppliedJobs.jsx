import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "../shared/Pagination";
// import EditStatusModal from "./EditStatusModal";
import { Badge } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

function AppliedJobs({ data, refetch }) {
  console.log("data", data);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidacyId, setSelectedCandidacyId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [candidatesPerPage] = useState(5);

  const handleOpenModal = (candidacyId) => {
    setIsOpen(!isOpen);
    setSelectedCandidacyId(candidacyId);
  };

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  }

  function filterCandidates(candidacy) {
    return (
      candidacy?.offre?.titre
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.offre?.societe?.nom
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.offre?.lieux?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.etat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const filteredCandidates = data.filter(filterCandidates);
  console.log("filteredCandidates", filteredCandidates);
  const pageCount = Math.ceil(filteredCandidates.length / candidatesPerPage); // Calculate total number of pages

  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
  }

  const startIndex = currentPage * candidatesPerPage;
  const endIndex = startIndex + candidatesPerPage;
  const displayedCandidates = filteredCandidates.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mr-4">Job applications</h1>
        <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search candidates"
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
            {/* <EditStatusModal
              isOpen={isOpen}
              handleOpenModal={handleOpenModal}
              candidacyId={selectedCandidacyId}
              refetch={refetch}
            /> */}
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block  sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Company
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Job offer
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Location
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedCandidates.map((candidacy) => (
                        <tr
                          key={candidacy.id}
                          className="bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <td className="px-4 py-2 text-center">
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
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No jobs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;
