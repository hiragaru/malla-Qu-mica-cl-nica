const materias = {
  "Área de Formación Básica": [
    ["Inglés I", 6, 6], ["Inglés II", 6, 6], ["Computación Básica", 6, 6],
    ["Habilidades del pensamiento crítico y creativo", 6, 4],
    ["Taller de lectura y redacción a través del mundo contemporáneo", 6, 4],
    ["Física", 4, 2], ["Estadística Descriptiva", 5, 3],
    ["Biología Celular", 4, 2], ["Fisicoquímica", 4, 2],
    ["Química Inorgánica", 6, 6], ["Química Orgánica", 9, 6],
    ["Ciencias morfológicas y fisiológicas", 10, 6],
    ["Biología Molecular", 6, 4], ["Metodología de la Investigación", 8, 4],
    ["Epidemiología", 6, 3], ["Química Orgánica Básica", 9, 6],
    ["Instrumentación Básica", 6, 4], ["Química Analítica", 12, 8]
  ],
  "Área de Formación Disciplinar": [
    ["Bioquímica Básica", 10, 7], ["Bioquímica Clínica", 10, 7],
    ["Bioquímica Clínica Enzimática", 10, 7],
    ["Bioquímica Clínica Especializada", 10, 7],
    ["Bioquímica Metabólica", 10, 7], ["Estadística Inferencial", 8, 6],
    ["Genética", 6, 4], ["Parasitología General", 8, 5],
    ["Parasitología Clínica", 10, 7], ["Hematología Serie Roja", 8, 6],
    ["Hematología Serie Blanca", 8, 6], ["Microbiología General", 10, 7],
    ["Inmunología Básica", 10, 7], ["Inmunología Clínica", 8, 5],
    ["Inmunohematología", 10, 7], ["Hemostasia", 6, 4],
    ["Salud Pública", 8, 4], ["Análisis de Alimentos", 9, 6],
    ["Instrumentación Avanzada", 8, 6], ["Toxicología", 8, 5],
    ["Administración de los Laboratorios", 6, 3],
    ["Procesos Educativos en Salud", 4, 2],
    ["Laboratorio Clínico Veterinario", 10, 7],
    ["Gestión de Calidad", 10, 6], ["Bacteriología Clínica", 12, 8]
  ],
  "Área de Formación Terminal": [
    ["Servicio Social", 12, 0], ["Experiencia Recepcional", 12, 0]
  ],
  "Área de Formación Electiva": [
    ["Recursos Didácticos", 2, 2], ["Proyectos de Vinculación", 4, 4],
    ["Proyectos de Investigación", 4, 4], ["Desarrollo Organizacional", 2, 2],
    ["Preparación de Soluciones", 2, 2],
    ["Higiene y Seguridad en el Laboratorio", 2, 2],
    ["Tópicos Selectos", 4, 2], ["Química Legal", 6, 4],
    ["Técnicas Citológicas", 6, 4], ["Micología Clínica", 6, 4],
    ["Bioética", 4, 2], ["Dirección Estratégica", 4, 2],
    ["Toxicología Aplicada", 6, 4], ["Psicología Social", 4, 3],
    ["Evaluación Ambiental", 6, 4], ["Virología", 4, 2],
    ["Patología Clínica", 6, 3], ["Biomatemáticas Aplicadas", 6, 3],
    ["Microbiología Sanitaria", 4, 2],
    ["Certificación de Laboratorios", 2, 2],
    ["Patología y diagnóstico hematológico en animales", 2, 2]
  ]
};

const colores = {
  "Área de Formación Básica": "amarillo",
  "Área de Formación Disciplinar": "verde",
  "Área de Formación Terminal": "azul",
  "Área de Formación Electiva": "morado"
};

let totalCreditos = 0;
let materiasSeleccionadas = new Set();

const contenedor = document.getElementById("contenedorAreas");

for (let area in materias) {
  const seccion = document.createElement("div");
  seccion.className = "area";
  const titulo = document.createElement("h2");
  titulo.textContent = area;
  seccion.appendChild(titulo);

  materias[area].forEach(([nombre, creditos, horas]) => {
    const boton = document.createElement("div");
    boton.className = `materia ${colores[area]}`;
    boton.textContent = nombre;
    boton.onclick = () => mostrarInfo(nombre, creditos, horas);
    seccion.appendChild(boton);
  });

  contenedor.appendChild(seccion);
}

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
    <p>Total acumulado: <strong>${totalCreditos}</strong> créditos.</p>
  `;
}
