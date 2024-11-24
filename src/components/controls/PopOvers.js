import { forwardRef, useEffect, useState } from "react";
import { ColorControlButton, StrokeWidthControlButton } from "./Buttons";

export const PopOver = forwardRef(({ show, children, controlRef }, ref) => {

  const [positionStyle, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (controlRef) {
      const boundingRect = controlRef.current.getBoundingClientRect()
      setPosition({
        top: boundingRect.y,
        left: boundingRect.x
      })
    }
  }, [controlRef, setPosition])

  return (
    <div
      ref={ref}
      hidden={!show}
      style={positionStyle}
      className={"w-fit h-fit absolute z-50 transition-all"}>
      <div className="
        rounded w-fit h-fit 
        border-[3px] border-solid border-slate-900
        flex flex-col gap-2 
        bg-white p-3 mb-[10px]">
        {children}
      </div>
    </div>
  );
})

export const ColorPopOver = forwardRef((props, ref) => {
  return (
    <PopOver ref={ref} controlRef={props.controlRef} show={props.show}>
      {props.colors.map((color, index) => (
        <ColorControlButton
          key={`${color}${index}`}
          color={color}
          hasBorder={false}
          onClick={() => {
            props.setColor(color)
            props.setShow(!props.show)
          }}
        />
      ))}
    </PopOver>
  )
})

export const StrokeWidthPopOver = forwardRef((props, ref) => {
  return (
    <PopOver ref={ref} controlRef={props.controlRef} show={props.show}>
      {props.strokeWidths.map((strokeWidth, index) => (
        <StrokeWidthControlButton
          key={`${strokeWidth}${index}`}
          strokeWidth={strokeWidth}
          hasBorder={false}
          onClick={() => {
            props.setStrokeWidth(strokeWidth)
            props.setShow(!props.show)
          }}
        />
      ))}
    </PopOver>
  )
})