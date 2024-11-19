import { useEffect, useState } from "react"

const strokeWidths = [1, 2, 3, 4, 5, 6]

const useStrokeWidth = () => {
  const [strokeWidth, setStrokeWidth] = useState(strokeWidths[0])
  const dispatchStrokeWidthChangeEvent = (newStrokeWidth) => {
    const strokeWidthChangeEvent = new CustomEvent("strokewidthchange", {
      detail: { message: `Stroke width changed to ${newStrokeWidth}`, strokeWidth: newStrokeWidth }
    });
    document.dispatchEvent(strokeWidthChangeEvent)
  }

  useEffect(() => {
    dispatchStrokeWidthChangeEvent(strokeWidth)
  }, [strokeWidth])

  return { strokeWidth, strokeWidths, setStrokeWidth }
}

export default useStrokeWidth