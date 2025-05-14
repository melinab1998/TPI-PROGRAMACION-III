const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

/*handleResponse:
- Se encarga de verificar si la respuesta de la solicitud fetch es OK (200-299) o no.
- Si la respuesta es OK, devuelve los datos en formato JSON.
- Si la respuesta no es OK, lanza un error con los datos y el mensaje de error.*/

const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) {
        throw { data, message: data.message || "Error en la solicitud" };
    }
    return data;
};

/*handleError:
- Se encarga de manejar el error que se produce cuando la solicitud fetch falla.
- Registra el error en la consola y llama a la función onError con el error.*/

const handleError = (error, onError) => {
    console.error("Error:", error);
    onError(error);
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
        .catch((error) => handleError(error, onError));
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
        .catch((error) => handleError(error, onError));
};

export const getPetById = (id, onSuccess, onError) => {
    fetch(`${baseUrl}/api/pets/${id}`)
        .then(handleResponse)
        .then(onSuccess)
        .catch((error) => handleError(error, onError));
};

export const createDonation = (formData, onSuccess, onError) => {
    fetch(`${baseUrl}/api/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then(handleResponse)
        .then(onSuccess)
        .catch((error) => handleError(error, onError));
};

export const loginUser = (credentials, onSuccess, onError) => {
    fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    })
        .then(handleResponse)
        .then(onSuccess)
        .catch((error) => handleError(error, onError));
};