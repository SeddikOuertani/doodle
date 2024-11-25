import { useRef, useEffect } from 'react';
import useColors from './useColors';
import useStrokeWidth from './useStrokeWidth';

const useCanvas = ({
  onDrawStart,
  onDrawMove,
  onColorChange,
  onStrokeWidthChange,
  onDrawEnd,
  onUndo,
  onRedo,
  onStepAdded,
  onResetSteps,
  onScreenSizeChanged
}) => {
  const canvasRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const { colors } = useColors()
  const { strokeWidths } = useStrokeWidth()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    let selectedColor = colors[0]
    let selectedStrokeWidth = strokeWidths[0]

    const handleMouseDown = (event) => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      isMouseDownRef.current = true;
      onDrawStart(ctx, x, y);
    };

    const handleMouseMove = (event) => {
      if (!isMouseDownRef.current) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      onDrawMove(ctx, x, y);
    };

    const handleColorChange = (event) => {
      const newColor = event.detail.color
      selectedColor = newColor
      onColorChange(ctx, newColor);
    }

    const handleStrokeWidthChange = (event) => {
      const newStrokeWidth = event.detail.strokeWidth
      selectedStrokeWidth = newStrokeWidth
      onStrokeWidthChange(ctx, newStrokeWidth);
    }

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      onDrawEnd(ctx);
    };

    const handleStepAdded = (event) => {
      const ctx2 = canvas.getContext('2d');
      onStepAdded(ctx2, event.detail.data, selectedColor, selectedStrokeWidth)
    }

    const handleStepsReset  = (event) => {
      const ctx2 = canvas.getContext('2d');
      onResetSteps(ctx2, event.detail.data, selectedColor, selectedStrokeWidth)
    }

    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        if (event.key.toLowerCase() === 'z') {
          event.preventDefault();
          onUndo(ctx, selectedColor, selectedStrokeWidth);
        } else if (event.key.toLowerCase() === 'y') {
          event.preventDefault();
          onRedo(ctx);
        }
      }
    };
    
    const handleScreenResize = (event) => {
      let resizeTimeout
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        onScreenSizeChanged(ctx)
      }, 200); // Adjust debounce delay as needed
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleScreenResize);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('colorchange', handleColorChange);
    document.addEventListener('strokewidthchange', handleStrokeWidthChange);
    document.addEventListener('stepAdded', handleStepAdded);
    document.addEventListener('stepsReset', handleStepsReset);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      window.addEventListener('resize', handleScreenResize);
      document.removeEventListener('keydown', handleKeyDown);
      document.addEventListener('colorchange', handleColorChange);
      document.addEventListener('strokewidthchange', handleStrokeWidthChange);
      document.addEventListener('stepsReset', handleStepsReset);
    };
  }, [onDrawStart, onDrawMove, onColorChange, onStrokeWidthChange, onDrawEnd, onUndo, onRedo, onStepAdded, onResetSteps, onScreenSizeChanged, strokeWidths, colors]);

  return canvasRef;
};

export default useCanvas;