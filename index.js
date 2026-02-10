let currentQuote = null;
let selectedCategory = "all";
let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

function copyQuote() {
  if (!currentQuote) return;
  navigator.clipboard.writeText(
    `"${currentQuote.text}" - ${currentQuote.author}`,
  );
  showNotification("Quote copied!");
}

function addToFavorites() {
  if (!currentQuote) return;
  if (favorites.some((f) => f.text === currentQuote.text)) return;
  favorites.unshift(currentQuote);
  localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
  displayFavorites();
  showNotification("Saved!");
}

function removeFavorite(i) {
  favorites.splice(i, 1);
  localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
  displayFavorites();
}

function shareQuote() {
  if (!currentQuote) return;
  const text = `"${currentQuote.text}" - ${currentQuote.author}`;
  navigator.share ? navigator.share({ text }) : copyQuote();
}

function showNotification(msg) {
  const n = document.createElement("div");
  n.textContent = msg;
  n.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #2ecc71;
          color: white;
          padding: 12px 22px;
          border-radius: 50px;
          animation: slideInRight 0.3s ease-out;
          z-index: 9999;
        `;
  document.body.appendChild(n);
  setTimeout(() => {
    n.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => n.remove(), 300);
  }, 2000);
}
