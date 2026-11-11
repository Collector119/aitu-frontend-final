class Program {
    constructor(name, field, duration, language) {
        this.name = name;
        this.field = field;
        this.duration = duration;
        this.language = language;
    }

    // A program matches if its name contains the search text and its field is the chosen one
    matches(searchText, field) {
        const nameMatches = this.name.toLowerCase().includes(searchText.toLowerCase());
        const fieldMatches = field === "all" || this.field === field;
        return nameMatches && fieldMatches;
    }
}

class FavoriteList extends SavedList {
    has(name) {
        return this.items.includes(name);
    }

    add(name) {
        this.items.push(name);
        this.save();
    }

    remove(name) {
        this.items.splice(this.items.indexOf(name), 1);
        this.save();
    }
}

const programs = [
    new Program("Software Engineering", "Computer science", "3 years", "English"),
    new Program("Computer Science", "Computer science", "3 years", "English"),
    new Program("Cybersecurity", "Information security", "3 years", "English"),
    new Program("Big Data Analysis", "Data science", "3 years", "English"),
    new Program("Media Technologies", "Digital media", "3 years", "English"),
    new Program("IT Management", "Management", "3 years", "English"),
    new Program("Digital Journalism", "Digital media", "3 years", "English"),
    new Program("Industrial Automation", "Engineering", "3 years", "English")
];

const favorites = new FavoriteList("favorites");

const tableBody = document.querySelector("#programs-body");
const searchInput = document.querySelector("#program-search");
const fieldSelect = document.querySelector("#field-filter");
const countText = document.querySelector("#programs-count");
const noResults = document.querySelector("#no-results");
const favoritesList = document.querySelector("#favorites-list");
const favoritesEmpty = document.querySelector("#favorites-empty");

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

function createFavoriteButton(program) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-sm favorite-btn";
    if (favorites.has(program.name)) {
        button.textContent = "Saved";
        button.classList.add("saved");
    } else {
        button.textContent = "Save";
    }
    button.addEventListener("click", function () {
        if (favorites.has(program.name)) {
            removeFavorite(program.name);
        } else {
            addFavorite(program.name);
        }
    });
    return button;
}

function createProgramRow(program) {
    const row = document.createElement("tr");
    row.appendChild(createCell(program.name));
    row.appendChild(createCell(program.field));
    row.appendChild(createCell(program.duration));
    row.appendChild(createCell(program.language));
    const buttonCell = document.createElement("td");
    buttonCell.appendChild(createFavoriteButton(program));
    row.appendChild(buttonCell);
    return row;
}

// The table is cleared first, so the same function can show any list of programs
function renderPrograms(list) {
    tableBody.innerHTML = "";
    list.forEach(function (program) {
        tableBody.appendChild(createProgramRow(program));
    });
}

function filterPrograms(searchText, field) {
    const result = [];
    for (const program of programs) {
        if (program.matches(searchText, field)) {
            result.push(program);
        }
    }
    return result;
}

function showFilteredPrograms() {
    const foundPrograms = filterPrograms(searchInput.value.trim(), fieldSelect.value);
    renderPrograms(foundPrograms);
    countText.textContent = "Showing " + foundPrograms.length + " of " + programs.length + " programs";
    if (foundPrograms.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

function showFavoriteItem(name) {
    const item = document.createElement("li");
    item.setAttribute("data-name", name);
    item.textContent = name + " ";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn btn-sm btn-outline-danger";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        removeFavorite(name);
    });

    item.appendChild(removeButton);
    favoritesList.appendChild(item);
}

function addFavorite(name) {
    favorites.add(name);
    showFavoriteItem(name);
    updateFavoritesView();
}

function removeFavorite(name) {
    favorites.remove(name);
    const item = favoritesList.querySelector('[data-name="' + name + '"]');
    item.remove();
    updateFavoritesView();
}

// The table is drawn again so that the Save / Saved buttons match the favorites array
function updateFavoritesView() {
    if (favorites.isEmpty()) {
        favoritesEmpty.style.display = "block";
    } else {
        favoritesEmpty.style.display = "none";
    }
    showFilteredPrograms();
}

searchInput.addEventListener("input", showFilteredPrograms);
fieldSelect.addEventListener("change", showFilteredPrograms);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        searchInput.value = "";
        showFilteredPrograms();
    }
});

favorites.items.forEach(function (name) {
    showFavoriteItem(name);
});
updateFavoritesView();
