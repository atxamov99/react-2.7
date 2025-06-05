import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [user, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://randomuser.me/api/')
      setUsers(res.data.results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='bg-[#533FF0] text-white min-h-screen flex flex-col items-center justify-center'>
      <div className="bg-[#FFFFFF] text-black p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <h1 className='text-3xl text-black p-[10px] mb-[20px]'>Random User Generator</h1>
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#533FF0]"></div>
          </div>
        ) : user.length > 0 ? (
          user.map((item, index) => (
            <div key={index} className="">
              <img 
                src={item.picture.large} 
                alt={`${item.name.first} ${item.name.last}`} 
                className='rounded-full border-3 border-[#533FF0] mb-4 w-[100px] h-[100px] mx-auto' 
              />
              <h2>{`${item.name.first} ${item.name.last}`}</h2>
              <p className='pt-[10px]'>Email: {item.email}</p>
              <p className='p-[10px]'>Location: {`${item.location.city}, ${item.location.country}`}</p>
              <button 
                onClick={fetchUser} 
                className='bg-[#533FF0] text-white py-2 px-4 rounded-lg mt-4 disabled:opacity-50'
                disabled={loading}
              >
                Generate New User
              </button>
            </div>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  )
}

export default App