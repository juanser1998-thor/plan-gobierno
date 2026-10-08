const axes = {
  water: {
    number: "01",
    title: "Agua, cuenca y biodiversidad",
    summary: "Proteger el agua desde su nacimiento hasta el río, restaurando ecosistemas y fortaleciendo los acueductos veredales.",
    programs: [
      ["Ríos vivos", "Acotar y deslindar rondas con precisión; restaurar las zonas ocupadas.", "100 % de rondas acotadas en 2029 y al menos 20 % restaurado"],
      ["Nacientes protegidas", "Comprar y conservar predios estratégicos e implementar pagos por servicios ambientales.", "Duplicar la superficie en conservación en microcuencas abastecedoras"],
      ["Agua segura y resiliente", "Preparar el territorio para sequías y fortalecer los acueductos veredales.", "100 % de acueductos veredales con plan de mejora"],
      ["Corredores de vida", "Conectar áreas protegidas, restaurar con especies nativas y monitorear el cambio.", "Al menos 300 hectáreas restauradas"]
    ]
  },
  territory: {
    number: "02",
    title: "Territorio ordenado, catastro y riesgo",
    summary: "Actualizar las reglas del suelo y usar cartografía, catastro y monitoreo para anticipar el riesgo, no para reaccionar tarde.",
    programs: [
      ["PBOT 2028", "Construir expedientes técnicos, cartografía de detalle y concertación ambiental y metropolitana.", "Dos PBOT adoptados antes de 2030"],
      ["Catastro multipropósito ambiental", "Cruzar información predial y ambiental para formalizar y decidir con evidencia.", "100 % de predios en protección y rondas con ficha en 2030"],
      ["Observatorio geodésico de amenazas", "Aplicar SAR, GNSS y modelos del terreno para alertas y prevención.", "100 % de zonas de amenaza alta con estudio"],
      ["Movilidad segura del corredor norte", "Planificar seguridad vial, transporte público y bordes de la vía y la línea férrea.", "Reducir 30 % la mortalidad vial frente a 2027"]
    ]
  },
  economy: {
    number: "03",
    title: "Economía sostenible y empleo verde",
    summary: "Hacer más competitivos al campo, la industria y el turismo mientras se reduce su impacto sobre el territorio.",
    programs: [
      ["Agro resiliente", "Modernizar trapiches y acompañar a productores de panela y piña con prácticas agroecológicas.", "500 productores con buenas prácticas"],
      ["Pecuaria sostenible", "Inventariar granjas y vertimientos e impulsar biodigestores y manejo de excretas.", "100 % inventariadas y 50 % con plan de manejo"],
      ["Industria limpia y economía circular", "Mejorar la ecoeficiencia empresarial y recuperar zonas de cantera.", "100 empresas con plan y plan de canteras adoptado"],
      ["Turismo de naturaleza y cultura", "Crear la ruta agua, ferrocarril y trapiche y formalizar a sus prestadores.", "30 prestadores certificados"]
    ]
  },
  people: {
    number: "04",
    title: "Gente, cultura y cohesión social",
    summary: "Convertir la sostenibilidad en bienestar cotidiano: educación, empleo juvenil, vivienda digna, cultura y convivencia.",
    programs: [
      ["Escuela del agua", "Conectar instituciones rurales, reservas y vigías ambientales comunitarios.", "100 % de instituciones rurales con proyecto activo"],
      ["Jóvenes del norte", "Crear rutas de empleo verde y fortalecer la permanencia escolar rural.", "500 jóvenes y dos puntos menos de deserción"],
      ["Hábitat rural seguro", "Mejorar vivienda y saneamiento y actuar en zonas de riesgo no mitigable.", "1.000 hogares con saneamiento adecuado"],
      ["Patrimonio y convivencia", "Recuperar estaciones y corredor férreo y prevenir violencias.", "Dos bienes intervenidos y 15 % menos agresiones"]
    ]
  },
  government: {
    number: "05",
    title: "Gobierno abierto, finanzas y gobernanza",
    summary: "Coordinar a los municipios, cuidar los recursos públicos y permitir que la comunidad vea y decida sobre la inversión.",
    programs: [
      ["Pacto Aburrá Norte", "Unir a Barbosa, Girardota, AMVA, Corantioquia, comunidades y gremios.", "Convenio en 2028 y cuatro proyectos cofinanciados"],
      ["Finanzas del territorio", "Actualizar el catastro y construir un portafolio de financiación ambiental.", "15 % más recaudo predial real y al menos tres fuentes"],
      ["Territorio en datos", "Crear una infraestructura de datos espaciales y un tablero público.", "Infraestructura de datos operativa en 2029"],
      ["Participación y control social", "Decidir inversión por microcuenca y fortalecer veedurías y rendición de cuentas.", "20 % de inversión ambiental con participación"]
    ]
  }
};

const panel = document.querySelector("#axis-panel");
const tabs = [...document.querySelectorAll("[data-axis]")];

function renderAxis(key) {
  const axis = axes[key];
  panel.innerHTML = `
    <div class="axis-intro">
      <div class="axis-index">${axis.number}</div>
      <div><h3>${axis.title}</h3><p>${axis.summary}</p></div>
    </div>
    <div class="program-grid">
      ${axis.programs.map((program, index) => `
        <article class="program-card">
          <header><b>${index + 1}</b><h4>${program[0]}</h4></header>
          <p>${program[1]}</p>
          <small>Meta 2031 · ${program[2]}</small>
        </article>`).join("")}
    </div>`;
  tabs.forEach(tab => tab.setAttribute("aria-selected", tab.dataset.axis === key));
}

tabs.forEach(tab => tab.addEventListener("click", () => renderAxis(tab.dataset.axis)));
renderAxis("water");

const tree = document.querySelector("#problem-tree");
const treeButton = document.querySelector("#toggle-tree");
const problemContent = {
  crown: ["Riesgo de desabastecimiento", "Pérdida de biodiversidad", "Conflictos de uso del suelo", "Menos oportunidades"],
  label: "Problema central",
  trunk: "Gestión territorial fragmentada",
  roots: ["PBOT críticos", "Información insuficiente", "Presión sobre rondas", "Gobernanza débil"]
};
const solutionContent = {
  crown: ["Agua segura", "Biodiversidad recuperada", "Suelo ordenado", "Economía local competitiva"],
  label: "Objetivo central",
  trunk: "Cuenca protegida y gobernanza compartida",
  roots: ["Instrumentos al día", "Datos verificables", "Producción responsable", "Participación ciudadana"]
};

treeButton.addEventListener("click", () => {
  const showSolution = tree.dataset.mode === "problem";
  const content = showSolution ? solutionContent : problemContent;
  tree.dataset.mode = showSolution ? "solution" : "problem";
  tree.querySelector(".tree-crown").innerHTML = content.crown.map(item => `<span>${item}</span>`).join("");
  tree.querySelector(".tree-trunk").innerHTML = `<small>${content.label}</small><strong>${content.trunk}</strong>`;
  tree.querySelector(".tree-roots").innerHTML = content.roots.map(item => `<span>${item}</span>`).join("");
  treeButton.innerHTML = showSolution ? "Volver a ver el problema <span aria-hidden=\"true\">↙</span>" : "Cambiar del problema a la solución <span aria-hidden=\"true\">↗</span>";
  treeButton.setAttribute("aria-expanded", showSolution);
});

const choiceMessages = {
  water: "Empieza con Ríos vivos, Nacientes protegidas, Agua segura y Corredores de vida: cuatro acciones conectadas desde la fuente hasta el río.",
  territory: "Empieza con dos PBOT actualizados, catastro multipropósito y monitoreo geodésico para decidir antes de que el riesgo se convierta en emergencia.",
  economy: "Empieza acompañando a productores, granjas, industrias y prestadores turísticos para que producir mejor también signifique cuidar el territorio.",
  people: "Empieza con educación ambiental, empleo verde, saneamiento rural, patrimonio y prevención de violencias: sostenibilidad que se siente en la vida diaria.",
  government: "Empieza con el Pacto Aburrá Norte, datos abiertos, finanzas responsables y participación por microcuenca: compromisos que la ciudadanía puede vigilar."
};

document.querySelectorAll("[data-choice]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-choice]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const key = button.dataset.choice;
    document.querySelector("#choice-result").innerHTML = `<span>Tu prioridad conecta con el eje ${axes[key].number}</span><p>${choiceMessages[key]}</p>`;
    renderAxis(key);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .14 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const counters = document.querySelectorAll("[data-count]");
let counted = false;
const countObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current;
      if (current >= target) clearInterval(timer);
    }, Math.max(35, 500 / target));
  });
});
countObserver.observe(document.querySelector(".hero-stats"));

window.addEventListener("scroll", () => document.querySelector(".topbar").classList.toggle("scrolled", window.scrollY > 30));
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
