document.addEventListener('DOMContentLoaded', function() {

    // --- Efecto de Escritura (Typed.js) ---
    // Asegúrate de incluir la librería Typed.js en tu HTML
    // <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Multiplataforma.', 'creativo.', 'apasionado.', 'curioso.'],
            typeSpeed: 70, // Velocidad de escritura
            backSpeed: 50, // Velocidad de borrado
            loop: true, // Repetir el ciclo
            backDelay: 2000, // Pausa antes de borrar
        });
    }

    // --- Animación del Encabezado al Hacer Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animaciones de Secciones al Hacer Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.container');

    const observerOptions = {
        root: null, // Usa el viewport como área de observación
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento está en la pantalla
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar el elemento una vez que es visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observar cada una de las secciones
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Desplazamiento Suave para los Enlaces de Navegación ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});