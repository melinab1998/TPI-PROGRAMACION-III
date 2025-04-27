import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../img/logo.png';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { SlClose } from "react-icons/sl";
import './Login.css'

const Login = ({ showLogin, toggleLogin }) => {
    if (showLogin) {
        return (
            <Form className='login-form'>
                <div className="flex justify-end text-3xl hover:text-[#f29a8e]" onClick={toggleLogin}><SlClose/></div>
                
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
                        ¿No tienes cuenta? <a href="/">Registrate aquí</a>
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
                <div className='mt-1 flex flex-col gap-4'>
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
                        <a href="#">
                            <FcGoogle size={40}  className="w-8 h-8"/>
                        </a>

                        Continuar con Google
                    </button>
                    <button
                        className="w-full  flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100 "
                    >
                        <a href="#">
                            <FaFacebook size={40}  className="w-8 h-8 text-[#1877F2]"/>
                        </a>
                        Continuar con Facebook
                    </button>
                </div>
            </Form>


        )
    }
}

export default Login