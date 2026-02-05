const API_URL = "http://localhost:5000/products";

document.getElementById("productForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const messageEl = document.getElementById("message");
    messageEl.textContent = "";
    messageEl.className = "";

    const formData = new FormData();

    formData.append("name", document.getElementById("name").value.trim());
    formData.append("category", document.getElementById("category").value.trim());
    formData.append("price", document.getElementById("price").value);
    formData.append("description", document.getElementById("description").value.trim());
    formData.append("stock", document.getElementById("stock").value);
    formData.append("rating", document.getElementById("rating").value);

    const imageFile = document.getElementById("image").files[0];
    if (!imageFile) {
        showMessage("Rasm faylini tanlang!", "error");
        return;
    }
    formData.append("image", imageFile);

    if (!formData.get("name") || !formData.get("category")) {
        showMessage("Majburiy maydonlarni to'ldiring!", "error");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            showMessage("Mahsulot muvaffaqiyatli qo'shildi!", "success");
            document.getElementById("productForm").reset();
        } else {
            showMessage(result.message || "Xato: " + response.status + " - " + (result.error || ""), "error");
            console.log("Backend javobi:", result);
        }
    } catch (err) {
        showMessage("Server bilan ulanishda xato: " + err.message, "error");
        console.error(err);
    }
});

function showMessage(text, type) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.className = type;  // success yoki error
}