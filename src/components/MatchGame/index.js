import {Component} from 'react'
import TabItem from '../TabItem'
import ImageDetails from '../ImageDetails'
import './index.css'

class MatchGame extends Component {
  state = {
    score: 0,
    timer: 60,
    randomImageIndex: 0,
    activeTabId: 'FRUIT',
    isGameEnd: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.setState(prevState => ({timer: prevState.timer - 1}))
  }

  updateActiveTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  clickThumbnailImg = imgUrl => {
    const {imagesList} = this.props
    const {randomImageIndex} = this.state
    if (imgUrl === imagesList[randomImageIndex].imageUrl) {
      const randIndex = Math.floor(Math.random() * imagesList.length)
      this.setState(prevState => ({
        score: prevState.score + 1,
        randomImageIndex: randIndex,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameEnd: true})
    }
  }

  resetBtnClick = () => {
    this.setState({
      isGameEnd: false,
      score: 0,
      timer: 60,
      randomImageIndex: 0,
      activeTabId: 'FRUIT',
    })
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {score, timer, randomImageIndex, activeTabId, isGameEnd} = this.state
    const randomImageUrl = imagesList[randomImageIndex].imageUrl
    const filteredList = imagesList.filter(
      each => activeTabId === each.category,
    )
    if (timer === 0) {
      this.setState({isGameEnd: true})
      clearInterval(this.timerId)
      console.log('gfcbbbbbcvcvcc')
    }
    return (
      <div className="app-container">
        <nav className="nav-container">
          <img
            className="website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          />
          <ul className="nav-items-container">
            <li className="nav-item">
              Score:<span className="span-text">{score}</span>
            </li>
            <li className="nav-item">
              <img
                className="timer-reset-image"
                alt="timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              />
            </li>
            <p className="span-text">{timer} sec</p>
          </ul>
        </nav>
        {!isGameEnd ? (
          <div className="game-container">
            <img className="match-image" alt="match" src={randomImageUrl} />
            <ul className="tabs-container">
              {tabsList.map(each => (
                <TabItem
                  key={each.tabId}
                  tabDetails={each}
                  activeTabId={activeTabId}
                  updateActiveTab={this.updateActiveTab}
                />
              ))}
            </ul>
            <ul className="things-container">
              {filteredList.map(each => (
                <ImageDetails
                  key={each.id}
                  imageDetails={each}
                  clickThumbnailImg={this.clickThumbnailImg}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="game-container">
            <div className="game-end-bg-container">
              <img
                className="trophy"
                alt="trophy"
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              />
              <p className="score">YOUR SCORE</p>
              <p className="score">{score}</p>
              <button
                onClick={this.resetBtnClick}
                type="button"
                className="reset-btn"
              >
                <img
                  className="reset-image"
                  alt="reset"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                />
                <p>PLAY AGAIN</p>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
