import { useState, useEffect } from 'react';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5050/api/friends`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },

          method: 'GET',
        }).then(res => {
            return res.json();
        }).then(data => {
            setFriends(data);
            console.log(data)
        })
    }, []);

    const displayUsers = () => {
        return(
            users.map((user) =>  {
                return(
                    <tr key={user.uid}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button className='btn-primary' onClick={() => follow(user.uid)}>Follow</button></td>
                    </tr>
                )
            })
        )
    }

    const displayFriends = () => {
        return(
            friends.map((user) =>  {
                return(
                    <tr key={user.uid}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button className='btn-primary' onClick={() => unfollow(user.uid)}>Unfollow</button></td>
                    </tr>
                )
            })
        )
    }

    const noResults = () => {
        return (
            <tr>
                <td>No Users Found</td>
                <td></td>
                <td></td>
            </tr>
            
        )
    }

    const follow = (uid) => {
        const friend = users.find(user => user.uid === uid)
        const newFriends = [...friends, friend]

        setFriends(newFriends)

        fetch(`http://localhost:5050/api/user/follow/${uid}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },

          method: 'POST',
        })

        const copy = [...users]
        const result = copy.filter(user => user.uid !== uid);
        setUsers(result);
    }

    const unfollow = (uid) => {
        const copy = [...friends]
        const result = copy.filter(user => user.uid !== uid);
        setFriends(result);

        fetch(`http://localhost:5050/api/user/follow/${uid}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },

          method: 'DELETE',
        })
    }

    const search = (e) => {
        e.preventDefault();
        const email = e.target.form[0].value;

        if(email.length === 0){
            return;
        }

        // make fetch request
        fetch(`http://localhost:5050/api/user/follow/${email}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
  
            method: 'GET',
          }).then(res => {
              return res.json();
          }).then(data => {
              setUsers(data);
              console.log(data)
          })
    }

    return (
        <div className='main-content'>
            <form action="" id="search">
                <input type="text" name="" id="" placeholder="Search by email..."/>
                <button className="btn-primary btn-wide" onClick={(e) => search(e)}>Search</button>
            </form>
            <div className="users">
                <h1>Search Results:</h1>
                <table>
                    <thead className='head'>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Follow</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? noResults() : displayUsers()}
                    </tbody>
                </table>
                <h1>Following:</h1>
                <table>
                    <thead className='head'>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>UnFollow</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.length === 0 ? noResults() : displayFriends()}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Users;