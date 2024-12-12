const calculateProgressDetails = (progress: number) => {
  let level = 1
  let index = 0
  let adjustedProgress = progress

  if (progress < 100) {
    level = 1
    index = 0
  } else if (progress < 250) {
    level = 2
    index = 1
    adjustedProgress = progress - 100
  } else {
    level = 3
    index = 2
    adjustedProgress = progress - 250
  }

  return { level, index, adjustedProgress }
}
export default calculateProgressDetails
