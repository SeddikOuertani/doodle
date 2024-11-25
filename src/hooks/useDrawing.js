import { useRef } from "react";

const useDrawing = (socket) => {
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

    // socket handling
    socket.emit('step', {canvasFunction: 'beginPath', params:[], actionId: actionHistory.current.length - 1})
    socket.emit('step', {canvasFunction: 'moveTo', params:[x, y], actionId: actionHistory.current.length - 1})
  };

  const move = (ctx, x, y) => {
    const lineTo = () => ctx.lineTo(x, y);
    const stroke = () => ctx.stroke();
    const action = actionHistory.current.pop() || [];
    action.push(lineTo, stroke);
    actionHistory.current.push(action);
    lineTo();
    stroke();

    // socket handling
    socket.emit('step', {canvasFunction: 'lineTo', params:[x, y], actionId: actionHistory.current.length - 1})
    socket.emit('step', {canvasFunction: 'stroke', params:[], actionId: actionHistory.current.length - 1})
  };

  const changeColor = (ctx, color) => {
    const colorChange = () => ctx.strokeStyle = color
    const action = actionHistory.current.pop() || [];
    action.push(colorChange);
    actionHistory.current.push(action);
    colorChange()

    // socket handling
    socket?.emit('step', {canvasAttribute: 'strokeStyle', value: color, actionId: actionHistory.current.length - 1})
  }

  const changeStrokeWidth = (ctx, strokeWidth) => {
    const strokeWidthChange = () => ctx.lineWidth = strokeWidth;
    const action = actionHistory.current.pop() || [];
    action.push(strokeWidthChange);
    actionHistory.current.push(action);
    strokeWidthChange()

    // socket handling
    socket?.emit('step', {canvasAttribute: 'lineWidth', value: strokeWidth, actionId: actionHistory.current.length - 1})
  }

  const end = (ctx) => {
    const closePath = () => ctx.closePath();
    const action = actionHistory.current.pop() || [];
    action.push(closePath);
    actionHistory.current.push(action);
    closePath();

    // socket handling
    socket.emit('step', { canvasFunction: 'closePath', params: [], actionId: actionHistory.current.length - 1 })
  };

  const undo = (ctx, color, strokeWidth) => {
    if (actionHistory.current.length === 0) return;
    actionFuture.current.push(actionHistory.current.pop());
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    actionHistory.current.forEach((action) => action.forEach((step) => step()));

    // reset selected controls
    changeColor(ctx, color)
    changeStrokeWidth(ctx, strokeWidth)

    // socket handling
    socket?.emit('undo', { actionId: actionHistory.length})
  };

  const redo = (ctx) => {
    if (actionFuture.current.length === 0) return;
    const action = actionFuture.current.pop();
    action.forEach((step) => step());
    actionHistory.current.push(action);

    // socket handling
    socket?.emit('redo', {  actionId: actionFuture.current.length})
  };

  const drawStep = (ctx, stepData) => {
    if (!socket || stepData.userId === socket?.id) return
    
    let step
    if (stepData.canvasFunction) {
      step = () => {ctx[stepData.canvasFunction](...stepData.params)}
    } else if (stepData.canvasAttribute) {
      step = () => {ctx[stepData.canvasAttribute] = stepData.value}
    }
    step()
  }

  const resetSteps = (ctx, steps) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let stepData of steps) {
      drawStep(ctx, stepData)
    }

    actionHistory.current.forEach((action) => action.forEach((step) => step()));
  }

  const changeCanvasSize = (ctx) => {
    if (actionHistory.current.length === 0) return;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    ctx.canvas.width = screenWidth;
    ctx.canvas.height = screenHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    actionHistory.current.forEach((action) => action.forEach((step) => step()));
  };

  return { start, move, changeColor, changeStrokeWidth, end, undo, redo, changeCanvasSize, drawStep, resetSteps };
};

export default useDrawing