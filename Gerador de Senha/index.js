// Adicionando o evento DOM - HTML element

const inputEl = document.querySelector("#password");
const constLetrasMaiusculasEL = document.querySelector("#AddLetraMaiuscula");
const constNumerosEl = document.querySelector("#AddLetraNumero");
const constSimbolosEl = document.querySelector("#AddLetraSimbolo");
const indicadorDeForcaDeSenhaEl = document.querySelector(
  "#indicadorDeForcaDeSenha-bar"
);

// - Eventos de adicionar: Letras mínusculas, Letras maiusculas, Símbolos e Resetar senha.
constLetrasMaiusculasEL.addEventListener("click", funcaoGerarSenha);
constNumerosEl.addEventListener("click", funcaoGerarSenha);
constSimbolosEl.addEventListener("click", funcaoGerarSenha);

// - Evento de resetar senha com o click
document.querySelector("#renew").addEventListener("click", funcaoGerarSenha);

// - Evento de copiar senha com o click
document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

let passwordLength = 16;

function funcaoGerarSenha() {
  let caracteresIniciais = "abcdefghjkmnpqrstuvwxyz";

  const letrasMaiusculas = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numeros = "123456789";
  const symboloss = "?!@&*()[]";

  if (constLetrasMaiusculasEL.checked) {
    caracteresIniciais += letrasMaiusculas;
  }

  if (constNumerosEl.checked) {
    caracteresIniciais += numeros;
  }

  if (constSimbolosEl.checked) {
    caracteresIniciais += symboloss;
  }

  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * caracteresIniciais.length);
    password += caracteresIniciais.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password; // inputEl.textContext = password;
  console.log(password); // Senha atualizada a cada interação.

  calcularForcaSenha();
  calculateFontSize();
}

function calcularForcaSenha() {
  // A*P1 + B*P2 + C*P3 = 100 / CONCEITO DE PESO
  const percent = Math.round(
    (passwordLength / 64) * 35 +
      (constLetrasMaiusculasEL.checked ? 15 : 0) +
      (constNumerosEl.checked ? 15 : 0) +
      (constSimbolosEl.checked ? 35 : 0)
  );

  console.log(percent);

  indicadorDeForcaDeSenhaEl.style.width = `${percent}%`;

  console.log(indicadorDeForcaDeSenhaEl);

  if (percent > 69) {
    // senhaForte
    indicadorDeForcaDeSenhaEl.classList.remove("senhaFraca");
    indicadorDeForcaDeSenhaEl.classList.remove("senhaRazoavel");
    indicadorDeForcaDeSenhaEl.classList.add("senhaForte");
  } else if (percent > 50) {
    // senhaRazoavel
    indicadorDeForcaDeSenhaEl.classList.remove("senhaFraca");
    indicadorDeForcaDeSenhaEl.classList.add("senhaRazoavel");
    indicadorDeForcaDeSenhaEl.classList.remove("senhaForte");
  } else {
    // senhaFraca
    indicadorDeForcaDeSenhaEl.classList.add("senhaFraca");
    indicadorDeForcaDeSenhaEl.classList.remove("senhaRazoavel");
    indicadorDeForcaDeSenhaEl.classList.remove("senhaForte");
  }

  if (percent >= 100) {
    indicadorDeForcaDeSenhaEl.classList.add("completed");
  } else {
    indicadorDeForcaDeSenhaEl.classList.remove("completed");
  }
}

// função de copiar partindo da imagem
function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

// Função que calcula o renger da senha e colocado em um evento de arrastar.
const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  funcaoGerarSenha(); // cada vez que eu arrasto a função, ele atualiza por eu ter colocado a chamada dessa função
});

funcaoGerarSenha();
