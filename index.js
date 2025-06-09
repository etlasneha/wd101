//localStorage.clear();
// Access form and table body
const form = document.getElementById("user-form");
const entriesTableBody = document.getElementById("user-entries");

// Load existing entries from localStorage
function getUserEntries() {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
}

// Save entry to localStorage
function saveUserEntries(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

// Render entries to table
function displayEntries() {
  const entries = getUserEntries();
  entriesTableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border px-4 py-2">${entry.name}</td>
      <td class="border px-4 py-2">${entry.email}</td>
      <td class="border px-4 py-2">${entry.password}</td>
      <td class="border px-4 py-2">${entry.dob}</td>
      <td class="border px-4 py-2">${entry.acceptedTerms}</td>
    `;

    entriesTableBody.appendChild(row);
  });
}

// Age validation
document.getElementById("dob").addEventListener("change", function () {
  const dob = new Date(this.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    this.setCustomValidity("Age must be between 18 and 55.");
  } else {
    this.setCustomValidity("");
  }
});

// Handle form submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  const newEntry = {
    name,
    email,
    password,
    dob,
    acceptedTerms
  };

  const entries = getUserEntries();
  entries.push(newEntry);
  saveUserEntries(entries);
  displayEntries();

  form.reset();
});

// Display entries on initial load
window.addEventListener("DOMContentLoaded", displayEntries);
