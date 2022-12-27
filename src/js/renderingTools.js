/**
 * returns tools and information needed to properly render to canvas
 */
let targetCamera = null;

export function getRenderTools() {
  if (targetCamera != null) {
    return targetCamera.tools;
  }
  return null;
}

/**
 * Points camrea of given camera
 * @param {Camera} camera 
 */
export function bindToolsToCam(camera) {
  targetCamera = camera;
}
