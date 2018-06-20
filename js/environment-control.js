const environmentControls = document.querySelectorAll('[data-env]');
const massControler = document.querySelector('[name="mass-control"]');
const massValue = document.querySelector('#mass-value');

function changeEnvironment() {
  environment = this.dataset.env;

  this.classList.add('active');
  environmentControls.forEach(control => {
    if (control !== this)
      return control.classList.remove('active');
  });

  physicalObjects.splice(0, physicalObjects.length);
};

function changeMass() {
  massValue.textContent = this.value;
  radius = this.value / 10;
};

environmentControls.forEach(control => control.addEventListener('click', changeEnvironment));
massControler.addEventListener('input', changeMass);
