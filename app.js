// Select the glossary list and search bar
const glossary = document.getElementById("terms-list");
const searchInput = document.getElementById("search");

// Load Terms from JSON File
fetch("terms.json")
  .then(response => response.json())
  .then(data => {
    displayTerms(data); // Display all terms initially

    // Filter terms based on search input
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredTerms = data.filter(term => 
        term.term.toLowerCase().includes(searchTerm)
      );
      displayTerms(filteredTerms); // Re-display terms based on search
    });
  })
  .catch(error => console.error("Error loading terms:", error));

// Function to Display Terms in the Glossary
function displayTerms(terms) {
  glossary.innerHTML = ""; // Clear previous terms
  terms.forEach(term => {
    const listItem = document.createElement("li");

    // Title that can be clicked to show/hide the definition
    const title = document.createElement("h3");
    title.innerText = term.term;
    title.classList.add("term-title");

    // Hidden definition element
    const definition = document.createElement("p");
    definition.innerText = term.definition;
    definition.classList.add("term-definition");

    // Add click event to toggle definition visibility
    title.addEventListener("click", () => {
      definition.style.display = definition.style.display === "none" ? "block" : "none";
    });

    // Append title and definition to the list item
    listItem.appendChild(title);
    listItem.appendChild(definition);
    glossary.appendChild(listItem);
  });
}
