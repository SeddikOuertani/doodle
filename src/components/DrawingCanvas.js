import { forwardRef } from "react"

const Canvas = forwardRef((props, canvasRef) => {
  return (
    <div className="w-full h-full flex flex-row justify-center bg-white items-start">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width="300"
        height="150"
      ></canvas>
    </div>
  )
})

export default Canvas