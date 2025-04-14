import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../img/logo.png';
import './login.css'
const Login = ({showLogin}) => {
    if(showLogin){
    return (
        <Form>
            <img
                src={logo}
                alt="Logo"
                className="custom-logo block mx-auto w-[100px]"
            />
            <h4>Iniciar Sesión</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail </Form.Label>
                <Form.Control type="email" placeholder="ejemplo@gmail.com" />
                <Form.Text className="text-muted">
                    ¿No tienes cuenta? <a href="/">Registrate aqui</a>
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="@#*%" />
                <Form.Text className="text-muted">
                    <a href="/">¿Olvidaste tu contraseña?</a>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recuerdame" />
            </Form.Group>
            <Button className='b' variant="primary" type="submit">
                Iniciar Sesión
            </Button>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">O Inicia Sesión con</span>
                    </div>
                </div>
            </div>

            <button
                className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
                <img
                    src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                    alt="Google"
                    className="w-5 h-5"
                />

                Continuar con Google
            </button>
            <button
                className="w-full  flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100 "
            >
                <img
                    src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                    alt="Google"
                    className="w-5 h-5"
                />

                Continuar con Google
            </button>
        </Form>


    )}
}

export default Login