/**
 * Chatbot vastaukset eri projekteille
 * 
 * Tässä tiedostossa määritellään chatbotin vastaukset eri projekteille.
 * Voit muokata tai lisätä projektikohtaisia vastauksia muuttamalla responses-objektia.
 * 
 * Rakenne:
 * {
 *   "projekti-id": {
 *     "teknologiat": "Vastaus teknologioihin liittyviin kysymyksiin",
 *     "haasteet": "Vastaus haasteisiin liittyviin kysymyksiin",
 *     "yleistä": "Yleinen vastaus projektista"
 *   }
 * }
 */

// Esimerkki vastaukset - vaihda nämä omiin vastauksiin
const responses = {
    "esimerkki1": {
        "teknologiat": "Tässä projektissa käytin HTML5:ttä, SCSS:ää ja pientä ripaus JavaScriptiä, jotta sain tehtyä yksinkertaisen mutta näyttävän portfolio-landing-sivun.",
        "haasteet": "Haastavinta oli saada animaatiot ja responsiivisuus toimimaan saumattomasti kaikilla näytöillä. Media queryt ja flexboxit vaati vähän taiteilua.",
        "yleistä": "Tarkoitus oli tehdä minimalistinen ja nopea etusivu omalle portfoliolle, jossa tärkeimmät asiat löytyy heti ilman klikkailua."
    },
    "esimerkki2": {
        "teknologiat": "Käytin tässä JavaScriptiä, OpenWeatherMap APIa ja vähän CSS-animaatioita, jotta widgetissä näkyy sään lisäksi myös pieniä visuaalisia efektejä.",
        "haasteet": "Vaikeinta oli API:n käsittely ja virheiden hallinta. Esim. väärä kaupunki tai verkkovirhe piti käsitellä fiksusti ilman, että käyttäjä huomaa mitään.",
        "yleistä": "Tämä projekti oli osa pienempää harjoitusta, jonka tavoitteena oli tehdä uudelleenkäytettävä sääkortti komponenttina muihin sivuihin."
    }
    
    // Lisää omat projektisi tähän:
    // "projekti-id": {
    //     "teknologiat": "Vastaus teknologioihin",
    //     "haasteet": "Vastaus haasteisiin",
    //     "yleistä": "Yleinen kuvaus"
    // }
};