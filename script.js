document.addEventListener("DOMContentLoaded", loadEntries);

function addEntry() {
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    if (!description || isNaN(amount) || !date) {
        alert("Please enter valid details");
        return;
    }

    const entry = { description, amount, type, date };
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    loadEntries();
    resetFields();
}

function loadEntries(filter = "all") {
    const list = document.getElementById("entry-list");
    list.innerHTML = "";
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    entries.forEach((entry, index) => {
        if (filter === "all" || entry.type === filter) {
            const li = document.createElement("li");
            li.innerHTML = `<div class="entry-details">
                                <div class="entry1">
                                    <div>${entry.description}</div>
                                    <div>${entry.amount}</div>
                                    <div>${entry.date}</div>
                                </div>
                                <div class="button-line">
                                    <button onclick="editEntry(${index})" class="edit-btn">Edit</button>
                                    <button onclick="deleteEntry(${index}) " class="delete-btn">Delete</button>
                                </div>
                            </div> `;
            list.appendChild(li);
        }
        if (entry.type === "income") totalIncome += entry.amount;
        else totalExpense += entry.amount;
    });

    document.getElementById("total-income").textContent = totalIncome;
    document.getElementById("total-expense").textContent = totalExpense;
    document.getElementById("net-balance").textContent = totalIncome - totalExpense;
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    const entry = entries[index];
    
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    document.getElementById("type").value = entry.type;
    document.getElementById("date").value = entry.date;
    
    deleteEntry(index);
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries();
}

function resetFields() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

document.querySelectorAll("input[name='filter']").forEach(radio => {
    radio.addEventListener("change", function() {
        loadEntries(this.value);
    });
});
