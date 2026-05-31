const REVIEWS_APP_KEY = "patriotJjCampApp.v1";

const DEFAULT_APPROVED_REVIEWS = [
  {
    id: "review-1",
    name: "Parent of 5th grader",
    rating: 5,
    quote: "Our son left more confident and could explain what he learned without acting reckless.",
    status: "approved",
    submittedAt: "2026-05-26T09:00:00.000Z"
  },
  {
    id: "review-2",
    name: "AHS family",
    rating: 5,
    quote: "The leadership and character pieces made it feel like more than just a sports camp.",
    status: "approved",
    submittedAt: "2026-05-26T09:05:00.000Z"
  },
  {
    id: "review-3",
    name: "Middle school student",
    rating: 5,
    quote: "The instructors made hard skills feel understandable and fun.",
    status: "approved",
    submittedAt: "2026-05-26T09:10:00.000Z"
  }
];

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadApprovedReviews() {
  try {
    const stored = JSON.parse(localStorage.getItem(REVIEWS_APP_KEY));
    const source = Array.isArray(stored?.reviews) ? stored.reviews : DEFAULT_APPROVED_REVIEWS;
    return source
      .map((review) => ({
        ...review,
        rating: Math.min(5, Math.max(1, Number(review.rating || 5))),
        status: review.status === "pending" ? "pending" : "approved"
      }))
      .filter((review) => review.status === "approved")
      .sort((a, b) => new Date(b.approvedAt || b.submittedAt || 0) - new Date(a.approvedAt || a.submittedAt || 0));
  } catch {
    return DEFAULT_APPROVED_REVIEWS;
  }
}

function renderApprovedReviews() {
  const container = document.querySelector("#all-review-list");
  const reviews = loadApprovedReviews();
  container.innerHTML = reviews.length ? reviews
    .map((review) => `
      <article class="review-card">
        <div class="review-stars">${Array(review.rating).fill("&#9733;").join("")}</div>
        <p>"${escapeHtml(review.quote)}"</p>
        <strong>${escapeHtml(review.name)}</strong>
      </article>
    `)
    .join("") : `<p class="form-note">Reviews will appear here after families share feedback.</p>`;

  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", renderApprovedReviews);
