import { useRef, useEffect, useState } from 'react'

interface IuseComponentVisible {
  ref: React.RefObject<HTMLDivElement>
  isComponentVisible: boolean
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const useComponentVisible = (): IuseComponentVisible => {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent): void => {
    console.log(ref.current)
    if ((ref.current != null) && !(ref.current.contains((event.target) as Node)) && (event.target as HTMLElement).tagName !== 'INPUT') {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible
