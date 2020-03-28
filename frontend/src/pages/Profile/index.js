import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import { useEffect } from 'react'
import { useState } from 'react'
import { toCurrenty } from '../../utils/helpers'

const Profile = () => {
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  useEffect(() => {
    if (!ongId) {
      history.push('/')
      return
    }

    const requestIncidents = async () => {
      try {
        const res = await api.get('profile', {
          headers: {
            Authorization: ongId,
          },
        })
        setIncidents(res.data)
      } catch (err) {
        alert('Erro, tente mais tarde')
      }
    }

    requestIncidents()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ongId])

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  const handleDeleteIncident = async event => {
    const { id } = event.currentTarget

    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      })

      setIncidents(incidents.filter(i => i.id !== Number(id)))
    } catch (err) {
      alert('Erro, tente mais tarde')
    }
  }

  if (!incidents) {
    return <p>Carregando ... </p>
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />

        <span>Bem vinda, {localStorage.getItem('ongName')}</span>

        <Link className="button" to="/novo-caso">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      {incidents.length < 1 && <p>Não temos casos registrados.</p>}

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{toCurrenty(incident.value)}</p>

            <button type="button" id={incident.id} onClick={handleDeleteIncident}>
              <FiTrash2 size={20} color="#a8a8a3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
