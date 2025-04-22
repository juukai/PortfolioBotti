/**
 * Robotti-ikonien animaatiot ja visuaaliset tehosteet
 */

document.addEventListener("DOMContentLoaded", function() {
    // Paranna robotti-ikoneja kun sivu on latautunut
    setTimeout(enhanceRobotIcons, 1000);
});

// Lisää pulseeraava "Kysy tästä" -teksti ja animaatio söpön botin viereen
function enhanceRobotIcons() {
    // Luodaan Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elementti on nyt näkyvissä viewportissa
                const button = entry.target;
                
                // Viivästetään näkyviin tulemista
                setTimeout(() => {
                    // Asetetaan nappi näkyväksi
                    button.style.opacity = "1";
                    button.style.visibility = "visible";
                    
                    // Luo söpö robottikuvake
                    const cuteRobot = document.createElement("div");
                    cuteRobot.className = "super-cute-robot";
                    
                    // Robotin osat
                    cuteRobot.innerHTML = `
                        <div class="robot-antenna"></div>
                        <div class="robot-head">
                            <div class="robot-face">
                                <div class="robot-eye"></div>
                                <div class="robot-eye"></div>
                            </div>
                            <div class="robot-smile"></div>
                            <div class="robot-cheek-left"></div>
                            <div class="robot-cheek-right"></div>
                        </div>
                        <div class="robot-body">
                            <div class="robot-detail"></div>
                        </div>
                        <div class="robot-arm-left"></div>
                        <div class="robot-arm-right"></div>
                    `;
                    
                    // Tyhjennä aiempi sisältö ja lisää uusi robotti
                    button.innerHTML = '';
                    button.appendChild(cuteRobot);
                    
                    // Lisää "Kysy tästä" -vihje
                    const hint = document.createElement("span");
                    hint.className = "chat-hint top";
                    hint.innerText = "Kysy tästä!";
                    button.appendChild(hint);
                    
                    // Poista vihje 10 sekunnin kuluttua
                    setTimeout(() => {
                        if (hint && hint.parentNode) {
                            hint.parentNode.removeChild(hint);
                        }
                    }, 10000);
                    
                    // Lopeta tämän elementin tarkkailu, kun se on kerran nähty
                    observer.unobserve(button);
                }, 1500); // 1.5 sekunnin viive
            }
        });
    }, {
        // Konfiguraatiovaihtoehdot
        threshold: 0.1 // Elementti aktivoituu, kun 10% siitä on näkyvissä
    });
    
    // Aloita kaikkien ai-buttonien tarkkailu
    document.querySelectorAll(".ai-button").forEach(button => {
        observer.observe(button);
    });
}