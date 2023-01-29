import './Search.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

import { LikeContainer } from '../../components/LikeContainer'
import { PhotoItem } from '../../components/PhotoItem'

import { Link } from 'react-router-dom'

import { searchPhotos, like } from '../../slices/photoSlice'

export const Search = () => {
  const query = useQuery()
  const search = query.get('q')

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector(state => state.auth)
  const { photos, loading } = useSelector(state => state.photo)

  useEffect(() => {
    dispatch(searchPhotos(search))
  }, [dispatch, search])

  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="search">
      <h3>Você está buscando por: "{search}"</h3>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
        <PhotoItem photo={photo}/>
        <LikeContainer photo={photo} user={user} handleLike={handleLike} />
        <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
      </div>
      ))}
      {photos && photos.length === 0 && (
        <h3 className="no-photos">
          Não foram encontrados resultados para sua busca.
        </h3>
        )}
    </div>
  )
}