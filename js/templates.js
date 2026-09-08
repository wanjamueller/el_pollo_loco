export function dialogTeamplate() {
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
