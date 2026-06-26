const legalModal = document.getElementById('legalModal');
const legalDeskButton = document.getElementById('legalDeskButton');
const closeLegalModalButton = document.getElementById('closeLegalModalButton');

function openLegalModal() {
    legalModal.classList.add('is-open');
    legalModal.setAttribute('aria-hidden', 'false');
}

function closeLegalModal() {
    legalModal.classList.remove('is-open');
    legalModal.setAttribute('aria-hidden', 'true');
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
