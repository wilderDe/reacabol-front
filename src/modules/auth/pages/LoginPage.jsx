import { useAuth } from '../../../hooks/useAuth'
import { useState } from 'react'
import logo_recabol from '../../../assets/logo.png'
import user from '../../../assets/icons/user.png'
import password from '../../../assets/icons/password.png'
import '../css/login.css'

export const LoginPage = () => {

    const { checking, verificarLogin } = useAuth()
    const [form, setForm] = useState({
        usuario: "",
        password: "",
    })
    

    const onChange = ( {target} ) => {
        setForm({
            ...form,
            [target.name] : target.value
        })
    }

    const handleSubmit = () => {
        //TODO: redireccionar
        verificarLogin(form)
    }

    return (
        <div className='login'>
            <img src={ logo_recabol } alt="" />
            <div className="login_content">
                <h1>Ingreso</h1>

                <div className="btn_content">
                    <img src={user} alt="" />
                    <input 
                        type="text" 
                        name="usuario" 
                        value={form.usuario}
                        onChange={onChange}
                        placeholder='Usuario' />
                </div>
                <div className="btn_content">
                    <img src={password} alt="" />
                    <input 
                        type="password" 
                        name="password" 
                        value={form.password}
                        onChange={onChange}
                        placeholder='Contraseña' 
                    />
                </div>

                <input 
                    className={checking?'btn_disabled' :"btn_login" }
                    type="submit" 
                    value="INICIAR SESIÓN"
                    onClick={handleSubmit}
                    disabled={checking}
                />
            </div>

            <div className="footer"></div>

        </div>
    )
}
