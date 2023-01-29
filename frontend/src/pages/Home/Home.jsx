import './Home.css'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { LikeContainer } from '../../components/LikeContainer'
import { PhotoItem } from '../../components/PhotoItem'

import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

import { getPhotos, like } from '../../slices/photoSlice'

export const Home = () => {
  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  useEffect(() => {
    dispatch(getPhotos())
  }, [dispatch])

  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo}/>
          <LikeContainer photo={photo} user={user} handleLike={handleLike} />
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h3 className="no-photos">
          Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link> para uma nova publicação
        </h3>
        )}
    </div>
  )
}