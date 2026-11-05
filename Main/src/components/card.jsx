import React from 'react'

const Card = ({ photo, name, description, skills, rating, status, hourlyRate }) => {
  return (
    <div className='main'>

      <div className='top'>
        <img src={photo} alt={name} />
        <button>save</button>
      </div>

      <div className='center'>
        <div className='incneter'>
          <div className='user'>{name}</div>
          <div className='possion'>{description}</div>
        </div>
        <div className='skills'>
          <div className='skill-1'>{skills[0]}</div>
          <div className='skill-2'>{skills[1]}</div>
        </div>
      </div>

      <div className='bottom'>
        <div className='rating'>{rating} star</div>
        <div className={`status ${status}`}>{status}</div>
        <div className='price'>${hourlyRate}/hr</div>
      </div>

      <div className='talk'>
        <button>Get in touch</button>
      </div>

    </div>
  )
}

export default Card