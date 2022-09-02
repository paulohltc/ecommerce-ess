export function formatCPF(CPF: string): string {
    return CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatPrice(price: number): string {
    let priceStr: string = price.toString();
    return priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}