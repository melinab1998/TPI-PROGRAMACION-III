const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const handleResponse = async (res) => {
	const data = await res.json();
	if (!res.ok) {
		throw { data, message: data.message || "Error en la solicitud" };
	}
	return data;
};

export const registerUser = (formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const loginUser = (credentials, onSuccess, onError) => {
	fetch(`${baseUrl}/api/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getUsers = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const updateUserRole = (id, newRole, onSuccess, onError) => {
	fetch(`${baseUrl}/api/users/${id}/role`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ role: newRole }),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const deleteUser = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/users/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getPets = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getPetById = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets/${id}`)
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const createPet = (formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const updatePet = (id, formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const deletePet = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const createDonation = (formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/donations`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const createAdoptionForm = (formData, onSuccess, onError) => {
	console.log("Enviando a backend:", formData);
	fetch(`${baseUrl}/api/adoption`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getShelters = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/shelters`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getShelterById = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/shelters/${id}`)
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const createShelter = (formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/shelters`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const updateShelter = (id, formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/shelters/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const deleteShelter = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/shelters/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const getRequests = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/adoption`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};

export const updateRequests = (id, newState, onSuccess, onError) => {
	fetch(`${baseUrl}/api/adoption`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: JSON.stringify({ id, state: newState }),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};


export const createContact = (formData, onSuccess, onError) => {
	fetch(`${baseUrl}/api/contacts`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};


export const getStats = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/stats`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then(handleResponse)
		.then(onSuccess)
		.catch(onError);
};