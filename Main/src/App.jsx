import React from 'react'
import Card from './components/card'
import freelancers from './components/freelancers'

function App() {
  return (
    <div className='card-list'>
      {freelancers.map((freelancer) => (
        <Card key={freelancer.id} {...freelancer} />
      ))}
    </div>
  )
}

export default App