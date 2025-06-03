export const toggleInputsState = (
  parent: HTMLFormElement,
  disabled: boolean
): void => {
  for (let i = 0; i < parent.length; i++) {
    const input = <HTMLInputElement>parent[i];
    const eye = <HTMLElement>input.previousElementSibling;
    if (!disabled) {
      input.disabled = false;
      eye.classList.remove('non-active');
    } else {
      input.disabled = true;
      eye.classList.add('non-active');
    }
  }
};
