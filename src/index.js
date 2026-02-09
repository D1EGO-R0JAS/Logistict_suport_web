// Mobile menu toggle
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector("#primary-navigation");

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");

    if (visibility === "false" || visibility === null) {
        // Abrir el menú
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        // Cerrar el menú
        primaryNav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});

/*-------------------------------------------------*/

/*API TRM*/ 
const CONFIG = {
    API_KEY: '836bec389f9c85afbe113817',
    BASE_URL: 'https://v6.exchangerate-api.com/v6'
};

const elements = {
    amount: document.getElementById('amount'),
    base: document.getElementById('baseCurrency'),
    target: document.getElementById('targetCurrency'),
    result: document.getElementById('resultValue'),
    menu: document.getElementById('trmMenu'),
    trigger: document.getElementById('trmTrigger')
};

// Toggle del Menú
function toggleTrmMenu() {
    const isActive = elements.menu.classList.toggle('active');
    elements.trigger.setAttribute('aria-expanded', isActive);
}

// Función principal de conversión
async function updateConversion() {
    const amount = elements.amount.value;
    const base = elements.base.value;
    const target = elements.target.value;

    if (!amount || amount <= 0) return;

    try {
        const response = await fetch(`${CONFIG.BASE_URL}/${CONFIG.API_KEY}/pair/${base}/${target}/${amount}`);
        const data = await response.json();

        if (data.result === 'success') {
            elements.result.value = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: target,
                maximumFractionDigits: 2
            }).format(data.conversion_result);
        }
    } catch (error) {
        console.error("Error en conversión:", error);
    }
}

// Actualiza las tasas rápidas de la parte inferior (Siempre contra COP)
async function updateQuickRates() {
    try {
        const response = await fetch(`${CONFIG.BASE_URL}/${CONFIG.API_KEY}/latest/COP`);
        const data = await response.json();
        
        if (data.result === 'success') {
            const rates = data.conversion_rates;
            document.getElementById('quick-usd').innerText = Math.round(1 / rates.USD).toLocaleString();
            document.getElementById('quick-eur').innerText = Math.round(1 / rates.EUR).toLocaleString();
            document.getElementById('quick-jpy').innerText = (1 / rates.JPY).toFixed(2);
        }
    } catch (error) {
        console.error("Error en tasas rápidas:", error);
    }
}

function swapCurrencies() {
    const temp = elements.base.value;
    elements.base.value = elements.target.value;
    elements.target.value = temp;
    updateConversion();
}

// Event Listeners
[elements.amount, elements.base, elements.target].forEach(el => {
    el.addEventListener('input', updateConversion);
});

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateQuickRates();
    updateConversion();
});

/** --------------------------------------------------- */
/* ACERCA DE NOSOTROS*/
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve para mejorar performance una vez animado
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});