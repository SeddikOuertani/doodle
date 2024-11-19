import usePopOver from "../../hooks/usePopOver";
import { ColorControlButton, StrokeWidthControlButton } from "./Buttons"
import { ColorPopOver, StrokeWidthPopOver } from "./PopOvers"
import useColors from "../../hooks/useColors";
import useStrokeWidth from "../../hooks/useStrokeWidth";
import { useRef } from "react";

export const StrokeWidthControl = (props) => {
  const { popOverRef, show, setShow } = usePopOver();
  const { strokeWidth, strokeWidths, setStrokeWidth } = useStrokeWidth()
  const strokeWidthControlRef = useRef(null)

  return (
    <>
      <StrokeWidthControlButton
        ref={strokeWidthControlRef}
        onClick={() => setShow(!show)}
        strokeWidth={strokeWidth}
        {...props}
      />
      <StrokeWidthPopOver
        ref={popOverRef}
        controlRef={strokeWidthControlRef}
        strokeWidths={strokeWidths}
        setStrokeWidth={setStrokeWidth}
        show={show}
        setShow={setShow}
      />
    </>
  )
}

export const ColorControl = (props) => {
  const { popOverRef, show, setShow } = usePopOver();
  const { color, colors, setColor } = useColors()
  const colorControlRef = useRef(null)

  return (
    <>
      <ColorControlButton
        ref={colorControlRef}
        onClick={() => setShow(!show)}
        color={color}
        {...props}
      />
      <ColorPopOver
        ref={popOverRef}
        controlRef={colorControlRef}
        show={show}
        setShow={setShow}
        colors={colors}
        setColor={setColor}
      />
    </>
  )
}

const Controls = () => {
  return (
    <div className="absolute gap-2 flex flex-row justify-start top-[10px] left-[10px] right-[10px] center h-[60px] w-auto p-1">
      <StrokeWidthControl />
      <ColorControl />
    </div>
  )
}

export default Controls