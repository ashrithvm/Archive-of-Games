import { Link, useNavigate } from 'react-router-dom'

const VideoGamePreview = ({games = [], deleteGame=(id) => {}}) => {

  const navigate = useNavigate();

  const redirectToGame = (vid) => {
    navigate("/videogame/" + vid);
    window.location.reload()
  }

  const noGames = () => {
    return (
      <div>
        <h1>No VideoGames to Display</h1>
      </div>
    )
  }

  const hasGames = () => {
    return (
      games.map(game => {
        return(
            <div key={game.vid} className='gameCard'>
                <div className='game-banner'>
                    <img src={game.banner} />
                </div>
                <div className="gameCard-info">
                    <div>
                        <div className="top">
                            <h1 onClick={() => redirectToGame(game.vid)}>{game.name}</h1>
                            <small>ESRB Rating: {game.esrb_rating}</small>
                        </div>
                        <div className="middle">
                            <p>{game.description}</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Rating: {game.rating}/10</p>
                        <p>Price: ${game.price}</p>
                    </div>
                </div>
                <div className="delete" onClick={() => deleteGame(game.vid)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </div>
            </div>
        )
      })
    )
  }

  return (
    <div id='games-container'>
        {games.length === 0 ? noGames(): hasGames()}
    </div>
  );
}

export default VideoGamePreview;