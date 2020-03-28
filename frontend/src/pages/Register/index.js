import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

const Register = () => {
  const [ong, setOng] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    uf: '',
  })

  const history = useHistory()

  const handleRegister = async event => {
    event.preventDefault()

    try {
      await api.post('/ongs', ong)

      history.push('/')
    } catch (err) {
      alert('Erro, tente novamente mais tarde')
    }
  }

  const handleInputChange = event => {
    setOng({
      ...ong,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="Nome da ONG" name="name" value={ong.name} onChange={handleInputChange} />
          <input type="email" placeholder="E-mail" name="email" value={ong.email} onChange={handleInputChange} />
          <input placeholder="WhatsApp" name="whatsapp" value={ong.whatsapp} onChange={handleInputChange} />

          <div className="input-group">
            <input placeholder="Cidade" name="city" value={ong.city} onChange={handleInputChange} />
            <input placeholder="UF" style={{ width: 80 }} name="uf" value={ong.uf} onChange={handleInputChange} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
