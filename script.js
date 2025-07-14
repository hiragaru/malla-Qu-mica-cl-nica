let totalCreditos = 0;
let materiasSeleccionadas = new Set();

function mostrarInfo(nombre, creditos, horas) {
  const infoBox = document.getElementById("infoBox");

  if (!materiasSeleccionadas.has(nombre)) {
    materiasSeleccionadas.add(nombre);
    totalCreditos += creditos;
    document.getElementById("totalCreditos").textContent = totalCreditos;
  }

  infoBox.innerHTML = `
    <h3>${nombre}</h3>
    <p><strong>Créditos:</strong> ${creditos}</p>
    <p><strong>Horas:</strong> ${horas}</p>
    <p>Ya has acumulado <strong>${totalCreditos}</strong> créditos.</p>
  `;
}
