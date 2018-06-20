const controls = document.querySelectorAll('[data-env]');

function changeEnvironment() {
  environment = this.dataset.env;

  this.classList.add('active');
  controls.forEach(control => {
    if (control !== this)
      return control.classList.remove('active');
  });

  physicalObjects.splice(0, physicalObjects.length);
};

controls.forEach(control => control.addEventListener('click', changeEnvironment));
