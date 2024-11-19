import { forwardRef, useEffect, useState } from "react"

const ControlButton = forwardRef(({ hasBorder = true, ...props }, ref) => (
  <button
    ref={ref}
    style={props.style}
    onClick={props.onClick}
    className={`relative shadow bg-white hover:bg-slate-200 ${hasBorder ? "border-[3px] border-solid border-black" : ""
      } h-[50px] w-[50px] flex justify-center rounded-lg items-center`}
  >
    {props.children}
  </button>
));

export const ColorControlButton = forwardRef((props, ref) => {
  const [colorStyle, setColorStyle] = useState({ backgroundColor: "black" })
  useEffect(() => {
    setColorStyle({ backgroundColor: props.color })
  }, [props.color])
  return (
    <ControlButton ref={ref} {...props}>
      <div
        style={colorStyle}
        className="w-1/2 h-1/2 rounded-[50%]" />
    </ControlButton>
  )
})

export const StrokeWidthControlButton = forwardRef((props, ref) => {
  const [strokeWidthStyle, setStrokeWidthStyle] = useState({ height: "2px" })
  useEffect(() => {
    setStrokeWidthStyle({ height: `${props.strokeWidth}px` })
  }, [props.strokeWidth])
  return (
    <ControlButton {...props} ref={ref}>
      <div
        style={strokeWidthStyle}
        className={
          "w-4/6 " +
          " rotate-45 bg-black"
        } />
    </ControlButton>
  )
})


export const CircleControlButton = forwardRef((props, ref) => {
  const [colorStyle, setColorStyle] = useState({ backgroundColor: "black" })
  useEffect(() => {
    setColorStyle({ backgroundColor: props.color })
  }, [props.color])
  return (
    <ControlButton ref={ref} {...props}>
      <div
        style={colorStyle}
        className="w-1/2 h-1/2 rounded-[50%]" />
    </ControlButton>
  )
})