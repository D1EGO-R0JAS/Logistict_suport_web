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

/**------------------------------------------------ */
/** Seccion de puertos y aeropuertos */
const track1 = document.getElementById('carouselTrack1');
const nextBtn1 = document.querySelector('.next1');
const prevBtn1 = document.querySelector('.prev1');
const track2 = document.getElementById('carouselTrack2');
const nextBtn2 = document.querySelector('.next2');
const prevBtn2 = document.querySelector('.prev2');

let isAutoPlaying = true;

const autoPlay = () => {
  if (!isAutoPlaying) return;
  const cardWidth = track1.querySelector('.card').offsetWidth + 24;
  const cardWidth2 = track2.querySelector('.card').offsetWidth + 24;
  if (track1.scrollLeft + track1.offsetWidth >= track1.scrollWidth) {
    track1.scrollTo({ left: 0, behavior: 'smooth' });
  }else if(track2.scrollLeft + track2.offsetWidth >= track2.scrollWidth){
    track2.scrollTo({ left: 0, behavior: 'smooth' });
  }else {
    track1.scrollBy({ left: cardWidth, behavior: 'smooth' });
    track2.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
};

let autoPlayTimer = setInterval(autoPlay, 4000);

// Detener auto-play al interactuar

const stopAutoPlay = () => {
  isAutoPlaying = false;
  clearInterval(autoPlayTimer);
};

nextBtn1.addEventListener('click', () => {
  stopAutoPlay();
  const cardWidth = track1.querySelector('.card').offsetWidth + 24;
  track1.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

prevBtn1.addEventListener('click', () => {
  stopAutoPlay();
  const cardWidth = track1.querySelector('.card').offsetWidth + 24;
  track1.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

nextBtn2.addEventListener('click', () => {
  stopAutoPlay();
  const cardWidth = track2.querySelector('.card').offsetWidth + 24;
  track2.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

prevBtn2.addEventListener('click', () => {
  stopAutoPlay();
  const cardWidth = track2.querySelector('.card').offsetWidth + 24;
  track2.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

// Soporte para pausa en hover (Desktop)
track1.addEventListener('mouseenter', () => (isAutoPlaying = false));
track1.addEventListener('mouseleave', () => (isAutoPlaying = true));
track2.addEventListener('mouseenter', () => (isAutoPlaying = false));
track2.addEventListener('mouseleave', () => (isAutoPlaying = true));

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

/** ------------------------------------------------ */
/** PORTAFOLIO DE SERVICIOS */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    // Soporte para dispositivos móviles (Toggeable)
    card.addEventListener('click', function(e) {
      if (window.innerWidth < 1024) {
        this.classList.toggle('is-active');
        // Cerrar otras tarjetas abiertas
        cards.forEach(c => { if(c !== this) c.classList.remove('is-active'); });
      }
    });

    // Accesibilidad por teclado
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') card.classList.toggle('is-active');
    });
  });
});

/*------------------------------------------------- */
/* SECCION DE LAS SEDES */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.location-card');
  const mainMap = document.getElementById('main-map');

  mainMap.addEventListener('load', () => {
    mainMap.style.opacity = '1';
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {

      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const newMapUrl = card.dataset.map;

      if (mainMap.getAttribute('src') === newMapUrl) return;

      mainMap.style.opacity = '0';

      setTimeout(() => {
        mainMap.setAttribute('src', newMapUrl);
      }, 300);

    });
  });
});


/*
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.location-card');
  const mainMap = document.getElementById('main-map');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // 1. Gestionar estados visuales
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // 2. Actualizar Mapa con transición suave
      const newMapUrl = card.getAttribute('data-map');
      
      // Pequeño fade out/in para UX
      mainMap.style.opacity = '0';
      
      setTimeout(() => {
        mainMap.setAttribute('src', newMapUrl);
        mainMap.onload = () => {
          mainMap.style.opacity = '1';
        };
      }, 300);
    });
  });
});
*/
/*-------------------------------------------------*/
/* TRacking envios */
const API_URL = "https://script.google.com/macros/s/AKfycbzO7hzhfVYkzvC3MRMIgn36qD2z5G8GdzyLDXqBd_jq8FrtRKbNsBUk1L7tRumElXkU/exec";

  function buscarFile() {
    const file = document.getElementById("fileInput").value.trim();
    const resultado = document.getElementById("resultado");

    if (!file) {
      alert("Por favor ingrese un FILE");
      return;
    }

    resultado.innerHTML = `<p class="loading">Consultando información...</p>`;

    fetch(`${API_URL}?file=${encodeURIComponent(file)}`)
      .then(response => response.json())
      .then(data => {

        if (data.error) {
          resultado.innerHTML = `<div class="error">${data.error}</div>`;
          return;
        }

        let html = `
          <div class="card">
            <h2>Información del Servicio</h2>
        `;

        for (let key in data) {
          html += `
            <div class="row">
              <div class="label">${key}</div>
              <div class="value">${data[key] || "-"}</div>
            </div>
          `;
        }

        html += `</div>`;
        resultado.innerHTML = html;
      })
      .catch(err => {
        resultado.innerHTML = `<div class="error">Error consultando el servicio</div>`;
        console.error(err);
      });
  }