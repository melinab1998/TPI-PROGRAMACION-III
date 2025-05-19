import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import {validateName, validateAddress, validatePhone, validateEmail,} from "../../../utils/validations.js"
import "../../AdminComponents/PetForm/PetForm.css";

const ShelterForm = ({ show, onHide, onSubmit, formData, handleChange, isEdit, error }) => {
	const [errors, setErrors] = useState({
		name: "",
		address: "",
		phone: "",
		email: ""
	});

	const handleBlur = (e) => {
		const { name, value } = e.target;
		let errorMsg = "";

		switch (name) {
			case "name":
				errorMsg = validateName(value);
				break;
			case "address":
				errorMsg = validateAddress(value);
				break;
			case "phone":
				errorMsg = validatePhone(value);
				break;
			case "email":
				errorMsg = validateEmail(value);
				break;
			default:
				break;
		}

		setErrors((prev) => ({ ...prev, [name]: errorMsg }));
	};

	return (
		<Modal show={show} onHide={onHide} centered className="pet-form-modal">
			<Modal.Header closeButton>
				<Modal.Title>{isEdit ? 'Editar Refugio' : 'Agregar Refugio'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Nombre del refugio</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={!!errors.name}
							required
						/>
						<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Dirección</Form.Label>
						<Form.Control
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={!!errors.address}
							required
						/>
						<Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Teléfono</Form.Label>
						<Form.Control
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={!!errors.phone}
							required
						/>
						<Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={!!errors.email}
							required
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>

					{error && <div className="alert alert-danger">{error}</div>}

					<div className="d-flex justify-content-end gap-2">
						<Button variant="secondary" onClick={onHide}>
							Cancelar
						</Button>
						<Button variant="primary" type="submit">
							{isEdit ? 'Guardar cambios' : 'Agregar refugio'}
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default ShelterForm;
