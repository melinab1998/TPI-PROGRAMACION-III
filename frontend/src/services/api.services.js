const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export const registerUser = (formData, onSuccess, onError) => {
    fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then(async (response) => {
            const responseData = await response.json();
            const result = { ok: response.ok, data: responseData };

            if (response.ok) {
                onSuccess(result);
            } else {
                onError(result);
            }
        })
        .catch((error) => {
            console.error("Error al registrar usuario:", error);
            onError({ ok: false, error });
        });
};

export const getPets = (onSuccess, onError) => {
    fetch(`${baseUrl}/api/pets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "No se pudieron obtener las mascotas");
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
};

export const getPetById = (id, onSuccess, onError) => {
    fetch(`${baseUrl}/api/pets/${id}`)
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "No se pudo obtener la mascota");
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
};

export const createDonation = (formData, onSuccess, onError) => {
    fetch(`${baseUrl}/donations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Error al procesar la donación");
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
};

export const loginUser = (credentials, onSuccess, onError) => {
    fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Error al iniciar sesión");
            }
            return res.json();
        })
        .then(onSuccess)
        .catch(onError);
};