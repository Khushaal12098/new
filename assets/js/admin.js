/* ========================================
   WOOD CAMP PHARMA - ADMIN JAVASCRIPT
   Authentication, data management, CRUD
   ======================================== */

// ============ AUTH CHECK ============
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    window.location.href = '../login.html';
  }
}

// Check on page load
window.addEventListener('load', () => {
  checkAuth();
});

// ============ LOGOUT FUNCTION ============
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminEmail');
    window.location.href = '../login.html';
  }
}

// ============ INITIALIZE DEFAULT DATA ============
function initializeDefaultData() {
  // Initialize wood products
  if (!localStorage.getItem('products_wood')) {
    const woodProducts = [
      { id: 1, name: 'Marine Plywood (13mm)', category: 'wood', status: 'Active' },
      { id: 2, name: 'Commercial Plywood (9mm)', category: 'wood', status: 'Active' },
      { id: 3, name: 'Teak Timber (FAS Grade)', category: 'wood', status: 'Active' },
      { id: 4, name: 'Softwood Timber', category: 'wood', status: 'Active' },
      { id: 5, name: 'Blockboard (12mm)', category: 'wood', status: 'Inactive' },
    ];
    localStorage.setItem('products_wood', JSON.stringify(woodProducts));
  }

  // Initialize chemical products
  if (!localStorage.getItem('products_chemicals')) {
    const chemicalProducts = [
      { id: 1, name: 'Sodium Chloride (NaCl)', category: 'chemicals', status: 'Active' },
      { id: 2, name: 'Sulfuric Acid (H₂SO₄)', category: 'chemicals', status: 'Active' },
      { id: 3, name: 'Citric Acid Monohydrate', category: 'chemicals', status: 'Active' },
      { id: 4, name: 'Calcium Hydroxide Ca(OH)₂', category: 'chemicals', status: 'Active' },
    ];
    localStorage.setItem('products_chemicals', JSON.stringify(chemicalProducts));
  }

  // Initialize pharma products
  if (!localStorage.getItem('products_pharma')) {
    const pharmaProducts = [
      { id: 1, name: 'Paracetamol API', category: 'pharma', status: 'Active' },
      { id: 2, name: 'Ibuprofen API', category: 'pharma', status: 'Active' },
      { id: 3, name: 'Ampicillin Trihydrate', category: 'pharma', status: 'Active' },
      { id: 4, name: 'Metformin HCl API', category: 'pharma', status: 'Active' },
      { id: 5, name: 'Diclofenac Sodium', category: 'pharma', status: 'Inactive' },
    ];
    localStorage.setItem('products_pharma', JSON.stringify(pharmaProducts));
  }
}

// Initialize on load
initializeDefaultData();

// ============ DASHBOARD FUNCTIONS ============
function loadDashboardData() {
  // Count leads
  const leads = JSON.parse(localStorage.getItem('userLeads')) || [];
  document.getElementById('totalLeads').textContent = leads.length;

  // Count products
  const woodProducts = JSON.parse(localStorage.getItem('products_wood')) || [];
  const chemicalProducts = JSON.parse(localStorage.getItem('products_chemicals')) || [];
  const pharmaProducts = JSON.parse(localStorage.getItem('products_pharma')) || [];

  document.getElementById('totalWood').textContent = woodProducts.length;
  document.getElementById('totalChemicals').textContent = chemicalProducts.length;
  document.getElementById('totalPharma').textContent = pharmaProducts.length;

  // Load recent leads table
  loadLeadsTable();

  // Load chart data
  updateDistributionChart(leads);
}

// Load leads into table
function loadLeadsTable() {
  const leads = JSON.parse(localStorage.getItem('userLeads')) || [];
  const tableBody = document.getElementById('leadsTableBody');
  
  if (!tableBody) return;

  tableBody.innerHTML = '';

  // Show only last 5 leads
  const recentLeads = leads.slice(-5).reverse();

  if (recentLeads.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No leads yet</td></tr>';
    return;
  }

  recentLeads.forEach(lead => {
    const row = `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.phone}</td>
        <td>${lead.country}</td>
        <td>${lead.interest}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Update distribution chart
function updateDistributionChart(leads) {
  const distribution = {
    'Wood Products': 0,
    'Chemical Products': 0,
    'Pharmaceutical Products': 0,
    'All': 0
  };

  leads.forEach(lead => {
    if (distribution.hasOwnProperty(lead.interest)) {
      distribution[lead.interest]++;
    }
  });

  // Simple bar chart using HTML/CSS
  const chartContainer = document.getElementById('chartContainer');
  if (!chartContainer) return;

  const total = leads.length || 1;
  const maxHeight = 200;

  let chartHTML = '<div style="display: flex; align-items: flex-end; justify-content: space-around; gap: var(--spacing-lg); height: 250px;">';

  for (const [key, value] of Object.entries(distribution)) {
    const percentage = (value / total * 100).toFixed(0);
    const height = (value / total * maxHeight) || 10;

    chartHTML += `
      <div style="text-align: center; flex: 1;">
        <div style="background: linear-gradient(180deg, var(--accent-blue), var(--accent-purple)); 
                    height: ${height}px; border-radius: var(--radius-md) var(--radius-md) 0 0;
                    margin-bottom: var(--spacing-sm); transition: all 0.3s ease;" 
             class="chart-bar"></div>
        <div style="font-weight: 600; color: var(--accent-blue);">${value}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${key.split(' ')[0]}</div>
      </div>
    `;
  }

  chartHTML += '</div>';
  chartContainer.innerHTML = chartHTML;

  // Add hover effect
  document.querySelectorAll('.chart-bar').forEach(bar => {
    bar.addEventListener('mouseenter', function() {
      this.style.opacity = '0.8';
      this.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
    });
    bar.addEventListener('mouseleave', function() {
      this.style.opacity = '1';
      this.style.boxShadow = 'none';
    });
  });
}

// ============ PRODUCTS PAGE FUNCTIONS ============
function switchProductTab(category) {
  // Update active tab
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  event.target.classList.add('active');

  // Load products for category
  loadProductsTable(category);
}

// Load products table
function loadProductsTable(category) {
  let products;
  
  if (category === 'wood') {
    products = JSON.parse(localStorage.getItem('products_wood')) || [];
  } else if (category === 'chemicals') {
    products = JSON.parse(localStorage.getItem('products_chemicals')) || [];
  } else if (category === 'pharma') {
    products = JSON.parse(localStorage.getItem('products_pharma')) || [];
  }

  const tableBody = document.getElementById('productsTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No products</td></tr>';
    return;
  }

  products.forEach(product => {
    const statusBadge = `<span style="background: ${product.status === 'Active' ? 'rgba(0, 255, 153, 0.2)' : 'rgba(255, 100, 100, 0.2)'}; 
                                   color: ${product.status === 'Active' ? 'var(--accent-teal)' : '#ff6464'};
                                   padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">${product.status}</span>`;

    const row = `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${category}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85rem; margin-right: 6px;"
                  onclick="editProduct('${category}', ${product.id})">Edit</button>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85rem; background: rgba(255, 100, 100, 0.1); border-color: #ff6464; color: #ff6464;"
                  onclick="deleteProduct('${category}', ${product.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Add product
function addProduct(category) {
  const productName = prompt('Enter product name:');
  if (!productName) return;

  const key = `products_${category}`;
  const products = JSON.parse(localStorage.getItem(key)) || [];

  const newProduct = {
    id: Math.max(...products.map(p => p.id), 0) + 1,
    name: productName,
    category: category,
    status: 'Active'
  };

  products.push(newProduct);
  localStorage.setItem(key, JSON.stringify(products));

  // Refresh table
  loadProductsTable(category);
  alert('Product added successfully!');
}

// Edit product
function editProduct(category, productId) {
  const key = `products_${category}`;
  const products = JSON.parse(localStorage.getItem(key)) || [];
  const product = products.find(p => p.id === productId);

  if (!product) return;

  const newName = prompt('Edit product name:', product.name);
  if (!newName) return;

  product.name = newName;
  localStorage.setItem(key, JSON.stringify(products));

  loadProductsTable(category);
  alert('Product updated successfully!');
}

// Delete product
function deleteProduct(category, productId) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  const key = `products_${category}`;
  let products = JSON.parse(localStorage.getItem(key)) || [];

  products = products.filter(p => p.id !== productId);
  localStorage.setItem(key, JSON.stringify(products));

  loadProductsTable(category);
  alert('Product deleted successfully!');
}

// Toggle product status
function toggleProductStatus(category, productId) {
  const key = `products_${category}`;
  const products = JSON.parse(localStorage.getItem(key)) || [];
  const product = products.find(p => p.id === productId);

  if (product) {
    product.status = product.status === 'Active' ? 'Inactive' : 'Active';
    localStorage.setItem(key, JSON.stringify(products));
    loadProductsTable(category);
  }
}

// ============ UTILITY FUNCTIONS ============
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Load welcome message
function loadWelcomeMessage() {
  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';
  const userNameElement = document.getElementById('userName');
  if (userNameElement) {
    userNameElement.textContent = adminEmail.split('@')[0];
  }
}

// Initialize welcome on page load
window.addEventListener('load', () => {
  loadWelcomeMessage();
});

console.log('Admin JavaScript loaded');
