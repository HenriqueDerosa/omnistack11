import React, { useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

const NewIncident = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    value: '',
  })

  const history = useHistory()

  const ongId = localStorage.getItem('ongId')
  const handleInputChange = useCallback(
    event => {
      const { name, value } = event.target

      setData({
        ...data,
        [name]: value,
      })
    },
    [data]
  )

  const handleNewIncident = useCallback(
    async event => {
      event.preventDefault()

      try {
        await api.post('/incidents', data, {
          headers: {
            Authorization: ongId,
          },
        })

        history.push('/perfil')
      } catch (err) {
        alert('Erro ao cadastrar. Tente mais tarde')
      }
    },
    [data, history, ongId]
  )

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso" value={data.title} name="title" onChange={handleInputChange} />
          <textarea type="email" placeholder="Descrição" value={data.description} name="description" onChange={handleInputChange} />
          <input placeholder="Valor em reais" value={data.value} name="value" onChange={handleInputChange} />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident
