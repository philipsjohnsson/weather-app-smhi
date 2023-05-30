import React, { useRef, useEffect, useState } from 'react'

const useComponentVisible = () => {
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && event.target.tagName !== 'INPUT') {
      console.log('we are inside of here')
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible
