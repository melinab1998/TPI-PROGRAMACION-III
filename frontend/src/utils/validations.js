export const validateEmail = (email) => {
	if (!email.trim()) return "El email es obligatorio.";
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!regex.test(email)) return "Formato de email inválido.";
	return "";
};

export const validatePassword = (password) => {
	if (!password) return "Contraseña es obligatoria.";
	if (password.length < 6)
		return "La contraseña debe tener al menos 6 caracteres.";
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
	if (!method || method === "Seleccionar...")
		return "Debe elegir un método de pago.";
	return "";
};

export const validateName = (name) => {
	if (!name.trim()) return "El nombre es obligatorio.";
	if (name.length < 2) return "El nombre debe tener al menos 2 caracteres.";
	return "";
};

export const validateLastName = (last_name) => {
	if (!last_name.trim()) return "El apellido es obligatorio.";
	if (last_name.length < 2)
		return "El apellido debe tener al menos 2 caracteres.";
	return "";
};

export const validateAddress = (address) => {
	if (!address.trim()) return "La dirección es obligatoria.";
	return "";
};

export const validatePhone = (phone) => {
	if (!phone.trim()) return "El teléfono es obligatorio.";
	const regex = /^[0-9]{8,15}$/;
	if (!regex.test(phone))
		return "Teléfono inválido (solo números, 8-15 dígitos).";
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

export const validateHousingType = (housing_type) => {
	if (!housing_type) return "Debe seleccionar un tipo de vivienda.";
	return "";
};

export const validateOwnershipStatus = (ownership_status) => {
	if (!ownership_status) return "Debe indicar si es propietario o inquilino.";
	return "";
};

export const validateOwnerConsultation = (owner_consultation, isTenant) => {
	if (isTenant && !owner_consultation)
		return "Debe indicar si consultó al dueño.";
	return "";
};

export const validateCourtyard = (has_courtyard) => {
	if (has_courtyard === null || has_courtyard === undefined)
		return "Debe indicar si tiene patio.";
	return "";
};

export const validateHasPets = (has_pets) => {
	if (has_pets === null || has_pets === undefined)
		return "Debe indicar si tiene otras mascotas.";
	return "";
};

export const validatePetsNeutered = (pets_neutered, has_pets) => {
	if (has_pets === true && !pets_neutered)
		return "Debe indicar si sus mascotas están castradas.";
	return "";
};

export const validateHadOtherPets = (had_other_pets) => {
	if (had_other_pets === null || had_other_pets === undefined)
		return "Debe indicar si tuvo otras mascotas.";
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

export const validateDailyWalks = (daily_walks) => {
	if (daily_walks === null || daily_walks === undefined)
		return "Debe indicar si tiene tiempo para paseos diarios.";
	return "";
};

export const validateWhatsappFollowUp = (whatsapp_follow_up) => {
	if (whatsapp_follow_up === null || whatsapp_follow_up === undefined)
		return "Debe indicar si acepta seguimiento por WhatsApp.";
	return "";
};

export const validateTerms = (accepted) => {
	if (!accepted) return "Debe aceptar los términos y condiciones.";
	return "";
};

export const validateSpecies = (species) => {
    if (!species) return "La especie es obligatoria.";
    return "";
};

export const validateRace = (race) => {
    if (!race.trim()) return "La raza es obligatoria.";
    return "";
};

export const validateAge = (age) => {
    if (!age || parseFloat(age) < 0) return "La edad debe ser un número positivo.";
    return "";
};

export const validateWeight = (weight) => {
    if (!weight || parseFloat(weight) <= 0) return "El peso debe ser mayor a 0.";
    return "";
};

export const validateGender = (gender) => {
    if (!gender) return "El sexo es obligatorio.";
    return "";
};

export const validateShelter = (shelter) => {
    if (!shelter.trim()) return "El refugio es obligatorio.";
    return "";
};

export const validateImageUrl = (url) => {
    if (!url.trim()) return "La URL de la imagen es obligatoria.";
    try {
        new URL(url);
    } catch (_) {
        return "URL inválida.";
    }
    return "";
};

export const validateMessage = (message) => {
	if (!message.trim()) return "Este campo es obligatorio.";
	return "";
};


