import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import Pagination from "../shared/Pagination";
import EditStatusModal from "./EditStatusModal";
import { Badge } from "@chakra-ui/react";

function CandidateTable({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [candidatesPerPage] = useState(5);

  const handleOpenModal = () => setIsOpen(!isOpen);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset current page when search query changes
  }

  function filterCandidates(candidate) {
    return (
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const filteredCandidates = data.filter(filterCandidates);

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
        <h1 className="text-2xl font-bold mr-4">Candidates</h1>
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
            <EditStatusModal
              isOpen={isOpen}
              handleOpenModal={handleOpenModal}
            />
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Email
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Phone
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          CV
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Message
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedCandidates.map((candidate) => (
                        <tr
                          key={candidate.id}
                          className="bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <td className="px-4 py-2 text-center">
                            {candidate.name}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidate.email}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidate.phone}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </a>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button className="text-primary hover:text-secondary">
                              <AiFillMessage size={30} />
                            </button>
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidate.status === "accepted" ? (
                              <Badge colorScheme="green">Accepted</Badge>
                            ) : candidate.status === "rejected" ? (
                              <Badge colorScheme="red">Rejected</Badge>
                            ) : (
                              <Badge colorScheme="yellow">Pending</Badge>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <a
                              onClick={handleOpenModal}
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
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
            <p className="text-gray-500">
              No candidates found. Please try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateTable;
