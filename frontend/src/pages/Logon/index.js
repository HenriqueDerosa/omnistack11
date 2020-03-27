import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { useState } from 'react'
import api from '../../services/api'

const Logon = () => {
  const [id, setId] = useState('')
  const history = useHistory()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      alert(`Bem vindo, ${response.data.name}`)
      history.push('/perfil')
    } catch (err) {
      alert('Erro, tente mais tarde')
    }
  }

  const handleInputChange = e => setId(e.target.value)

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça o seu logon</h1>
          <input placeholder="Sua ID" value={id} onChange={handleInputChange} />

          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/registro">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}

export default Logon
