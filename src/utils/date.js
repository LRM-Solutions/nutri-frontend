function formatDateDDMMYYYY(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export { formatDateDDMMYYYY };
