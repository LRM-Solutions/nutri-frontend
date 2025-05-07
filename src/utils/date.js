function formatDateDDMMYYYY(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function extrairHora(dataISO) {
  // Cria um objeto Date a partir da string ISO
  const data = new Date(dataISO);

  // Extrai horas e minutos UTC (para manter igual à string original)
  const horas = data.getUTCHours().toString().padStart(2, "0");
  const minutos = data.getUTCMinutes().toString().padStart(2, "0");

  // Retorna no formato HH:MM
  return `${horas}:${minutos}`;
}

export { formatDateDDMMYYYY, extrairHora };
