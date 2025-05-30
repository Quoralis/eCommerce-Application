export const showPasswordOrHide = (
  el: HTMLElement,
  iconEl: HTMLElement
): void => {
  iconEl.classList.toggle('active');
  if (iconEl.classList.contains('active')) {
    iconEl.setAttribute('uk-icon', 'icon: eye');
    el.setAttribute('type', 'text');
  } else {
    iconEl.setAttribute('uk-icon', 'icon: eye-slash');
    el.setAttribute('type', 'password');
  }
};
