
//code to hide bushes/tree and reveal Pokemon
let hideEffect = document.getElementsByClassName('hideEffect')

for (let i = 0; i < hideEffect.length; i++) {
  hideEffect[i].onclick = function(e) {
    e.target.style.visibility = 'hidden';
  }
}
