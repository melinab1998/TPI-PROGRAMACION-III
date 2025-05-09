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