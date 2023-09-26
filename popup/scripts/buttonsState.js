export function updateButtonState(buttonElement, status, connectionMode) {
    if (status === "CONNECTED" || connectionMode === "FAST") {
        buttonElement.textContent = "Disconnect";
        buttonElement.classList.add('disconnect-btn');
    }

    if (status === "DISCONNECT" || status === "NO_CONNECT" || status === "ERROR") {
        buttonElement.textContent = "Connect";
        buttonElement.classList.remove('disconnect-btn')
    }
}