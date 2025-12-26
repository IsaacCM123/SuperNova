const form = document.getElementById("formulario");
const lista = document.getElementById("lista");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const registro = {
    hhhnombre: document.getElementById('nombreID').value,
    hhhedad: document.getElementById('edadID').value,
    hhhcomentario: document.getElementById('comentID').value
  };

  await fetch("/sacky", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registro)
  });

  form.reset();
  cargarRegistros();
});

async function cargarRegistros() {
  const res = await fetch("/sacky");
  const registros = await res.json();

  lista.innerHTML = "";

  registros.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML =  `<strong>${r.hhhnombre}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            ${r.hhhedad}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            ${r.hhhcomentario}</strong>`;
    lista.appendChild(li);
  });
}
cargarRegistros();