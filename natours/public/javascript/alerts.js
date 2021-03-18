// type is 'success' or 'error'

export const hideAlert = () => {
  const element = document.querySelector('.alert');
  if (element) element.parentElement.removeChild(element);
};

export const showAlert = (type, message) => {
  hideAlert();
  console.log(type, message);
  const markup = `<div class="alert alert--${type}">${message}</div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  window.setTimeout(hideAlert, 5000);
};
