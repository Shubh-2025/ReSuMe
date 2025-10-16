import { useState } from 'react'
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  // const flag = true
  const flag = false
  return (
    <div className='w-screen h-screen bg-amber-100 flex flex-col justify-between' >
       <Outlet/>
    </div>
  )
}

export default App;
