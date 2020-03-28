import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'
import { toCurrenty } from '../../utils/helpers'

const Incidents = () => {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()

  const loadIncidents = useCallback(async () => {
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)

    const response = await api.get('incidents', {
      params: {
        page,
      },
    })

    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }, [incidents.length, total])

  useEffect(() => {
    loadIncidents()
  }, [])

  const navigateToDetail = incident => {
    navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total}</Text> casos
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.5}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{toCurrenty(incident.value)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.buttonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default Incidents
