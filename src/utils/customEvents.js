export const dispatchColorChangeEvent = (newColor) => {
  const colorChangeEvent = new CustomEvent("colorchange", {
    detail: { message: `Color changed to ${newColor}`, color: newColor }
  });
  document.dispatchEvent(colorChangeEvent)
}

export const dispatchStrokeWidthChangeEvent = (newStrokeWidth) => {
  const strokeWidthChangeEvent = new CustomEvent("strokewidthchange", {
    detail: { message: `Stroke width changed to ${newStrokeWidth}`, strokeWidth: newStrokeWidth }
  });
  document.dispatchEvent(strokeWidthChangeEvent)
}

export const dispatchStepAddedEvent = (stepData) => {
  const stepAddedEvent = new CustomEvent("stepAdded", {
    detail: { message: `new Step added`, data: stepData }
  });
  document.dispatchEvent(stepAddedEvent)
}

export const dispatchResetSteps = (newSteps) => {
  const resetStepsEvent = new CustomEvent("stepsReset", {
    detail: { message: `steps resetted`, data: newSteps }
  });
  document.dispatchEvent(resetStepsEvent)
}
