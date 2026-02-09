let transactions = [];
let chart;

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;

    if (!desc || !amount) {
        alert("Enter valid data");
        return;
    }

    transactions.push({ desc, amount, category, type });
    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

function updateUI() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let income = 0;
    let expense = 0;
    let categoryTotals = {};

    transactions.forEach((t, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${t.desc} (${t.category})</span>
            <span class="${t.type === 'income' ? 'positive' : 'negative'}">
                ${t.type === 'income' ? '+' : '-'}₹${t.amount}
                <button class="delete" onclick="deleteTransaction(${index})">x</button>
            </span>
        `;
        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        }
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

    updateChart(categoryTotals);
}

function updateChart(data) {
    const ctx = document.getElementById("chart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: "Expenses",
                data: Object.values(data)
            }]
        },
        options: {
            responsive: true
        }
    });
}