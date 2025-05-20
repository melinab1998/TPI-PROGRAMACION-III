const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

/*handleResponse:
- Se encarga de verificar si la respuesta de la solicitud fetch es OK (200-299) o no.
- Si la respuesta no es OK, lanza un error con los datos y el mensaje de error.*/

const handleResponse = async (res) => {
	const data = await res.json();
	if (!res.ok) {
		throw { data, message: data.message || "Error en la solicitud" };
	}
	return data;
};

/*onSuccess: La función a llamar cuando la solicitud es exitosa
onError: La función a llamar cuando se produce un error*/

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

export const getPets = (onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets`, {
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

export const getPetById = (id, onSuccess, onError) => {
	fetch(`${baseUrl}/api/pets/${id}`)
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
