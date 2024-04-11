import VideoGamePreview from "../components/VideoGamePreview";
import "../css/Search.css"
import { useState, useEffect } from 'react';

const Search = () => {
    
    const [text, setText] = useState("Ascending")
    const [searchBy, setSearchBy] = useState("Search By")
    const [sortBy, setSortBy] = useState("Sort By")

    const [games, setGames] = useState([])

    const changeText = (e) => {
        e.preventDefault();
        if(text === "Ascending"){
            setText("Descending")
        }else{
            setText("Ascending")
        }
    }

    const search = (e) => {
      e.preventDefault();

      const map = {
        "Name": "title",
        "Platform": "pname",
        "Developer": "developer",
        "Price": 'price',
        "Genre": 'genre' 
      }

      if(e.target.form[0].value.length === 0){
        return;
      }

      // set request
      fetch(`http://localhost:5050/api/videogame/1/${map[searchBy]}/${e.target.form[0].value}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'GET',
      }).then(res => {
        return res.json();
      }).then(final => {
        setGames(final)
      })

      
    }

    const deleteGame = (vid) => {
      const copy = [...games]
      const results = copy.filter(game => game.vid !== vid);

      setGames(results)
    }

    return (
        <div className="main-content">
            <form action="" id="search">
                <input type="text" name="" id="" placeholder="Search for a Game..."/>
                <div className="dropdown">
                    <button className="btn-drop btn-secondary btn-wide">{searchBy}</button>
                    <div className="dropdown-content">
                        <div onClick={() => setSearchBy("Name")}>Name</div>
                        <div onClick={() => setSearchBy("Platform")}>Platform</div>
                        <div onClick={() => setSearchBy("Release Date")}>Release Date</div>
                        <div onClick={() => setSearchBy("Developer")}>Developer</div>
                        <div onClick={() => setSearchBy("Price")}>Price</div>
                        <div onClick={() => setSearchBy("Genre")}>Genre</div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn-drop btn-secondary btn-wide">{sortBy}</button>
                    <div className="dropdown-content">
                        <div onClick={() => setSortBy("Name")}>Name</div>
                        <div onClick={() => setSortBy("Price")}>Price</div>
                        <div onClick={() => setSortBy("Genre")}>Genre</div>
                        <div onClick={() => setSortBy("Release Year")}>Release Year</div>
                    </div>
                </div>
                <button className="btn-secondary btn-wide" onClick={(e) => changeText(e)}>{text}</button>
                <button className="btn-primary btn-wide" onClick={(e) => search(e)}>Search</button>
            </form>

        <VideoGamePreview games={games} deleteGame={deleteGame}/>
        </div>
        
    )
};

export default Search;