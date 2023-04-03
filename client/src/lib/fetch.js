import axios from "axios";
//User
export const fetchUserByEmail = async (userEmail, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/users/email/${userEmail}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
};

export const CreateUser = async (userData, token) => {
    let data = userData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/users",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response.data;
};

export const GetUsers = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/users",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetUser = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/users/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateUser = async (id, userData, token) => {
    let data = userData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/users/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteUser = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/users/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}

//Candidat

export const CreateCandidat = async (candidatData, token) => {
    let data = candidatData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/candidats",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
};

export const GetCandidats = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/candidats",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetCandidat = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/candidats/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateCandidat = async (id, candidatData, token) => {
    let data = candidatData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/candidats/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteCandidat = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/candidats/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}

//CV

export const CreateCV = async (cvData, token) => {
    let data = cvData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/cvs",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
};

export const GetCVs = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/cvs",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetCV = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/cvs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateCV = async (id, cvData, token) => {
    let data = cvData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/cvs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteCV = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/cvs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}

//Societe

export const CreateSociete = async (societeData, token) => {
    let data = societeData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/societes",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
};

export const GetSocietes = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/societes",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetSociete = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/societes/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetSocieteByUid = async (userId, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/societes/user/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateSociete = async (id, societeData, token) => {
    let data = societeData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/societes/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteSociete = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/societes/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }, 
    };
    const response = await axios(config);
    return response;
}

//secteur
export const CreateSecteur = async (secteurData, token) => {
    let data = secteurData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/secteurs",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
};

export const GetSecteurs = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/secteurs",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetSecteur = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/secteurs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateSecteur = async (id, secteurData, token) => {
    let data = secteurData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/secteurs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteSecteur = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/secteurs/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}

//Offre

export const CreateOffre = async (offreData, token) => {
    let data = offreData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/offres",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const GetOffres = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/offres",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetOffre = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/offres/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateOffre = async (id, offreData, token) => {
    let data = offreData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/offres/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteOffre = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/offres/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}

//Candidature

export const CreateCandidature = async (candidatureData, token) => {
    let data = candidatureData;
    let config = {
        method: "post",
        url: "http://localhost:8080/api/candidatures",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const GetCandidatures = async (token) => {
    let config = {
        method: "get",
        url: "http://localhost:8080/api/candidatures",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const GetCandidature = async (id, token) => {
    let config = {
        method: "get",
        url: `http://localhost:8080/api/candidatures/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response.data;
}

export const UpdateCandidature = async (id, candidatureData, token) => {
    let data = candidatureData;
    let config = {
        method: "put",
        url: `http://localhost:8080/api/candidatures/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        data: data,
    };
    const response = await axios(config);
    return response;
}

export const DeleteCandidature = async (id, token) => {
    let config = {
        method: "delete",
        url: `http://localhost:8080/api/candidatures/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    return response;
}