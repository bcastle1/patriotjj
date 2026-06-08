const APP_KEY = "royceCastleRecruitingStudio.standalone.v1";
const contacts = Array.isArray(window.RECRUITING_CONTACTS) ? window.RECRUITING_CONTACTS : [];

const profileDefaults = {
  height: "6'5\"",
  vertical: "",
  position: "Shooting Guard",
  secondary: "Point Guard",
  grad: "2024",
  school: "Rigby High School",
  gpa: "3.7",
  fromEmail: "erik@puricloud.com",
  ccEmail: "",
  selectedContactId: new URLSearchParams(location.search).get("select") || "d1-byu-cougars",
  style:
    "Long combo guard with a strong jump shot, deep three-point range, post-up ability against smaller guards, and natural playmaking feel. Crashes the boards hard and can be trusted with the opponent's best perimeter scorer.",
  value:
    "Royce brings coachability, maturity, leadership, and a team-first approach. He earned a 3.7 high school GPA, served abroad in Ecuador for two years, learned fluent Spanish, grew through daily service and leadership, and carries high standards for health, academics, and personal conduct. He can help build locker-room culture on and off the court.",
  sent: {}
};

let state = loadState();

const refs = {
  height: document.querySelector("#height"),
  vertical: document.querySelector("#vertical"),
  position: document.querySelector("#position"),
  secondary: document.querySelector("#secondary"),
  grad: document.querySelector("#grad"),
  school: document.querySelector("#school"),
  gpa: document.querySelector("#gpa"),
  style: document.querySelector("#style"),
  value: document.querySelector("#value"),
  fromEmail: document.querySelector("#from-email"),
  ccEmail: document.querySelector("#cc-email"),
  selectedSchool: document.querySelector("#selected-school"),
  selectedMeta: document.querySelector("#selected-meta"),
  toEmail: document.querySelector("#to-email"),
  subject: document.querySelector("#subject"),
  emailBody: document.querySelector("#email-body"),
  queue: document.querySelector("#queue"),
  contactCount: document.querySelector("#contact-count"),
  songs: document.querySelector("#songs"),
  status: document.querySelector("#status"),
  toast: document.querySelector("#toast")
};

const songIdeas = [
  "Tweaker - Gelo",
  "Not Like Us - Kendrick Lamar",
  "FE!N - Travis Scott ft. Playboi Carti",
  "First Person Shooter - Drake ft. J. Cole",
  "Surround Sound - JID",
  "Family Ties - Baby Keem & Kendrick Lamar",
  "Just Wanna Rock - Lil Uzi Vert",
  "Ballin - Mustard ft. Roddy Ricch",
  "Win - Jay Rock",
  "Remember the Name - Fort Minor"
];

init();

function init() {
  hydrate();
  bind();
  ensureSelectedContact();
  render();
  if (window.lucide) window.lucide.createIcons();
  window.addEventListener("load", () => window.lucide?.createIcons());
}

function loadState() {
  try {
    return { ...profileDefaults, ...(JSON.parse(localStorage.getItem(APP_KEY) || "{}") || {}) };
  } catch {
    return { ...profileDefaults };
  }
}

function saveState() {
  localStorage.setItem(APP_KEY, JSON.stringify(state));
}

function hydrate() {
  ["height", "vertical", "position", "secondary", "grad", "school", "gpa", "style", "value", "fromEmail", "ccEmail"].forEach((key) => {
    refs[key].value = state[key] || "";
  });
}

function bind() {
  ["height", "vertical", "position", "secondary", "grad", "school", "gpa", "style", "value", "fromEmail", "ccEmail"].forEach((key) => {
    refs[key].addEventListener("input", () => {
      state[key] = refs[key].value;
      saveState();
      compose();
    });
  });

  document.querySelector("#next-school").addEventListener("click", nextSchool);
  document.querySelector("#copy-email").addEventListener("click", copyEmail);
  document.querySelector("#open-mail").addEventListener("click", openMail);
  document.querySelector("#mark-sent").addEventListener("click", markSent);
}

function ensureSelectedContact() {
  if (!contacts.some((contact) => contact.id === state.selectedContactId)) {
    state.selectedContactId = contacts.find((contact) => contact.id === "d1-byu-cougars")?.id || contacts[0]?.id || "";
  }
}

function currentContact() {
  return contacts.find((contact) => contact.id === state.selectedContactId) || contacts[0] || {};
}

function render() {
  renderQueue();
  renderSongs();
  compose();
}

function renderQueue() {
  const queue = contacts.filter((contact) => contact.group === "d1" && !state.sent[contact.id]).slice(0, 12);
  refs.contactCount.textContent = `${contacts.length.toLocaleString()} contacts`;
  refs.queue.innerHTML = queue
    .map(
      (contact) => `
        <button class="${contact.id === state.selectedContactId ? "selected" : ""}" data-contact="${escapeAttr(contact.id)}" type="button">
          <strong>${escapeHtml(contact.displayName || contact.school)}</strong>
          <span>${escapeHtml(contact.state || "")} | ${escapeHtml(contact.division || "")} | ${contactEmail(contact) || "verify email"}</span>
        </button>
      `
    )
    .join("");
  document.querySelectorAll("[data-contact]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedContactId = button.dataset.contact;
      saveState();
      render();
      location.hash = "#outreach";
    });
  });
}

function renderSongs() {
  refs.songs.innerHTML = songIdeas.map((song) => `<span>${escapeHtml(song)}</span>`).join("");
}

function compose() {
  const contact = currentContact();
  const email = contactEmail(contact);
  refs.selectedSchool.textContent = contact.displayName || contact.school || "Select a school";
  refs.selectedMeta.textContent = `${contact.mascot || "Mascot"} | ${contact.slogan || "Team slogan"} | ${contact.conference || contact.division || ""}`;
  refs.toEmail.value = email || "";
  refs.subject.value = `Royce Castle | ${state.height} ${state.position} | ${state.school} ${state.grad}`;
  refs.emailBody.value = buildEmail(contact);
}

function buildEmail(contact) {
  const coach = coachLastName(contact);
  const schoolName = contact.displayName || contact.school || "your program";
  return `Coach ${coach},

My name is Royce Castle. I am a ${state.height} ${state.position} / ${state.secondary} from ${state.school} in Idaho, class of ${state.grad}. I am reaching out because I am interested in the ${schoolName} men's basketball program and would be grateful for a chance to learn the best process for being evaluated by your staff.

On the court, I am a coachable, team-first guard who can stretch the floor with a jump shot and three-point shot, create for teammates, post smaller guards, rebound hard from the perimeter, and defend high-level assignments. In high school, opponents often game-planned their defense around limiting my scoring opportunities, and I was often asked to guard the other team's best player.

Academically, I carried a ${state.gpa || "3.7"} high school GPA. I have also spent the last two years serving abroad in Ecuador on a religious service mission. That experience helped me mature as a person and leader, taught me fluent Spanish, and strengthened my discipline, work ethic, and ability to put the team and mission ahead of myself. I do not use alcohol or drugs, take my health seriously, and would work to be a positive leader in the locker room and a strong representative of your program.

Would your staff prefer that I complete a questionnaire, send full game film, schedule a phone call, attend a tryout or camp, or continue the conversation by email? I am happy to provide references, academic information, stats, and additional video.

Thank you for your time and consideration.

Sincerely,
Royce Castle
${state.fromEmail}`;
}

function coachLastName(contact) {
  const name = contact.headCoach && !contact.headCoach.toLowerCase().includes("verify") ? contact.headCoach : contact.assistantCoach || "";
  return name && !name.toLowerCase().includes("verify") ? name.split(" ").slice(-1)[0] : "";
}

function contactEmail(contact) {
  return [contact.headEmail, contact.assistantEmail].filter(Boolean).join(", ");
}

async function copyEmail() {
  const text = `${refs.subject.value}\n\n${refs.emailBody.value}`;
  await navigator.clipboard.writeText(text);
  toast("Email copied.");
}

function openMail() {
  if (!refs.toEmail.value) {
    toast("This row needs a verified email first.");
    return;
  }
  const params = new URLSearchParams({
    cc: state.ccEmail || "",
    subject: refs.subject.value,
    body: refs.emailBody.value
  });
  location.href = `mailto:${refs.toEmail.value}?${params.toString()}`;
}

function markSent() {
  const contact = currentContact();
  if (!contact.id) return;
  state.sent[contact.id] = new Date().toISOString();
  saveState();
  toast(`Marked sent for ${contact.displayName || contact.school}.`);
  nextSchool();
}

function nextSchool() {
  const currentIndex = contacts.findIndex((contact) => contact.id === state.selectedContactId);
  const next = contacts.slice(currentIndex + 1).find((contact) => contact.group === "d1" && !state.sent[contact.id]) || contacts.find((contact) => contact.group === "d1" && !state.sent[contact.id]);
  if (next) {
    state.selectedContactId = next.id;
    saveState();
    render();
  }
}

function toast(message) {
  refs.status.textContent = message;
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => refs.toast.classList.remove("show"), 2200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
