import useCanvas from './hooks/useCanvas';
import useDrawing from './hooks/useDrawing';
import Controls from './components/controls';
import Canvas from './components/DrawingCanvas';

function App() {
  const {
    start,
    move,
    changeColor,
    changeStrokeWidth,
    end,
    undo,
    redo,
    changeCanvasSize
  } = useDrawing();

  const canvasRef = useCanvas({
    onDrawStart: start,
    onDrawMove: move,
    onColorChange: changeColor,
    onStrokeWidthChange: changeStrokeWidth,
    onDrawEnd: end,
    onUndo: undo,
    onRedo: redo,
    onScreenSizeChanged: changeCanvasSize
  })

  return (
    <div className="flex h-screen flex-col justify-start w-full h-full bg-slate-200">
      <Canvas ref={canvasRef} />
      <Controls />
    </div>
  );
}

export default App;
