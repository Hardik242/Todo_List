let form = document.forms.myForm;
let heading = form.elements.inputHeading;
let description = form.elements.inputDescription;
let notes = document.querySelector(".notes ol");
let notesClass = document.querySelector(".notes");
let count;

// Add note
form.onsubmit = (event) => {
  event.preventDefault();
  let warningNote = `<div class="warning"><p class="warning">* Please fill in Note field</p></div>`;
  let formValid = validateForm(heading.value, description.value);
  if (formValid == false) {
    if (document.querySelector(".warning") === null) {
      form.insertAdjacentHTML("afterbegin", warningNote);
    }
  }
  // Remove the warning message
  description.onclick = () => {
    let warning = document.querySelector(".warning");
    if (warning !== null) {
      warning.remove();
    }
  };
  form.reset();
};

// Validate form
const validateForm = (heading, description) => {
  if (description.trim() === "") {
    return false;
  }
  if (heading.trim() === "") {
    heading = `Task ${count < 10 ? `0${count}` : count}`;
  }
  addNote(heading, description);
  return true;
};

// Add note
const addNote = (heading, description) => {
  count++;
  localStorage.setItem("count", count);
  window.localStorage.setItem(`${heading}`, `${description}`);
};

// Get count
if (localStorage.getItem("count") == null) {
  count = 1;
} else {
  count = Number(localStorage.getItem("count"));
}

// Show all notes
let showItems = document.getElementById("showItems");
showItems.onclick = () => {
  if (notesClass.hasAttribute.classList != "note" && count >= 1) {
    notesClass.classList.add("note");
  }
  getFromStorage();
};

// Get from storage
const getFromStorage = () => {
  let notAvailable = `<div class="not-available">
  <span>NO Items available in the list</span>
</div>`;
  if (Object.keys(localStorage).length === 0) {
    notes.innerHTML = notAvailable;
  } else {
    if (notes.hasChildNodes(notAvailable)) {
      document.querySelector(".not-available").remove();
    }
    let keys = Object.keys(localStorage).filter((key) => key !== "count");
    keys = keys.sort();
    let counter = 0;
    let Items = [];
    keys.forEach((key) => {
      if (key === "count") {
        return;
      }
      let value = localStorage.getItem(key);
      Items[counter] = `<li>
    <div class="noteContainer">
    <h2>${key}</h2>
    <span>${value}</span>
    </div>
    <div class="deleteItemContainerdiv">
    <button type="button" id="deleteItem${counter}" class="deleteItemContainer">
    <img src="delete.png" alt="Remove" class="delete">
    </button>
    </div>
    </li>`;
      if (!notes.innerHTML.includes(key)) {
        notes.innerHTML += Items[counter];
      }
      counter++;
      // Delete item
      const deleteButtons = document.querySelectorAll(".deleteItemContainer");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          // Remove the parent li element
          const li = event.target.parentElement.parentElement.parentElement;
          li.remove();
          // Remove item from local storage
          localStorage.removeItem(
            event.target.parentElement.parentElement.parentElement
              .firstElementChild.firstElementChild.textContent
          );
          if (document.querySelector(".notes ol li") == null) {
            localStorage.clear();
            count = 1;
            notesClass.classList.remove("note");
          }
        });
      });
    });
  }
};

// Remove all notes
let removeNotes = document.getElementById("removeNotes");
removeNotes.onclick = () => {
  if (confirm("Are you sure you want to delete all notes?")) {
    localStorage.clear();
    notes.innerHTML = "";
    count = 1;
    if (document.querySelector(".notes").hasAttribute.classList === "note") {
      notesClass.classList.remove("note");
    }
  }
};
