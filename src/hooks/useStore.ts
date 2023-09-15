import { useState, useEffect } from 'react'

// avoid persist state hydration issue with Zustand

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  console.log({
    result,
    data
  })

  return data
}

export default useStore