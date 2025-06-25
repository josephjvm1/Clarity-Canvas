// Load saved cards from localStorage on startup
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("clarityCanvas")) || {};
  for (let section in saved) {
    saved[section].forEach(text => {
      addCard(section, text);
    });
  }
};

// Save all current cards to localStorage
function saveToLocalStorage() {
  const allContainers = document.querySelectorAll(".card-container");
  const data = {};
  allContainers.forEach(container => {
    const id = container.id;
    const cards = container.querySelectorAll(".card span");
    data[id] = Array.from(cards).map(card => card.textContent);
  });
  localStorage.setItem("clarityCanvas", JSON.stringify(data));
}

// Create a new card (either by user or when loading)
function addCard(containerId, presetText = "") {
  const container = document.getElementById(containerId);
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;

  // Create content span (editable)
  const span = document.createElement("span");
  span.contentEditable = true;
  span.textContent = presetText || "Type here...";
  span.addEventListener("input", saveToLocalStorage);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    card.remove();
    saveToLocalStorage();
  };

  card.appendChild(span);
  card.appendChild(deleteBtn);
  addCardEvents(card);
  container.appendChild(card);
  saveToLocalStorage();
}

// Drag-and-drop events
function addCardEvents(card) {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.innerHTML);
    e.dataTransfer.setData("sourceId", card.parentNode.id);
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });
}

document.querySelectorAll(".card-container").forEach(container => {
  container.addEventListener("dragover", (e) => e.preventDefault());

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    const html = e.dataTransfer.getData("text/plain");
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.innerHTML = html;

    // Reattach events
    const deleteBtn = card.querySelector(".delete-btn");
    if (deleteBtn) deleteBtn.onclick = () => {
      card.remove();
      saveToLocalStorage();
    };
    const span = card.querySelector("span");
    if (span) span.contentEditable = true;
    if (span) span.addEventListener("input", saveToLocalStorage);

    addCardEvents(card);
    container.appendChild(card);
    saveToLocalStorage();
  });
});

