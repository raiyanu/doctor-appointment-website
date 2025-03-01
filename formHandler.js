function handleFormNavigation(nextPage = null) {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");
        if (!form) return;

        const currentPatientId = localStorage.getItem('currentPatientId') || "patientID-" + Math.floor(Math.random() * 1000000);
        localStorage.setItem('currentPatientId', currentPatientId);

        // Load stored data
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const currentPatient = patients.find(patient => patient.id === currentPatientId) || {};
        Object.entries(currentPatient.details || {}).forEach(([key, value]) => {
            const field = form.elements[key];
            if (field) field.value = value;
        });

        // Save on input change
        form.addEventListener("input", () => {
            const formData = Object.fromEntries(new FormData(form));
            const updatedPatients = patients.filter(patient => patient.id !== currentPatientId);
            updatedPatients.push({ id: currentPatientId, details: formData });
            localStorage.setItem('patients', JSON.stringify(updatedPatients));
        });

        // Handle form submission
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual form submission

            const formData = Object.fromEntries(new FormData(form));
            const updatedPatients = patients.filter(patient => patient.id !== currentPatientId);
            updatedPatients.push({ id: currentPatientId, details: formData });
            localStorage.setItem('patients', JSON.stringify(updatedPatients));

            if (nextPage) window.location.href = nextPage; // Navigate if nextPage is provided
        });
    });
}
