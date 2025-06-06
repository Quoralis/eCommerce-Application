export function clearDom(className: string) {
  // console.log('+');
  const element = document.querySelector(`.${className}`);
  if (element) element.innerHTML = '';
}
