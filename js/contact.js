class QuestionList extends SavedList {
    add(program, message) {
        const question = {
            program: program,
            message: message,
            date: new Date().toLocaleDateString("en-GB")
        };
        this.items.push(question);
        this.save();
    }

    remove(index) {
        this.items.splice(index, 1);
        this.save();
    }
}

const questions = new QuestionList("questions");

const contactForm = document.querySelector("#contact-form");
const successMessage = document.querySelector("#form-success");
const questionsList = document.querySelector("#questions-list");
const questionsEmpty = document.querySelector("#questions-empty");

function createQuestionItem(question, index) {
    const item = document.createElement("li");

    const title = document.createElement("strong");
    title.textContent = question.program + ", " + question.date;

    const text = document.createElement("p");
    text.textContent = question.message;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-sm btn-outline-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        questions.remove(index);
        showQuestions();
    });

    item.appendChild(title);
    item.appendChild(text);
    item.appendChild(deleteButton);
    return item;
}

// The whole list is drawn again, so every Delete button gets the right index
function showQuestions() {
    questionsList.innerHTML = "";
    questions.items.forEach(function (question, index) {
        questionsList.appendChild(createQuestionItem(question, index));
    });
    if (questions.isEmpty()) {
        questionsEmpty.style.display = "block";
    } else {
        questionsEmpty.style.display = "none";
    }
}

function showError(fieldId, message) {
    document.querySelector("#" + fieldId).classList.add("is-invalid");
    document.querySelector("#" + fieldId + "-error").textContent = message;
}

function clearError(fieldId) {
    document.querySelector("#" + fieldId).classList.remove("is-invalid");
    document.querySelector("#" + fieldId + "-error").textContent = "";
}

// The pattern means: some text, then @, then a domain with a dot inside, and no spaces anywhere
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Every field is checked, so the user sees all errors at once, not only the first one
function validateForm() {
    let isValid = true;

    const name = document.querySelector("#name").value.trim();
    if (name === "") {
        showError("name", "Please enter your full name.");
        isValid = false;
    } else if (name.length < 3) {
        showError("name", "The name must have at least 3 characters.");
        isValid = false;
    } else {
        clearError("name");
    }

    const email = document.querySelector("#email").value.trim();
    if (email === "") {
        showError("email", "Please enter your email.");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError("email", "The email must look like name@example.com.");
        isValid = false;
    } else {
        clearError("email");
    }

    if (document.querySelector("#program").value === "") {
        showError("program", "Please choose a program.");
        isValid = false;
    } else {
        clearError("program");
    }

    const message = document.querySelector("#message").value.trim();
    if (message.length < 20) {
        showError("message", "The message must have at least 20 characters, now it has " + message.length + ".");
        isValid = false;
    } else {
        clearError("message");
    }

    if (!document.querySelector("#agree").checked) {
        showError("agree", "Please confirm that we can answer you by email.");
        isValid = false;
    } else {
        clearError("agree");
    }

    return isValid;
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    successMessage.style.display = "none";

    if (validateForm()) {
        const name = document.querySelector("#name").value.trim();
        const program = document.querySelector("#program").value;
        const message = document.querySelector("#message").value.trim();
        questions.add(program, message);
        showQuestions();
        successMessage.textContent = "Thank you, " + name + "! Your question about " + program + " has been sent.";
        successMessage.style.display = "block";
        contactForm.reset();
    }
});

const fieldIds = ["name", "email", "program", "message", "agree"];
fieldIds.forEach(function (fieldId) {
    document.querySelector("#" + fieldId).addEventListener("input", function () {
        clearError(fieldId);
    });
});

showQuestions();
