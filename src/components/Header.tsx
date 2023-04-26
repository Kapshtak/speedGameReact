import React from 'react'

const Header = () => {
  return (
    <header>
      <h1 className="text-center pt-[35px] font-light text-sky-700 text-5xl mb-[50px]">
        {`speedGame by `}
        <span className="text-center text-yellow-600 text-5xl underline decoration-wavy underline-offset-[15px] decoration-2 decoration-red-400">
          {`camel_case`}
        </span>
      </h1>
    </header>
  )
}

export default Header
