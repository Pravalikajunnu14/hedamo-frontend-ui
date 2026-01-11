const products = [
  {
    id: 1,
    name: "Organic Cotton Fabric",
    category: "Textiles",
    producer: "GreenWeave Ltd",
    status: "Published",
    updated: "2026-01-05",
    evidence: 2,
    versions: [
      { version: "v1.0", date: "2025-12-01", status: "Submitted" },
      { version: "v1.1", date: "2026-01-05", status: "Published" }
    ]
  },
  {
    id: 2,
    name: "Recycled Aluminum Sheet",
    category: "Metals",
    producer: "EcoMetals Co",
    status: "Draft",
    updated: "2026-01-02",
    evidence: 0,
    versions: [
      { version: "v1.0", date: "2026-01-02", status: "Draft" }
    ]
  }
];

const listEl = document.getElementById("productList");
const detailEl = document.getElementById("productDetail");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function renderList(data) {
  listEl.innerHTML = "";

  if (data.length === 0) {
    listEl.innerHTML = "<p>No disclosures match your criteria.</p>";
    return;
  }

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${product.name}</strong><br>
      Category: ${product.category}<br>
      Declared by: ${product.producer}<br>
      Last updated: ${product.updated}<br>
      <span class="badge ${product.status}">${product.status}</span>
    `;
    card.onclick = () => showDetail(product);
    listEl.appendChild(card);
  });
}

function showDetail(product) {
  detailEl.classList.remove("hidden");
  detailEl.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Declared by:</strong> ${product.producer}</p>
    <p><strong>Evidence attached:</strong> ${product.evidence}</p>

    <h3>Version History</h3>
    <ul>
      ${product.versions
        .map(
          v =>
            `<li>${v.version} – ${v.date} (${v.status})</li>`
        )
        .join("")}
    </ul>

    <div class="disclaimer">
      This page presents producer-declared information; it is not certification or verification.
    </div>
  `;
}

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const status = statusFilter.value;

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search) ||
      p.producer.toLowerCase().includes(search);

    const matchesStatus = status ? p.status === status : true;

    return matchesSearch && matchesStatus;
  });

  renderList(filtered);
}

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);

renderList(products);