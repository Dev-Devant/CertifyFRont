///////////////////////////////////
// Simulated backend data
let certificateData = {
    name: "NNNNNNNNN",
    profile: "Descripción detallada del perfil del estudiante...",
    skills: ["HTML", "CSS", "JavaScript", "Python"],
    extraOptions: ["Opción 1", "Opción 2", "Opción 3"],
    certificateLink: "https://example.com/certificate/12345"
};const server = "http://127.0.0.1:5000";

async function sendEmail() {
    const email = document.getElementById('emailInput').value;
    if (email == null || email == "") {
        alert("Correo vacío, por favor ingresa un correo");
        return;
    }
    if (!email.includes('@')) {
        alert("Formato de correo no válido");
        return;
    }

    try {
        const response = await fetch(server + '/api/GetCertify', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }), 
        });

        if (response.ok) {
            const data = await response.json();
            
            // Actualizar datos del certificado
            updateCertificateData(data);
        } else {
            alert('Error: ' + "Correo no existe");
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

function updateCertificateData(data) {
    // Actualizar nombre del certificado y perfil
    document.getElementById('certificateName').textContent = `Certificado de ${data.name}`;
    document.getElementById('studentProfile').textContent = data.resume;

    // Actualizar las habilidades
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = ""; // Limpiar las habilidades previas
    data.skills.forEach(skill => {
        const skillBubble = document.createElement("div");
        skillBubble.className = "skill-bubble";
        skillBubble.textContent = skill;

        const commentBox = document.createElement("div");
        commentBox.className = "commentBox";
        commentBox.style.display = "none";
        skillBubble.appendChild(commentBox);

        skillBubble.addEventListener("mouseover", function() {
            commentBox.textContent = `Información sobre ${skill}`;
            commentBox.style.display = "block";
        });

        skillBubble.addEventListener("mouseout", function() {
            commentBox.style.display = "none";
        });

        skillsContainer.appendChild(skillBubble);
    });

    // Actualizar opciones adicionales (extraOptions)
    const extraOptionsContainer = document.getElementById("extraOptions");
    extraOptionsContainer.innerHTML = ""; // Limpiar opciones previas
    data.extraOptions.forEach(option => {
        const optionElement = document.createElement("p");
        optionElement.textContent = option;
        extraOptionsContainer.appendChild(optionElement);
    });

    // Actualizar el enlace del certificado
    certificateData.certificateLink = data.certificateLink;
}

// Escuchadores de eventos
document.getElementById('submitEmail').addEventListener('click', sendEmail);
document.getElementById('emailInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendEmail();
    }
});

window.onload = function() {
    const qrCodeContainer = document.getElementById("qrCode");
    new QRCode(qrCodeContainer, {
        text: "aun no disponible :/ ",
        width: 128,
        height: 128,
        colorDark : "#ffffff",
        colorLight : "#191919",
        correctLevel : QRCode.CorrectLevel.L
    });
};

document.getElementById('getCertificateLink').addEventListener('click', function() {
    const certificateLink = certificateData.certificateLink;
    alert("funcion en desarrollo :/");
});
