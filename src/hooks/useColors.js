import { useEffect, useState } from "react"
import { dispatchColorChangeEvent } from "../utils/customEvents"

const colors = ["black", "blue", "green", "yellow", "orange", "red"]

const useColors = () => {
  const [color, setColor] = useState(colors[0])

  useEffect(() => {
    dispatchColorChangeEvent(color)
  }, [color])

  return { color, colors, setColor }
}

export default useColors