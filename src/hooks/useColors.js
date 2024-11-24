import { useEffect, useState } from "react"

const colors = ["black", "blue", "green", "yellow", "orange", "red"]

const dispatchColorChangeEvent = (newColor) => {
  const colorChangeEvent = new CustomEvent("colorchange", {
    detail: { message: `Color changed to ${newColor}`, color: newColor }
  });
  document.dispatchEvent(colorChangeEvent)
}

const useColors = () => {
  const [color, setColor] = useState(colors[0])

  useEffect(() => {
    dispatchColorChangeEvent(color)
  }, [color])

  return { color, colors, setColor }
}

export default useColors