// ================================
// LOAD DATA FROM localStorage
// ================================
const users = JSON.parse(localStorage.getItem("users")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];
const orders = JSON.parse(localStorage.getItem("orders")) || [];

// ================================
// CARDS COUNTS
// ================================
document.getElementById("usersCount").innerText = users.length;
document.getElementById("productsCount").innerText = products.length;
document.getElementById("ordersCount").innerText = orders.length;

// ================================
// TOTAL REVENUE (FROM ORDERS) EN DH
// ================================
let totalRevenue = 0;

orders.forEach(order => {
  totalRevenue += Number(order.quantity) * Number(order.price);
});

// Affichage en DH avec format français
document.getElementById("revenue").innerText =
  totalRevenue.toLocaleString("fr-FR") + " DH";

// ================================
// USERS PIE CHART
// ================================
const admins = users.filter(u => u.role === "Admin").length;
const clients = users.filter(u => u.role === "Client").length;

new Chart(document.getElementById("usersChart"), {
  type: "pie",
  data: {
    labels: ["Admins", "Clients"],
    datasets: [{
      data: [admins, clients],
      backgroundColor: ["#ffb6c1", "#ff69b4"]
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Users Distribution"
      }
    }
  }
});

// ================================
// REVENUE CIRCLE (EN DH)
// ================================
new Chart(document.getElementById("revenueCircle"), {
  type: "doughnut",
  data: {
    labels: ["Revenue (DH)"],
    datasets: [{
      data: [totalRevenue],
      backgroundColor: ["#ff69b4"]
    }]
  },
  options: {
    cutout: "65%",
    plugins: {
      title: {
        display: true,
        text: "Total Revenue (DH)"
      },
      legend: {
        display: false
      }
    }
  }
});

// ================================
// REVENUE EVOLUTION (BY DATE) EN DH
// ================================
const revenueByDate = {};

orders.forEach(order => {
  const date = order.date || "Unknown";
  const value = Number(order.quantity) * Number(order.price);

  if (!revenueByDate[date]) {
    revenueByDate[date] = 0;
  }
  revenueByDate[date] += value;
});

const dates = Object.keys(revenueByDate).sort();
const revenues = dates.map(d => revenueByDate[d]);

new Chart(document.getElementById("revenueChart"), {
  type: "line",
  data: {
    labels: dates,
    datasets: [{
      label: "Revenue (DH)",
      data: revenues,
      borderColor: "#ff69b4",
      backgroundColor: "rgba(255,105,180,0.2)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Revenue Evolution (DH)"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + " DH";
          }
        }
      }
    }
  }
});
