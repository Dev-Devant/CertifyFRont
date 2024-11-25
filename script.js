// Actualizar la función que carga los cursos
function cargarCertificado(datos) {
    // ... código existente para nombre, título y descripción ...

    // Actualizar la carga de habilidades
    const habilidadesList = document.getElementById('habilidades');
    habilidadesList.innerHTML = '';
    datos.habilidades.forEach((habilidad, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = habilidad;
            li.style.opacity = '0';
            habilidadesList.appendChild(li);
            fadeIn(li);
        }, index * 100 + 600);
    });

    // Actualizar la carga de cursos con el nuevo popup
    const cursosList = document.getElementById('cursos');
    cursosList.innerHTML = '';
    datos.cursos.forEach((curso, index) => {
        setTimeout(() => {
            const li = document.createElement('li');
            li.textContent = curso.nombre;
            li.style.opacity = '0';
            li.addEventListener('click', () => mostrarPopupCurso(curso));
            cursosList.appendChild(li);
            fadeIn(li);
        }, index * 100 + 1000);
    });
}

// Función para mostrar el popup del curso
function mostrarPopupCurso(curso) {
    // Crear el popup si no existe
    let popup = document.querySelector('.course-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'course-popup';
        document.body.appendChild(popup);
    }

    // Actualizar el contenido del popup
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close">&times;</button>
            <div class="popup-header">
                <h2 class="popup-title">${curso.nombre}</h2>
            </div>
            <div class="popup-overview">
                ${curso.descripcion}
            </div>
            <div class="popup-tags">
                ${curso.tags ? curso.tags.map(tag => `<span class="popup-tag">${tag}</span>`).join('') : ''}
            </div>
            <a href="#" class="popup-certificate">Ver certificado →</a>
        </div>
    `;

    // Mostrar el popup con animación
    popup.style.display = 'flex';
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.transition = 'opacity 0.3s ease';
    }, 10);

    // Agregar evento para cerrar el popup
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    });

    // Cerrar el popup al hacer clic fuera del contenido
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeBtn.click();
        }
    });
}

// Actualizar los datos de ejemplo para incluir tags
const certificadoEjemplo = {
    // ... datos existentes ...
    cursos: [
        {
            nombre: "Introducción al Desarrollo Web",
            descripcion: "Fundamentos de HTML, CSS y JavaScript.",
            tags: ["Frontend", "Básico", "Web"]
        },
        {
            nombre: "React Avanzado",
            descripcion: "Desarrollo de aplicaciones complejas con React y Redux.",
            tags: ["Frontend", "Avanzado", "React", "Redux"]
        },
        {
            nombre: "Backend con Node.js",
            descripcion: "Creación de APIs RESTful y manejo de bases de datos.",
            tags: ["Backend", "Intermedio", "Node.js", "API"]
        }
    ]
};