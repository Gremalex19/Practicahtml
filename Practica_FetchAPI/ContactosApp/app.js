function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = ""; 

            data.data.forEach((contacto) => {
                const tr = document.createElement("tr");
                
                // Aquí agregamos el botón en la última columna (Acciones)
                tr.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    </td>
                `;
                
                tr.querySelector(".delete-btn").addEventListener("click", () => {
                 // RETO EXTRA: Confirmación antes de borrar
                   const seguro = confirm(`¿Estás seguro de que deseas eliminar a ${contacto.nombre}?`);
                 if (seguro) {
                  eliminarContacto(contacto.id);
                  }
                }); 
                
                tbody.appendChild(tr);
            });
        }); 
}

// Obtenemos el formulario de nuestro HTML
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById("nombre").value.trim();
    const telefonoInput = document.getElementById("telefono").value.trim();

    // RETO EXTRA: Validación de campos vacíos
    if (nombreInput === "" || telefonoInput === "") {
        alert("Por favor, llena todos los campos antes de enviar.");
        return; // Esto detiene la función para que no haga el fetch
    }

    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreInput, telefono: telefonoInput }) 
    })
    .then((response) => response.json())
    .then((data) => {
        // RETO EXTRA: Mensaje de éxito
        alert("¡Contacto agregado exitosamente!");
        
        mostrarContactos(); 
        form.reset(); 
    });
});

function eliminarContacto(id) {
    // 1. Usamos fetch pero apuntando a la URL con el ID específico y el método DELETE
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // 2. Mostramos una alerta con el mensaje que nos responde el servidor
        alert(data.message);
        
        // 3. Volvemos a pedir los contactos para que la tabla se actualice sin el que borramos
        mostrarContactos();
    });
}

document.getElementById("btnRefrescar").addEventListener("click", () => {
    mostrarContactos();
});