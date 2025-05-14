export function clearDom(classTagName: string) {
  const element = document.querySelector(`${classTagName}`);
  if (element) element.innerHTML = '';
}
