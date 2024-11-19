import { useRef } from "react";

const useDrawing = () => {
  const actionHistory = useRef([]);
  const actionFuture = useRef([]);

  const start = (ctx, x, y) => {
    const beginPath = () => ctx.beginPath();
    const moveTo = () => ctx.moveTo(x, y);
    actionFuture.current = [];
    const action = [beginPath, moveTo];
    actionHistory.current.push(action);
    beginPath();
    moveTo();
  };

  const move = (ctx, x, y) => {
    const lineTo = () => ctx.lineTo(x, y);
    const stroke = () => ctx.stroke();
    const action = actionHistory.current.pop() || [];
    action.push(lineTo, stroke);
    actionHistory.current.push(action);
    lineTo();
    stroke();
  };

  const changeColor = (ctx, color) => {
    const colorChange = () => ctx.strokeStyle = color
    const action = actionHistory.current.pop() || [];
    action.push(colorChange);
    actionHistory.current.push(action);
    colorChange()
  }

  const changeStrokeWidth = (ctx, strokeWidth) => {
    const strokeWidthChange = () => ctx.lineWidth = strokeWidth;
    const action = actionHistory.current.pop() || [];
    action.push(strokeWidthChange);
    actionHistory.current.push(action);
    strokeWidthChange()
  }

  const end = (ctx) => {
    const closePath = () => ctx.closePath();
    const action = actionHistory.current.pop() || [];
    action.push(closePath);
    actionHistory.current.push(action);
    closePath();
  };

  const undo = (ctx, color, strokeWidth) => {
    if (actionHistory.current.length === 0) return;
    actionFuture.current.push(actionHistory.current.pop());
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    actionHistory.current.forEach((action) => action.forEach((step) => step()));

    // reset selected controls
    changeColor(ctx, color)
    changeStrokeWidth(ctx, strokeWidth)
  };

  const redo = (ctx) => {
    if (actionFuture.current.length === 0) return;
    const action = actionFuture.current.pop();
    action.forEach((step) => step());
    actionHistory.current.push(action);
  };

  const changeCanvasSize = (ctx) => {
    if (actionHistory.current.length === 0) return;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    ctx.canvas.width = screenWidth;
    ctx.canvas.height = screenHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    actionHistory.current.forEach((action) => action.forEach((step) => step()));
  };

  return { start, move, changeColor, changeStrokeWidth, end, undo, redo, changeCanvasSize };
};

export default useDrawing