export default function notasMemory({ nota }) {
    const notas = JSON.parse(localStorage.getItem('notas')) || [];

    if (nota) {
        if (nota.titulo.trim() === '' || nota.contenido.trim() === '') {
            throw new Error('El título y el contenido no pueden estar vacíos.');
        }
        notas.push(nota);
        localStorage.setItem('notas', JSON.stringify(notas));
    }

    return notas;

}