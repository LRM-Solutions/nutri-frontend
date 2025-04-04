function formatCpf(cpf) {
  if (!cpf) return "";

  cpf = cpf.replace(/\D/g, "");

  // Aplica a formatação
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function cpfMask(cpf) {
  // Remove tudo que não é dígito
  const numeros = cpf.replace(/\D/g, "");

  // Aplica a formatação
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export { formatCpf, cpfMask };
