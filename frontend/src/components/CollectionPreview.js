import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom'

const CollectionPreview = ({selected}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const updateData = (newData) => {
    localStorage.setItem("collectionPreviewData", JSON.stringify(newData))
    console.log("ADDING TO LOCAL STORAGE")
    setData(data)
    window.location.reload()
  }

  useEffect(() => {
    const localData = localStorage.getItem('collectionPreviewData')
    if(localData){
      const resultJson = JSON.parse(localData);
      setData(resultJson)
      console.log("GRABBING FROM LOCAL STORAGE")
    }else{
      fetch(`http://localhost:5050/api/collection/user`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'GET',
        }).then(res => {
            return res.json();
        }).then(data => {
            updateData(data)
            console.log("COLLECTIONS")
            console.log(data)
        })
    }
  }, [])

  const deleteElement = (id) => {
    const copy = [...data]
    const result = copy.filter(collection => collection.cid !== id);
    updateData(result);

    fetch(`http://localhost:5050/api/collection/${id}`, {
      method: 'DELETE',
    })
  }

  const noColletions = () => {
    return (
      <div>
        <h1>No Collections to Display</h1>
      </div>
    )
  }

  const redirectToCollection = (cid) => {
    navigate("/collection/" + cid);
    window.location.reload();
  } 

  const createCollection = (e) => {
    e.preventDefault();

    if(e.target.form[0].value.length !== 0){
      console.log(e.target.form[0].value)
      setName(e.target.form[0].value);

      const payload = {
        "name": e.target.form[0].value,
      }

      const res = JSON.stringify(payload);

      fetch(`http://localhost:5050/api/collection`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        method: 'POST',
        body: res
      }).then(res => {
          return res.json()
      }).then(js => {
        console.log(js)
        const result = {
          "cid": js.cid,
          "name": name,
          "numGames": 0,
          "totalTimePlayed": "0:00"
        }

        console.log(result)
  
        // when there is the backend, send the request and record the response
  
        updateData([...data, result]);
        setName("")

        console.log(data)
      })
    }
  }

  const nameChanged = (e) => {
    setName(e.target.value);
  }

  const hasCollections = () => {
    return (
      data.map(collection => {
        return(
            <div key={collection.cid} className='collection'>
                <div onClick={() => redirectToCollection(collection.cid)} className='collection-info'>
                    <h1><Link to={"/collection/" + collection.cid}>{collection.name}</Link></h1>
                    <div className='collection-small'>
                        <small>Number of Games: {collection.numGames}</small>
                        <small>Time Played: {collection.totalTimePlayed}</small>
                    </div>
                </div>
                <div className='collection-btn'>
                    <button id="delete" onClick={() => deleteElement(collection.cid)}>
                    {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </button>
                </div>
            </div>
        )
      })
    )
  }

  return (
    <div id='collections-container'>
        <div className="banner" id='new-collection-form-container'>
            <form action="">
                <input type="text" name="" id="" onChange={(e) => nameChanged(e)} value={name} placeholder="Collection Name..."/>
                <button className="btn-primary" onClick={(e) => createCollection(e)}>Create</button>
            </form>
          </div>
        {data.length === 0 ? noColletions(): hasCollections()}
    </div>
  );
}

export default CollectionPreview;
