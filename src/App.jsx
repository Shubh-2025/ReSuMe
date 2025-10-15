import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen h-screen bg-amber-100 flex justify-center place-items-center' >
      <div className='text-black font-extrabold text-4xl'>App</div>
    </div>
  )
}

export default App;
