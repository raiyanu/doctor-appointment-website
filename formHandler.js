function handleFormNavigation(nextPage = null) {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");
        if (!form) return;

        const currentPatientId = localStorage.getItem('currentPatientId') || "patientID-" + Math.floor(Math.random() * 1000000);
        localStorage.setItem('currentPatientId', currentPatientId);

        // Load latest patient data
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        let currentPatient = patients.find(patient => patient.id === currentPatientId);

        if (!currentPatient) {
            currentPatient = { id: currentPatientId, details: {} };
            patients.push(currentPatient);
        }

        // Populate form fields with existing data
        Object.entries(currentPatient.details).forEach(([key, value]) => {
            if (form.elements[key]) form.elements[key].value = value;
        });

        function savePatientData() {
            const formData = Object.fromEntries(new FormData(form));

            // Merge new data with existing details
            currentPatient.details = { ...currentPatient.details, ...formData };

            // Update patients array
            const updatedPatients = patients.map(patient =>
                patient.id === currentPatientId ? currentPatient : patient
            );

            localStorage.setItem('patients', JSON.stringify(updatedPatients));
        }

        form.addEventListener("input", savePatientData);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            savePatientData();
            if (nextPage) window.location.href = nextPage;
        });
    });
}
