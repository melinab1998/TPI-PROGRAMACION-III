export const validateEmail = (email) => {
    if (!email.trim()) return "El email es obligatorio.";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(email)) return "Formato de email inválido.";
    return "";
};

export const validatePassword = (password) => {
    if (!password) return "Contraseña es obligatoria.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
};

export const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Debe confirmar la contraseña.";
    if (confirmPassword !== password) return "Las contraseñas no coinciden.";
    return "";
};

export const validateUserName = (name) => {
    if (!name.trim()) return "Este campo es obligatorio.";
    return "";
};

export const validateDonationName = (name) => {
    if (!name.trim()) return "El nombre es obligatorio.";
    return "";
};

export const validateAmount = (amount) => {
    if (!amount || parseFloat(amount) <= 0) return "El monto debe ser mayor a 0.";
    return "";
};

export const validatePaymentMethod = (method) => {
    if (!method || method === "Seleccionar...") return "Debe elegir un método de pago.";
    return "";
};