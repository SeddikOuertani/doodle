import { useEffect, useState } from "react"

const colors = ["black", "blue", "green", "yellow", "orange", "red"]

const useColors = () => {
  const [color, setColor] = useState(colors[0])
  const dispatchColorChangeEvent = (newColor) => {
    const colorChangeEvent = new CustomEvent("colorchange", {
      detail: { message: `Color changed to ${newColor}`, color: newColor }
    });
    document.dispatchEvent(colorChangeEvent)
  }

  useEffect(() => {
    dispatchColorChangeEvent(color)
  }, [color])

  return { color, colors, setColor }
}

export default useColors