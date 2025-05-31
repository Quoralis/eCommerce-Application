export function clearDom(className: string) {
  const element = document.querySelector(`.${className}`);
  if (element) element.innerHTML = '';
}
