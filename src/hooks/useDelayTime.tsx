import { useEffect, useState } from 'react';

const useDelayTime = (delay) => {
  const [timer, setTimer] = useState()

  useEffect(() => () => {
    clearTimeout(timer)
  }, [timer])

  const delayTime = (callback, ...args) => {
    clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      await callback(...args)
    }, delay) // Pass the delay argument to setTimeout

    setTimer(newTimer)
  };

  return delayTime
};

export default useDelayTime
