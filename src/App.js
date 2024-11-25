import useCanvas from './hooks/useCanvas';
import useDrawing from './hooks/useDrawing';
import Controls from './components/controls';
import Canvas from './components/DrawingCanvas';
import useSocket from './hooks/useSocket';

function App() {
  const {socket} = useSocket()
  const {
    start,
    move,
    changeColor,
    changeStrokeWidth,
    end,
    undo,
    redo,
    drawStep,
    resetSteps,
    changeCanvasSize
  } = useDrawing(socket);

  const canvasRef = useCanvas({
    onDrawStart: start,
    onDrawMove: move,
    onColorChange: changeColor,
    onStrokeWidthChange: changeStrokeWidth,
    onDrawEnd: end,
    onUndo: undo,
    onRedo: redo,
    onStepAdded: drawStep,
    onResetSteps: resetSteps,
    onScreenSizeChanged: changeCanvasSize
  })

  
  return  (
    <div className="flex h-screen flex-col justify-start w-full h-full bg-slate-200"> 
      {socket ? ( 
        <>
          <Canvas ref={canvasRef} />
          <Controls />
        </>
      ) : <div/> }
    </div>
  )
}

export default App;
