export function formatCPF(CPF: string) {
    return CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}