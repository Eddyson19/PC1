let estudiantes = [];
const formulario = document.getElementById('formularioEstudiantes');
const promedioGeneralSpan = document.getElementById('promedioGeneral');
const listaMayores = document.getElementById('mayores');
const listaMenores = document.getElementById('menores');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const notas = [
        parseFloat(document.getElementById('nota1').value),
        parseFloat(document.getElementById('nota2').value),
        parseFloat(document.getElementById('nota3').value),
        parseFloat(document.getElementById('nota4').value)
    ];

    let estudiante = {
        nombre: nombre,
        calificaciones: notas,
        promedio: calcularPromedioEstudiante(notas)
    };

    estudiantes.push(estudiante);

    formulario.reset();

    actualizarVista();
});
function calcularPromedioEstudiante(calificaciones) {
    let suma = calificaciones.reduce((acumulador, calificacion) => acumulador + calificacion, 0);
    return suma / calificaciones.length;
}
function calcularPromedioGeneral() {
    let sumaTotal = estudiantes.reduce((acumulador, estudiante) => acumulador + estudiante.promedio, 0);
    return sumaTotal / estudiantes.length;
}
function actualizarVista() {
    let promedioGeneral = calcularPromedioGeneral();
    promedioGeneralSpan.innerText = promedioGeneral.toFixed(2);
    let mayores = estudiantes.filter(est => est.promedio > promedioGeneral);
    let menores = estudiantes.filter(est => est.promedio <= promedioGeneral);
    mostrarEstudiantes(mayores, listaMayores);
    mostrarEstudiantes(menores, listaMenores);
}
function mostrarEstudiantes(estudiantes, lista) {
    lista.innerHTML = ''; 
    estudiantes.forEach(estudiante => {
        let item = document.createElement('li');
        item.innerText = `${estudiante.nombre}: Promedio = ${estudiante.promedio.toFixed(2)} (Notas: ${estudiante.calificaciones.join(', ')})`;
        lista.appendChild(item);
    });
}
