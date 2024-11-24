import { useEffect, useState } from "react"

const strokeWidths = [1, 2, 3, 4, 5, 6]

const dispatchStrokeWidthChangeEvent = (newStrokeWidth) => {
  const strokeWidthChangeEvent = new CustomEvent("strokewidthchange", {
    detail: { message: `Stroke width changed to ${newStrokeWidth}`, strokeWidth: newStrokeWidth }
  });
  document.dispatchEvent(strokeWidthChangeEvent)
}

const useStrokeWidth = () => {
  const [strokeWidth, setStrokeWidth] = useState(strokeWidths[0])
  
  useEffect(() => {
    dispatchStrokeWidthChangeEvent(strokeWidth)
  }, [strokeWidth])

  return { strokeWidth, strokeWidths, setStrokeWidth }
}

export default useStrokeWidth