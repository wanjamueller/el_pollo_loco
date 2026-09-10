/**
 * builds the HTML for the controls dialog, showing which key or button does what
 * the close button gets its listener in showControls() because it only exists once this HTML is inserted
 * @returns {string} The dialog markup as an HTML string.
 */
export function dialogTemplate() {
    return /*html*/ `
        <div>
            <div class="close-button">
                            <h3>Controls</h3>
                <button id="close"><img src="./assets/icons/close.svg" alt="close icon"></button>
            </div>
            <table>
                <tr>
                    <th><img src="./assets/icons/right.svg" alt="arrow right" /></th>
                    <td>-> move right</td>
                </tr>
                <tr>
                    <th><img src="./assets/icons/left.svg" alt="arrow right" /></th>
                    <td>-> move left</td>
                </tr>
                <tr>
                    <th><img src="./assets/icons/jump.svg" alt="arrow right" /> or "SPACE"</th>
                    <td>-> jump</td>
                </tr>
                <tr>
                    <th><img src="./assets/icons/attack.svg" alt="arrow right" /> or "D"</th>
                    <td>-> throw bottle</td>
                </tr>
            </table>
        </div>
    `;
}

export function imprintTemplate() {
    return /*html*/ `
        <section class="heading">
            <div class="close-button">
                <button id="close-imprint"><img src="./assets/icons/close.svg" alt="close icon"></button>
            </div>
                <div>
                    <h2>Imprint</h2>
                    <h3>Responsible for the Content:</h3>
                </div>
            </section>
            <section class="author">
                <img src="./assets/img/wanja-headshot.png" alt="headshot author" />
                <h4>Wanja Müller</h4>
                <p>Fullstack Developer</p>
                <a href="mailto:me@wanjamueller.com">me@wanjamueller.com</a>
            </section>
            <section class="content">
                <h3>This website was created as part of a school project for educational purposes only.</h3>
                <h4>Project Information</h4>
                <table class="table">
                    <tr>
                        <th>Project Name:</th>
                        <td>El Pollo Loco</td>
                    </tr>
                    <tr>
                        <th>Course:</th>
                        <td>Frontend Developer</td>
                    </tr>
                    <tr>
                        <th>School:</th>
                        <td>Developer Akademie</td>
                    </tr>
                </table>
                <h4>Disclaimer</h4>
                <p>
                    The content on this website is provided solely for demonstration and educational purposes. No
                    commercial services or products are offered.
                </p>
                <h4>Copyright</h4>
                <p>
                    Unless otherwise stated, all content, images, and code on this website were created for this
                    project. Any third-party materials remain the property of their respective owners and are used only
                    where permitted.
                </p>
                <h4>Backgroundmusic</h4>
                <p>"Modern Jazz Samba" Kevin MacLeod (incompetech.com)</p>
                <p>Licensed under Creative Commons: By Attribution 4.0</p>
                <a href="http://creativecommons.org/licenses/by/4.0/">http://creativecommons.org/licenses/by/4.0/</a>
                <h4>Liability for Links</h4>
                <p>
                    This website may contain links to external websites. The author is not responsible for the content
                    of those external websites.
                </p>
                <h4>Last Updated: September 2026</h4>
            </section>
    `;
}
