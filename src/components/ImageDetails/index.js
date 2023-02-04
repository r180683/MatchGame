import './index.css'

const ImageDetails = props => {
  const {imageDetails, clickThumbnailImg} = props
  const {imageUrl, thumbnailUrl} = imageDetails

  const clickThumbnailImage = () => {
    clickThumbnailImg(imageUrl)
  }

  return (
    <li onClick={clickThumbnailImage} className="image-container">
      <img className="thumbnail-image" alt="thumbnail" src={thumbnailUrl} />
    </li>
  )
}

export default ImageDetails
