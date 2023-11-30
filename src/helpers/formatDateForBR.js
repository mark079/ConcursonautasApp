export const formatDateForBR = (date) => {
    const newDate = new Date(`${date}T00:00:00Z`);
    var dia = newDate.getUTCDate();
    var mes = newDate.getUTCMonth() + 1; // Lembre-se que os meses em JavaScript começam do zero
    var ano = newDate.getUTCFullYear();

    // Formatar a data no formato desejado: "dd/mm/yyyy"
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano;
    return dataFormatada;
};