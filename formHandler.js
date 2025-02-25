function handleFormNavigation(nextPage = null) {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");
        if (!form) return;

        const pageKey = location.pathname.split("/").pop();

        // Load stored data
        Object.entries(JSON.parse(localStorage.getItem(pageKey) || "{}")).forEach(([key, value]) => {
            const field = form.elements[key];
            if (field) field.value = value;
        });

        // Save on input change
        form.addEventListener("input", () => {
            const formData = Object.fromEntries(new FormData(form));
            localStorage.setItem(pageKey, JSON.stringify(formData));
        });

        // Handle form submission
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual form submission

            const formData = Object.fromEntries(new FormData(form));
            localStorage.setItem(pageKey, JSON.stringify(formData));

            if (nextPage) window.location.href = nextPage; // Navigate if nextPage is provided
        });
    });
}
