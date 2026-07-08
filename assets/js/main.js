const legalModal = document.getElementById('legalModal');
const legalDeskButton = document.getElementById('legalDeskButton');
const closeLegalModalButton = document.getElementById('closeLegalModalButton');

let lastFocusedElement = null;

function getFocusableElements() {
    return legalModal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
}

function trapFocus(event) {
    if (event.key !== 'Tab') {
        return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

function openLegalModal() {
    lastFocusedElement = document.activeElement;
    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden', 'false');
    closeLegalModalButton.focus();
    document.addEventListener('keydown', trapFocus);
}

function closeLegalModal() {
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

legalDeskButton.addEventListener('click', openLegalModal);
closeLegalModalButton.addEventListener('click', closeLegalModal);

legalModal.addEventListener('click', (event) => {
    if (event.target === legalModal) {
        closeLegalModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && legalModal.classList.contains('is-open')) {
        closeLegalModal();
    }
});
