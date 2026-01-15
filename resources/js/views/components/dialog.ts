/*
 * file: blogsy/resources/js/views/components/dialog.ts
 * description: Dialog/modal component
 * author: toni
 * date: 2026-01-14
 */

const Dialog = (
    title: string, 
    message: string, 
    onConfirm?: (() => void) | (() => Promise<void>), 
    onCancel?: () => void
): void => {
    let overlay = document.getElementById("confirm-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "confirm-overlay";
        overlay.innerHTML = `
            <div class="modal">
                <h3 id="modal-title"></h3>
                <p id="modal-message"></p>
                <div class="actions">
                    <button id="modal-ok">OK</button>
                    <button id="modal-cancel">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const titleEl = document.getElementById("modal-title");
    const messageEl = document.getElementById("modal-message");
    
    if (titleEl) titleEl.textContent = title;
    if (messageEl) messageEl.textContent = message;
    overlay.style.display = "flex";

    const okBtn = document.getElementById("modal-ok");
    const cancelBtn = document.getElementById("modal-cancel");

    if (okBtn) {
        okBtn.onclick = () => {
            overlay!.style.display = "none";
            if (onConfirm) onConfirm();
        };
    }

    if (cancelBtn) {
        cancelBtn.onclick = () => {
            overlay!.style.display = "none";
            if (onCancel) onCancel();
        };
    }
};

export default Dialog;
