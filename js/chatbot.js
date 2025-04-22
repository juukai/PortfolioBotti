/**
 * chatbot.js – Sci-Fi Robotti Chatbotin toiminnallisuus
 * 
 * Tämä tiedosto sisältää chatbotin käyttölogiikan:
 * - Viestien ja vastausten käsittely
 * - Kysymysvaihtoehdot
 * - Scrollaus ja sulkeminen
 * - Projektikohtainen sisältö (responses.js)
 */

document.addEventListener("DOMContentLoaded", function() {
    let projectId = null;
    let chatContainer = null;
    let chatbotBox = null;
    let messagesDiv = null;
    let questionHistory = [];

    // Poistaa mahdollisen aiemmin luodun chatbotin
    function removeOldChatbot() {
        const oldContainer = document.getElementById("chatbot-container-v2");
        if (oldContainer) document.body.removeChild(oldContainer);

        const oldStyles = document.getElementById("chatbot-styles");
        if (oldStyles) oldStyles.parentNode.removeChild(oldStyles);
    }

    // Vieritä viestialue alas
    function scrollToBottom() {
        setTimeout(() => {
            messagesDiv.scrollTo({
                top: messagesDiv.scrollHeight,
                behavior: "smooth"
            });
        }, 200);
    }

    // Lisää viesti viestialueelle
    function addMessage(who, message) {
        if (!messagesDiv) return;

        const messageElement = document.createElement("div");
        messageElement.className = who === "Botti" ? "bot-message" : "user-message";

        const nameSpan = document.createElement("span");
        nameSpan.className = who === "Botti" ? "bot-name" : "user-name";
        nameSpan.innerText = who + ":";

        const contentSpan = document.createElement("span");
        contentSpan.className = "message-content";
        contentSpan.innerText = ` ${message}`;

        messageElement.appendChild(nameSpan);
        messageElement.appendChild(contentSpan);
        messagesDiv.appendChild(messageElement);

        scrollToBottom();
    }

    // Luo kysymyspainike, jonka käyttäjä voi klikata
    function addOption(text, callback, questionType) {
        if (!messagesDiv) return;

        const button = document.createElement("button");
        button.classList.add("chatbot-option-v2");
        button.innerText = text;
        button.setAttribute("data-question-type", questionType);

        button.addEventListener("click", function () {
            callback();
            questionHistory.push(questionType);

            if (questionHistory.length === 1) {
                showRemainingQuestions();
            }

            scrollToBottom();
        });

        messagesDiv.appendChild(button);
    }

    // Näyttää jäljellä olevat kysymykset ensimmäisen valinnan jälkeen
    function showRemainingQuestions() {
        setTimeout(() => {
            const allQuestions = ["teknologiat", "haasteet", "yleistä"];
            const remainingQuestions = allQuestions.filter(q => !questionHistory.includes(q));

            if (remainingQuestions.length > 0) {
                addMessage("Botti", "Haluatko tietää lisää? Valitse toinen aihe:");

                const optionsContainer = document.createElement("div");
                optionsContainer.className = "remaining-options-container";

                remainingQuestions.forEach((questionType, index) => {
                    setTimeout(() => {
                        let buttonText = "";
                        if (questionType === "teknologiat") buttonText = "📌 Mitä teknologioita käytit?";
                        else if (questionType === "haasteet") buttonText = "⚠️ Mitkä olivat suurimmat haasteet?";
                        else if (questionType === "yleistä") buttonText = "ℹ️ Kerro projektista yleisesti";

                        const optionButton = document.createElement("button");
                        optionButton.classList.add("chatbot-option-v2");
                        optionButton.innerText = buttonText;
                        optionButton.setAttribute("data-question-type", questionType);

                        optionButton.addEventListener("click", function () {
                            const humanQuestion = buttonText.replace(/^[📌⚠️ℹ️]\s/, "");
                            addMessage("Sinä", humanQuestion);
                            addMessage("Botti", getBotResponse(questionType));
                            questionHistory.push(questionType);

                            if (optionsContainer.parentNode) {
                                optionsContainer.parentNode.removeChild(optionsContainer);
                            }

                            if (questionHistory.length === 3) {
                                setTimeout(() => {
                                    addMessage("Botti", "Nyt oot kysynyt kaikki kysymykset!");
                                    setTimeout(() => {
                                        const closeButton = document.createElement("button");
                                        closeButton.classList.add("chatbot-option-v2");
                                        closeButton.innerText = "Kiitos, ei muuta kysyttävää!";

                                        closeButton.addEventListener("click", function () {
                                            addMessage("Sinä", "Kiitos, ei muuta kysyttävää!");
                                            addMessage("Botti", "Kiitti kun olit kiinnostunu tästä mun projektista! Moikka!");
                                            setTimeout(removeOldChatbot, 3500);
                                        });

                                        const closeContainer = document.createElement("div");
                                        closeContainer.style.cssText = `
                                            position: sticky;
                                            bottom: 0;
                                            background-color: #1a1a1a;
                                            padding: 8px;
                                            margin-top: 8px;
                                            z-index: 10;
                                        `;

                                        closeContainer.appendChild(closeButton);
                                        messagesDiv.appendChild(closeContainer);
                                        scrollToBottom();
                                    }, 1000);
                                }, 3000);
                            } else {
                                showRemainingQuestions();
                            }
                        });

                        optionsContainer.appendChild(optionButton);
                        scrollToBottom();
                    }, index * 500);
                });

                messagesDiv.appendChild(optionsContainer);
                scrollToBottom();
            }
        }, 2000);
    }

    // Hakee bottivastauksen responses.js-tiedostosta
    function getBotResponse(input) {
        input = input.toLowerCase().trim();
        if (!projectId || !responses[projectId]) return "Virhe: Projektia ei ole määritelty oikein.";

        if (input.includes("teknologiat")) return responses[projectId]["teknologiat"] || "Ei tietoa teknologioista.";
        if (input.includes("haasteet")) return responses[projectId]["haasteet"] || "Ei tietoa haasteista.";
        if (input.includes("yleisesti") || input.includes("projekti") || input === "yleistä")
            return responses[projectId]["yleistä"] || "Ei yleistä tietoa.";

        return "Anteeksi, en ymmärtänyt kysymystä.";
    }

    // Näyttää ensimmäiset kolme kysymystä bottia avatessa
    function showOptions() {
        questionHistory = [];
        addMessage("Botti", `Moro! Haluaisitko tietää enemmän tästä ${projectId} projektista?`);

        setTimeout(() => addOption("📌 Mitä teknologioita käytit?", () => {
            addMessage("Sinä", "Mitä teknologioita käytit?");
            addMessage("Botti", getBotResponse("teknologiat"));
        }, "teknologiat"), 1000);

        setTimeout(() => addOption("⚠️ Mitkä olivat suurimmat haasteet?", () => {
            addMessage("Sinä", "Mitkä olivat suurimmat haasteet?");
            addMessage("Botti", getBotResponse("haasteet"));
        }, "haasteet"), 2000);

        setTimeout(() => addOption("ℹ️ Kerro projektista yleisesti", () => {
            addMessage("Sinä", "Kerro projektista yleisesti");
            addMessage("Botti", getBotResponse("yleistä"));
        }, "yleistä"), 3000);
    }

    // Luo chatbotin elementit ja logiikka
    function createChatbot(projectButton) {
        removeOldChatbot();
        projectId = projectButton.getAttribute("data-project");

        chatContainer = document.createElement("div");
        chatContainer.id = "chatbot-container-v2";
        document.body.appendChild(chatContainer);

        chatbotBox = document.createElement("div");
        chatbotBox.id = "chatbot-box-v2";
        chatbotBox.setAttribute("data-project", projectId);
        chatContainer.appendChild(chatbotBox);

        const title = document.createElement("div");
        title.className = "chatbot-title-v2";
        title.textContent = `Projekti: ${projectId}`;
        chatbotBox.appendChild(title);

        const closeBtn = document.createElement("button");
        closeBtn.className = "chatbot-close-v2";
        closeBtn.textContent = "✖";
        closeBtn.addEventListener("click", function () {
            addMessage("Botti", "Kiitti kun olit kiinnostunu tästä mun projektista! Moikka!");
            setTimeout(removeOldChatbot, 2000);
        });
        chatbotBox.appendChild(closeBtn);

        messagesDiv = document.createElement("div");
        messagesDiv.id = "chatbot-messages-v2";
        chatbotBox.appendChild(messagesDiv);

        setTimeout(showOptions, 500);
    }

    // Lisää bottinappien kuuntelijat sivulla
    document.querySelectorAll(".ai-button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(() => createChatbot(this), 200);
        });
    });

    // Piilota alkuperäiset kysymysnapit ensimmäisen valinnan jälkeen
    const observer = new MutationObserver(() => {
        const buttons = document.querySelectorAll(".chatbot-option-v2");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.style.display = "none");
            }, { once: true });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});