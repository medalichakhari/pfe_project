import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import Pagination from "../shared/Pagination";
import EditStatusModal from "./EditStatusModal";
import { Badge } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebaseConfig";
import { useTranslation } from "react-i18next";

function CandidateTable({ data, refetch }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const candidates = data && data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidacyId, setSelectedCandidacyId] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [candidatesPerPage] = useState(5);
  const handleOpenModal = (candidacyId, candidateId) => {
    setIsOpen(!isOpen);
    setSelectedCandidacyId(candidacyId);
    setSelectedCandidateId(candidateId);
  };

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  }

  function filterCandidates(candidacy) {
    return (
      candidacy?.candidat?.user?.nom
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.candidat?.user?.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.candidat?.user?.telephone
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidacy?.etat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const filteredCandidates = candidates.filter(filterCandidates);
  const pageCount = Math.ceil(filteredCandidates.length / candidatesPerPage); // Calculate total number of pages
  function handlePageChange(selectedPage) {
    setCurrentPage(selectedPage.selected);
  }

  const startIndex = currentPage * candidatesPerPage;
  const endIndex = startIndex + candidatesPerPage;
  const displayedCandidates = filteredCandidates.slice(startIndex, endIndex);
  //handle message
  const handleSelect = async (selectedUser) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.user_id > selectedUser.id
        ? user.user_id + selectedUser.id
        : selectedUser.id + user.user_id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.user_id), {
          [combinedId]: {
            userInfo: {
              uid: selectedUser.id,
              displayName: selectedUser.nom,
              photoURL: selectedUser.photo,
            },
            date: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", selectedUser.id), {
          [combinedId]: {
            userInfo: {
              uid: user.user_id,
              displayName: user.name,
              photoURL: user.picture,
            },
            date: serverTimestamp(),
          },
        });
      }
      navigate("/chat");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mr-4">
          {t("candidatesTable.candidates")}
        </h1>
        <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("candidatesTable.searchCandidate")}
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
              candidacyId={selectedCandidacyId}
              candidateId={selectedCandidateId}
              refetch={refetch}
            />
            <div className="-my-2 overflow-y-hidden sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow border-b border-gray-200 sm:rounded-lg">
                  <table className="table w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.name")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.email")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.phone")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.curriculumVitae")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.chat")}
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700">
                          {t("candidatesTable.status")}
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
                                  src={candidacy?.candidat?.user?.photo}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                {candidacy?.candidat?.user?.nom}{" "}
                                {candidacy?.candidat?.user?.nom}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidacy?.candidat?.user?.email}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {candidacy?.candidat?.user?.telephone}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <Link
                              to={candidacy?.candidat?.cv}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                handleSelect(candidacy?.candidat?.user)
                              }
                              className="text-primary hover:text-secondary"
                            >
                              <AiFillMessage size={30} />
                            </button>
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
                            {candidacy.etat === "pending" ? (
                              <a
                                onClick={() =>
                                  handleOpenModal(
                                    candidacy.id,
                                    candidacy.candidat.id
                                  )
                                }
                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                              >
                                {t("candidatesTable.changeStatus")}
                              </a>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {filteredCandidates.length >= candidatesPerPage && (
                <Pagination
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No candidates found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateTable;
