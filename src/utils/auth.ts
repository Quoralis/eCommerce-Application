import Router from '../router/Router.js';

export async function updateAuthUI() {
  const loginBtns = document.querySelectorAll('.login-btn, .sign-up-btn');
  loginBtns.forEach((btn) => {
    btn.classList.toggle('hidden');
  });
  const profileBtns = document.querySelectorAll('.profile-btn, .sign-out-btn');
  profileBtns.forEach((btn) => {
    btn.classList.toggle('hidden');
  });
  await Router.getInstance().navigate('/');
}
