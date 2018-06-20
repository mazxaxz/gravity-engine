const WIDTH = window.innerWidth || document.documentElement.clientWidth;
const HEIGHT = window.innerHeight || document.documentElement.clientHeight;
const FRAME_RATE = 60;
const FRICTION = 0.1;
const Cd = 0.47;
const Rho = 1.22; // Air density
const ag = 9.81;  // Gravity

let environment = 'earth';
let radius = 20;
