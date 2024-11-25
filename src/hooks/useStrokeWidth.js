import { useEffect, useState } from "react"
import { dispatchStrokeWidthChangeEvent } from "../utils/customEvents"

const strokeWidths = [1, 2, 3, 4, 5, 6]

const useStrokeWidth = () => {
  const [strokeWidth, setStrokeWidth] = useState(strokeWidths[0])
  
  useEffect(() => {
    dispatchStrokeWidthChangeEvent(strokeWidth)
  }, [strokeWidth])

  return { strokeWidth, strokeWidths, setStrokeWidth }
}

export default useStrokeWidth