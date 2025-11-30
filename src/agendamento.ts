const dateInput = document.getElementById("date") as HTMLInputElement;
const timeSection = document.getElementById("timeSection") as HTMLDivElement;
const timeButtons = document.querySelectorAll(".time-btn");
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;

const step1 = document.getElementById("step1") as HTMLDivElement;
const step2 = document.getElementById("step2") as HTMLDivElement;
const step3 = document.getElementById("step3") as HTMLDivElement;

const confirmationDetails = document.getElementById("confirmationDetails") as HTMLDivElement;
const confirmBtn = document.getElementById("confirmBtn") as HTMLButtonElement;
const backBtn = document.getElementById("backBtn") as HTMLButtonElement;
const newBtn = document.getElementById("newBtn") as HTMLButtonElement;

let selectedDate: string | null = null;
let selectedTime: string | null = null;

// Quando o usuário escolher uma data, mostra os horários
dateInput.addEventListener("change", () => {
  selectedDate = dateInput.value;
  if (selectedDate) {
    timeSection.style.display = "block";
  }
});

// Seleção de horário
timeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    timeButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedTime = btn.textContent;
    nextBtn.disabled = false;
  });
});

// Ir para tela de confirmação
nextBtn.addEventListener("click", () => {
  if (selectedDate && selectedTime) {
    confirmationDetails.innerHTML = `
      <p><strong>Data:</strong> ${new Date(selectedDate).toLocaleDateString("pt-BR")}</p>
      <p><strong>Horário:</strong> ${selectedTime}</p>
    `;
    step1.style.display = "none";
    step2.style.display = "block";
  }
});

// Confirmar agendamento
confirmBtn.addEventListener("click", () => {
  step2.style.display = "none";
  step3.style.display = "block";
});

// Voltar à etapa anterior
backBtn.addEventListener("click", () => {
  step2.style.display = "none";
  step1.style.display = "block";
});

// Novo agendamento
newBtn.addEventListener("click", () => {
  selectedDate = null;
  selectedTime = null;
  dateInput.value = "";
  timeSection.style.display = "none";
  timeButtons.forEach((b) => b.classList.remove("selected"));
  nextBtn.disabled = true;
  step3.style.display = "none";
  step1.style.display = "block";
});
