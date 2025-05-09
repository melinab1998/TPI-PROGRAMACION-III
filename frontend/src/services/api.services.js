const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        return {
            ok: response.ok,
            data: responseData,
        };
    } catch (error) {
        console.error("Error en registerUser:", error);
        throw error;
    }
};

export const getPets = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/pets`);
        if (!response.ok) {
            throw new Error("No se pudo obtener las mascotas");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        throw error;
    }
};

export const getPetById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/api/pets/${id}`);
        if (!response.ok) {
            throw new Error("No se pudo obtener la mascota");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener mascota por ID:", error);
        throw error;
    }
};

export const createDonation = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/donations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al donar.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en createDonation:", error);
        throw error;
    }
};


export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${baseUrl}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    } catch (error) {
        console.error("Error en loginUser:", error);
        throw error;
    }
};