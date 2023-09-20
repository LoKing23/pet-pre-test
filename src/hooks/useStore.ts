import { useState, useEffect } from 'react'

// avoid persist state hydration issue with Zustand

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
  initialValue?: F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F | undefined>(initialValue)

  useEffect(() => {
    setData(result);
  }, [result])

  return data
}

export default useStore