import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    //grab all of the users collections and display the first one if there is one, if not then do not redirect
    navigate("/collection/0");
  }, [])

  return (
    <div id='collections-container'className='container'>
      <h1>Make a collection to get started!</h1>
    </div>
  );
}

export default Home;
