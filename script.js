const materias = {
  "Área de Formación Básica": {
    "General": [
      ["Inglés I", 6, 6], ["Inglés II", 6, 6], ["Computación Básica", 6, 6],
      ["Habilidades del pensamiento crítico y creativo", 6, 4],
      ["Taller de lectura y redacción a través del mundo contemporáneo", 6, 4],
      ["Física", 4, 2], ["Estadística Descriptiva", 5, 3]
    ],
    "Iniciación a la Disciplina": [
      ["Biología Celular", 4, 2], ["Fisicoquímica", 4, 2],
      ["Química Inorgánica", 6, 6], ["Química Orgánica", 9, 6],
      ["Ciencias morfológicas y fisiológicas", 10, 6],
      ["Biología Molecular", 6, 4], ["Metodología de la Investigación", 8, 4],
      ["Epidemiología", 6, 3], ["Química Orgánica Básica", 9, 6],
      ["Instrumentación Básica", 6, 4], ["Química Analítica", 12, 8]
    ]
  },
  "Área de Formación Disciplinar": {
    "": [
      ["Bioquímica Básica", 10, 7], ["Bioquímica Clínica Enzimática", 10, 7],
      ["Bioquímica Clínica", 10, 7], ["Bioquímica Clínica Especializada", 10, 7],
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
    ]
  },
  "Área de Formación Terminal": {
    "": [["Servicio Social", 12, 0], ["Experiencia Recepcional", 12, 0]]
  },
  "Área de Formación Electiva": {
    "": [["Psicología Social", 4, 3], ["Virología", 4, 2]]
  }
};

const prerrequisitos = {
  "Ciencias morfológicas y fisiológicas": ["Biología Celular"],
  "Inmunología Básica": ["Ciencias morfológicas y fisiológicas"],
  "Inmunología Clínica": ["Inmunología Básica"],
  "Hematología Serie Roja": ["Inmunología Básica"],
  "Hematología Serie Blanca": ["Hematología Serie Roja"],
  "Microbiología General": ["Hematología Serie Roja"],
  "Genética": ["Biología Molecular"],
  "Parasitología General": ["Microbiología General"],
  "Parasitología Clínica": ["Parasitología General"],
  "Bacteriología Clínica": ["Hematología Serie Blanca"],
  "Laboratorio Clínico Veterinario": ["Parasitología Clínica"],
  "Bioquímica Clínica Enzimática": ["Bioquímica Metabólica"],
  "Bioquímica Clínica": ["Bioquímica Clínica Enzimática"],
  "Bioquímica Clínica Especializada": ["Bioquímica Clínica"],
  "Hemostasia": ["Inmunología Clínica"],
  "Inmunohematología": ["Inmunología Clínica"],
  "Instrumentación Avanzada": ["Instrumentación Básica"]
};

let totalCreditos = 0;
let materiasAprobadas = new Set();
const contenedor = document.getElementById("mallaContainer");

for (let area in materias) {
  const areaDiv = document.createElement("div");
  areaDiv.className = "area";
  const titulo = document.createElement("h2");
  titulo.textContent = area;
  areaDiv.appendChild(titulo);

  const subareas = materias[area];
  for (let sub in subareas) {
    if (sub) {
      const subtitulo = document.createElement("h3");
      subtitulo.className = "subarea";
      subtitulo.textContent = sub;
      areaDiv.appendChild(subtitulo);
    }

    subareas[sub].forEach(([nombre, creditos, horas]) => {
      const boton = document.createElement("div");
      boton.className = `materia ${colorClase(area)}`;
      boton.textContent = nombre;
      boton.id = nombre;
      boton.dataset.creditos = creditos;
      boton.dataset.horas = horas;
      if (!(nombre in prerrequisitos)) boton.classList.add("activa");

      boton.onclick = () => aprobarMateria(boton);
      areaDiv.appendChild(boton);
    });
  }

  contenedor.appendChild(areaDiv);
}

function aprobarMateria(elem) {
  const nombre = elem.id;
  if (materiasAprobadas.has(nombre)) return;

  materiasAprobadas.add(nombre);
  elem.classList.remove("activa");
  elem.classList.add("completada");

  const creditos = parseInt(elem.dataset.creditos);
  totalCreditos += creditos;
  document.getElementById("totalCreditos").textContent = totalCreditos;

  document.getElementById("infoBox").innerHTML = `
    <h3>${nombre}</h3>
    <p><strong>Créditos:</strong> ${creditos}</p>
    <p><strong>Horas:</strong> ${elem.dataset.horas}</p>
    <p>Total acumulado: <strong>${totalCreditos}</strong> créditos.</p>
  `;

  // Desbloquear materias que dependían de esta
  for (let mat in prerrequisitos) {
    if (materiasAprobadas.has(mat)) continue;
    const pendientes = prerrequisitos[mat].filter(p => !materiasAprobadas.has(p));
    if (pendientes.length === 0) {
      const m = document.getElementById(mat);
      if (m) m.classList.add("activa");
    }
  }
}

function colorClase(area) {
  if (area.includes("Electiva")) return "morado";
  if (area.includes("Terminal")) return "azul";
  if (area.includes("Disciplinar")) return "verde";
  return "amarillo";
}
