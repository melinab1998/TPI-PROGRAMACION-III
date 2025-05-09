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

export const validateName = (name) => {
    if (!name.trim()) return "El nombre es obligatorio.";
    if (name.length < 2) return "El nombre debe tener al menos 2 caracteres.";
    return "";
};

export const validateLastName = (lastName) => {
    if (!lastName.trim()) return "El apellido es obligatorio.";
    if (lastName.length < 2) return "El apellido debe tener al menos 2 caracteres.";
    return "";
};

export const validateAddress = (address) => {
    if (!address.trim()) return "La dirección es obligatoria.";
    return "";
};

export const validatePhone = (phone) => {
    if (!phone.trim()) return "El teléfono es obligatorio.";
    const regex = /^[0-9]{8,15}$/;
    if (!regex.test(phone)) return "Teléfono inválido (solo números, 8-15 dígitos).";
    return "";
};

export const validateCity = (city) => {
    if (!city.trim()) return "La localidad es obligatoria.";
    return "";
};

export const validateProvince = (province) => {
    if (!province.trim()) return "La provincia es obligatoria.";
    return "";
};

export const validateDNI = (dni) => {
    if (!dni.trim()) return "El DNI es obligatorio.";
    const regex = /^[0-9]{7,8}$/;
    if (!regex.test(dni)) return "DNI inválido (7 u 8 dígitos).";
    return "";
};

export const validateHousingType = (housingType) => {
    if (!housingType) return "Debe seleccionar un tipo de vivienda.";
    return "";
};

export const validateOwnershipStatus = (ownershipStatus) => {
    if (!ownershipStatus) return "Debe indicar si es propietario o inquilino.";
    return "";
};

export const validateOwnerConsultation = (ownerConsultation, isTenant) => {
    if (isTenant && !ownerConsultation) return "Debe indicar si consultó al dueño.";
    return "";
};

export const validateCourtyard = (hasCourtyard) => {
    if (hasCourtyard === null || hasCourtyard === undefined) return "Debe indicar si tiene patio.";
    return "";
};

export const validateHasPets = (hasPets) => {
    if (hasPets === null || hasPets === undefined) return "Debe indicar si tiene otras mascotas.";
    return "";
};

export const validatePetsNeutered = (petsNeutered, hasPets) => {
    if (hasPets === 'yes' && !petsNeutered) return "Debe indicar si sus mascotas están castradas.";
    return "";
};

export const validateHadOtherPets = (hadOtherPets) => {
    if (hadOtherPets === null || hadOtherPets === undefined) return "Debe indicar si tuvo otras mascotas.";
    return "";
};

export const validateReason = (reason) => {
    if (!reason.trim()) return "Debe explicar por qué quiere adoptar.";
    return "";
};

export const validateVacationPlan = (plan) => {
    if (!plan.trim()) return "Debe explicar sus planes para vacaciones.";
    return "";
};

export const validateMovingPlan = (plan) => {
    if (!plan.trim()) return "Debe explicar sus planes en caso de mudanza.";
    return "";
};

export const validateDailyWalks = (dailyWalks) => {
    if (dailyWalks === null || dailyWalks === undefined) return "Debe indicar si tiene tiempo para paseos diarios.";
    return "";
};

export const validateWhatsappFollowUp = (followUp) => {
    if (followUp === null || followUp === undefined) return "Debe indicar si acepta seguimiento por WhatsApp.";
    return "";
};

export const validateTerms = (accepted) => {
    if (!accepted) return "Debe aceptar los términos y condiciones.";
    return "";
};