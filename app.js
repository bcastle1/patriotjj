const APP_KEY = "patriotJjCampApp.v1";
const ADMIN_PASSWORD = "patriot";
const PROGRAM_NAME = "American Heritage Patriots Jiu-Jitsu";
const FLYER_TITLE = "AHS Patriots Jiu-Jitsu";
const STORE_MARK_TEXT = "AHS";
const STORE_ITEM_TEXT = "American Heritage Patriots Jiu-Jitsu";

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const refs = {
  publicVideo: $("#public-video"),
  flyerBackdrop: $("#flyer-backdrop"),
  flyerImage: $("#flyer-backdrop img"),
  publicFlyerLink: $("#public-flyer-link"),
  heroEmail: $("#hero-email"),
  eventList: $("#event-list"),
  eventDetail: $("#event-detail"),
  signupForm: $("#signup-form"),
  signupEvent: $("#signup-event"),
  signupTrack: $("#signup-track"),
  signupWaiverPreview: $("#signup-waiver-preview"),
  pricePreview: $("#price-preview"),
  storeGrid: $("#store-grid"),
  storeForm: $("#store-form"),
  storeItem: $("#store-item"),
  qaList: $("#qa-list"),
  reviewList: $("#review-list"),
  openReview: $("#open-review"),
  contactEmail: $("#contact-email"),
  contactSite: $("#contact-site"),
  contactVenmo: $("#contact-venmo"),
  adminLogin: $("#admin-login"),
  adminLoginForm: $("#admin-login-form"),
  adminApp: $("#admin-app"),
  adminLogout: $("#admin-logout"),
  adminMetrics: $("#admin-metrics"),
  participantSearch: $("#participant-search"),
  participantAgeFilter: $("#participant-age-filter"),
  participantEventFilter: $("#participant-event-filter"),
  participantPaymentFilter: $("#participant-payment-filter"),
  participantsTable: $("#participants-table"),
  participantDetail: $("#participant-detail"),
  paymentsTable: $("#payments-table"),
  eventEditor: $("#event-editor"),
  addEvent: $("#add-event"),
  storeEditor: $("#store-editor"),
  addStoreItem: $("#add-store-item"),
  storeOrdersTable: $("#store-orders-table"),
  heroVideoUrl: $("#hero-video-url"),
  videoUpload: $("#video-upload"),
  videoTitle: $("#video-title"),
  videoCaption: $("#video-caption"),
  saveVideoSettings: $("#save-video-settings"),
  editVideoSource: $("#edit-video-source"),
  editMusicSource: $("#edit-music-source"),
  editTitle: $("#edit-title"),
  buildEditPlan: $("#build-edit-plan"),
  editPlan: $("#edit-plan"),
  photoUpload: $("#photo-upload"),
  musicUpload: $("#music-upload"),
  mediaLibrary: $("#media-library"),
  flyerLibrary: $("#flyer-library"),
  flyerEditor: $("#flyer-editor"),
  addFlyer: $("#add-flyer"),
  songGrid: $("#song-grid"),
  settingsForm: $("#settings-form"),
  waiverTemplateForm: $("#waiver-template-form"),
  faqEditor: $("#faq-editor"),
  addFaq: $("#add-faq"),
  reviewEditor: $("#review-editor"),
  exportParticipants: $("#export-participants"),
  paymentModal: $("#payment-modal"),
  paymentTitle: $("#payment-title"),
  paymentSummary: $("#payment-summary"),
  venmoPayLink: $("#venmo-pay-link"),
  recordPayment: $("#record-payment"),
  printCurrentWaiver: $("#print-current-waiver"),
  waiverModal: $("#waiver-modal"),
  waiverModalTitle: $("#waiver-modal-title"),
  waiverModalContent: $("#waiver-modal-content"),
  printWaiver: $("#print-waiver"),
  reviewModal: $("#review-modal"),
  reviewForm: $("#review-form"),
  toast: $("#toast")
};

let state = loadState();
let selectedEventId = state.events[0]?.id || "";
let selectedParticipantId = state.participants[0]?.id || "";
let pendingCheckout = null;
const sessionMedia = new Map();

function seedState() {
  return {
    settings: {
      contactEmail: "info@patriotjj.com",
      phone: "",
      website: "https://www.patriotjj.com",
      venmoHandle: "bcastle1",
      publicVideoUrl: "",
      publicVideoTitle: `${PROGRAM_NAME} Summer Camps`,
      publicVideoCaption: "Hybrid martial arts, student wellness, self-defense, and leadership.",
      waiverTitle: `${PROGRAM_NAME} Participation Waiver and Release`,
      waiverBody:
        `I request that {participantName} be allowed to participate in ${PROGRAM_NAME} camp, class, self-defense, fitness, and related activities. I understand that martial arts and physical training involve inherent risks, including falls, contact, grappling, takedowns, exercise, games, equipment use, illness exposure, bruises, sprains, strains, cuts, concussion, broken bones, serious injury, property loss, or other harm.\n\nI certify that the participant is physically able to participate, will follow instructor directions, and will stop and notify an instructor if they feel unsafe or injured. I authorize reasonable first aid and emergency care if needed and understand that I am responsible for medical costs.\n\nTo the fullest extent permitted by law, I voluntarily assume the risks of participation and release, waive, and hold harmless ${PROGRAM_NAME}, its owners, instructors, volunteers, hosts, facilities, and affiliates from claims arising from ordinary negligence related to participation, except where not allowed by law. If signing for a minor, I certify that I am the parent or legal guardian, or am otherwise authorized to sign.\n\nI understand this is an electronic record. By typing my name and submitting this form, I intend to electronically sign this waiver for {eventTitle}, {trackLabel}.`
    },
    events: [
      {
        id: "session-1",
        title: "Session 1",
        dateLine: "June 15, 16, 17",
        dayLine: "Monday, Tuesday, Wednesday",
        venue: "American Heritage Schools, American Fork",
        description: "Three-day camp focused on practical Jiu-Jitsu, student wellness, self-defense, and leadership.",
        active: true,
        tracks: [
          { id: "youth", label: "1st-6th Grade", time: "1:00 - 3:00 PM", price: 150 },
          { id: "teen", label: "7th-12th Grade", time: "4:00 - 6:30 PM", price: 200 }
        ]
      },
      {
        id: "session-2",
        title: "Session 2",
        dateLine: "July 20, 21, 22",
        dayLine: "Monday, Tuesday, Wednesday",
        venue: "American Heritage Schools, American Fork",
        description: "A second three-day camp with the same age tracks and a fresh set of drills, games, and leadership reps.",
        active: true,
        tracks: [
          { id: "youth", label: "1st-6th Grade", time: "1:00 - 3:00 PM", price: 150 },
          { id: "teen", label: "7th-12th Grade", time: "4:00 - 6:30 PM", price: 200 }
        ]
      },
      {
        id: "both-sessions",
        title: "Both Sessions Discount",
        dateLine: "June 15-17 and July 20-22",
        dayLine: "Six total camp days",
        venue: "American Heritage Schools, American Fork",
        description: "Register once for both summer sessions and apply the flyer discount.",
        active: true,
        tracks: [
          { id: "youth", label: "1st-6th Grade", time: "1:00 - 3:00 PM", price: 250 },
          { id: "teen", label: "7th-12th Grade", time: "4:00 - 6:30 PM", price: 350 }
        ]
      }
    ],
    participants: [
      {
        id: "participant-avery",
        firstName: "Avery",
        lastName: "Morgan",
        age: 12,
        gender: "Female",
        guardianName: "Jordan Morgan",
        address: "American Fork, UT",
        email: "avery.family@example.com",
        phone: "(801) 555-0147",
        eventId: "session-1",
        trackId: "youth",
        notes: "Beginner. Excited about self-defense.",
        signedUpAt: "2026-05-26T09:30:00.000Z"
      },
      {
        id: "participant-luke",
        firstName: "Luke",
        lastName: "Ellis",
        age: 16,
        gender: "Male",
        guardianName: "Mara Ellis",
        address: "Lehi, UT",
        email: "ellis.family@example.com",
        phone: "(385) 555-0192",
        eventId: "both-sessions",
        trackId: "teen",
        notes: "Wrestling background.",
        signedUpAt: "2026-05-26T10:00:00.000Z"
      }
    ],
    payments: [
      {
        id: "payment-avery",
        participantId: "participant-avery",
        orderId: "",
        date: "2026-05-26T09:36:00.000Z",
        amount: 150,
        memo: `${PROGRAM_NAME} - Session 1 - Avery Morgan`,
        method: "Venmo",
        status: "paid",
        receiptSent: true
      },
      {
        id: "payment-luke",
        participantId: "participant-luke",
        orderId: "",
        date: "2026-05-26T10:02:00.000Z",
        amount: 350,
        memo: `${PROGRAM_NAME} - Both Sessions Discount - Luke Ellis`,
        method: "Venmo",
        status: "pending",
        receiptSent: false
      }
    ],
    storeItems: [
      {
        id: "shirt-camp",
        name: "Camp T-shirt",
        category: "Shirt",
        price: 22,
        active: true,
        description: "American Heritage Patriots Jiu-Jitsu navy camp shirt.",
        productColor: "#071d49",
        logoText: STORE_MARK_TEXT,
        slogan: STORE_ITEM_TEXT,
        imageUrl: "",
        imageSource: "Generated mockup"
      },
      {
        id: "rashguard",
        name: "Training Rash Guard",
        category: "Training",
        price: 42,
        active: true,
        description: "Lightweight short-sleeve rash guard.",
        productColor: "#d71920",
        logoText: "PATRIOTS",
        slogan: STORE_ITEM_TEXT,
        imageUrl: "",
        imageSource: "Generated mockup"
      },
      {
        id: "hoodie",
        name: "Patriot Hoodie",
        category: "Outerwear",
        price: 48,
        active: true,
        description: "Red, white, and navy pullover hoodie.",
        productColor: "#0d3f88",
        logoText: STORE_MARK_TEXT,
        slogan: STORE_ITEM_TEXT,
        imageUrl: "",
        imageSource: "Generated mockup"
      },
      {
        id: "hat",
        name: "Shield Hat",
        category: "Accessory",
        price: 24,
        active: true,
        description: "Structured cap with American Heritage Patriots Jiu-Jitsu mark.",
        productColor: "#071d49",
        logoText: STORE_MARK_TEXT,
        slogan: "American Fork Patriots",
        imageUrl: "",
        imageSource: "Generated mockup"
      }
    ],
    storeOrders: [],
    faqs: [
      {
        id: "faq-experience",
        question: "Does my child need prior martial arts experience?",
        answer: "No. The camp is built for beginners and experienced students. Instructors scale drills by age, size, and confidence level."
      },
      {
        id: "faq-bring",
        question: "What should students bring?",
        answer: "Comfortable athletic clothes, water, and a respectful attitude. The first day includes the camp T-shirt listed on the flyer."
      },
      {
        id: "faq-clothing",
        question: "What should students wear?",
        answer: "Sweatpants are recommended for mat work because they provide better leg coverage, but athletic shorts can be worn if they are comfortable and allow safe movement."
      },
      {
        id: "faq-safety",
        question: "How is sparring handled?",
        answer: "The camp emphasizes control, safety, and practical skill. Contact is supervised, age-appropriate, and focused on learning."
      },
      {
        id: "faq-payment",
        question: "How do Venmo payments work?",
        answer: `Use @bcastle1 and include ${PROGRAM_NAME} plus the session name in the memo. The app records the payment entry for admin review.`
      }
    ],
    reviews: [
      { id: "review-1", name: "Parent of 5th grader", rating: 5, quote: "Our son left more confident and could explain what he learned without acting reckless." },
      { id: "review-2", name: "AHS family", rating: 5, quote: "The leadership and character pieces made it feel like more than just a sports camp." },
      { id: "review-3", name: "Middle school student", rating: 5, quote: "The instructors made hard skills feel understandable and fun." }
    ],
    songs: [
      { id: "song-01", title: "Courage Cadence", mood: "Clean march beat", bpm: 96, active: true },
      { id: "song-02", title: "Shield Line", mood: "Heroic drums", bpm: 104, active: true },
      { id: "song-03", title: "Mat Focus", mood: "Low training groove", bpm: 88, active: true },
      { id: "song-04", title: "Red Corner Rise", mood: "Upbeat sports edit", bpm: 118, active: true },
      { id: "song-05", title: "Discipline Drive", mood: "Modern motivational", bpm: 110, active: true },
      { id: "song-06", title: "Stars and Steps", mood: "Bright percussion", bpm: 101, active: true },
      { id: "song-07", title: "Guard Pass", mood: "Focused hip-hop instrumental", bpm: 92, active: true },
      { id: "song-08", title: "Leadership Round", mood: "Warm cinematic", bpm: 82, active: true },
      { id: "song-09", title: "Sweep Timing", mood: "Quick cuts", bpm: 124, active: true },
      { id: "song-10", title: "Blue Banner", mood: "Anthemic", bpm: 100, active: true },
      { id: "song-11", title: "Confidence Drill", mood: "Family friendly pop", bpm: 116, active: true },
      { id: "song-12", title: "Resolve", mood: "Cinematic build", bpm: 78, active: true },
      { id: "song-13", title: "Side Control", mood: "Tense training bed", bpm: 90, active: true },
      { id: "song-14", title: "Final Bell", mood: "Certificate ceremony", bpm: 84, active: true },
      { id: "song-15", title: "Team Bow", mood: "Respectful close", bpm: 74, active: true },
      { id: "song-16", title: "First Rep", mood: "Youth camp energy", bpm: 112, active: true },
      { id: "song-17", title: "Calm Under Pressure", mood: "Measured pulse", bpm: 86, active: true },
      { id: "song-18", title: "Takedown Tempo", mood: "Fast action", bpm: 128, active: true },
      { id: "song-19", title: "Soul and Strength", mood: "Inspirational", bpm: 94, active: true },
      { id: "song-20", title: "Patriot Finish", mood: "Big ending", bpm: 108, active: true }
    ],
    media: {
      photos: [{ id: "photo-flyer", name: `${PROGRAM_NAME} flyer`, url: "assets/patriot-jj-flyer.png", type: "image/png", bundled: true }],
      flyers: [
        {
          id: "flyer-original",
          name: `Original ${PROGRAM_NAME} Summer Camp Flyer`,
          type: "flyer",
          imageUrl: "assets/patriot-jj-flyer.png",
          imageSource: "Uploaded original flyer",
          active: true,
          title: FLYER_TITLE,
          subtitle: "3-Day Summer Camps at American Heritage Schools",
          focusLine: "Hybrid Martial Arts • Student Wellness • Self-Defense • Leadership",
          datesLine: "Session 1: June 15, 16, 17 | Session 2: July 20, 21, 22",
          scheduleLine: "1st-6th Grade 1:00-3:00 PM | 7th-12th Grade 4:00-6:30 PM",
          priceLine: "$150 youth / $200 teen per session • both-session discounts available",
          bullets: [
            "Practical Jiu-Jitsu and self-defense",
            "Takedowns, sweeps, mount, guard, and side control",
            "Confidence, discipline, focus, and leadership",
            "Bullying prevention and situational awareness"
          ],
          footer: "patriotjj.com • Venmo @bcastle1"
        }
      ],
      videos: [],
      music: []
    }
  };
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(APP_KEY));
    return mergeState(seedState(), stored || {});
  } catch {
    return seedState();
  }
}

function mergeState(base, incoming) {
  return {
    ...base,
    ...incoming,
    settings: normalizeSettings({ ...base.settings, ...(incoming.settings || {}) }),
    storeItems: (incoming.storeItems || base.storeItems).map(normalizeStoreItem),
    faqs: mergeDefaultRows(base.faqs, incoming.faqs),
    media: {
      photos: incoming.media?.photos || base.media.photos,
      flyers: (incoming.media?.flyers || base.media.flyers).map(normalizeFlyer),
      videos: incoming.media?.videos || base.media.videos,
      music: incoming.media?.music || base.media.music
    }
  };
}

function mergeDefaultRows(defaultRows, incomingRows) {
  if (!Array.isArray(incomingRows) || !incomingRows.length) return defaultRows;
  const incomingIds = new Set(incomingRows.map((row) => row.id));
  return [
    ...incomingRows,
    ...defaultRows.filter((row) => !incomingIds.has(row.id))
  ];
}

function normalizeSettings(settings) {
  const normalized = { ...settings };
  if (normalized.publicVideoTitle === "Patriot Jiu Jitsu Summer Camps") {
    normalized.publicVideoTitle = `${PROGRAM_NAME} Summer Camps`;
  }
  if (normalized.waiverTitle === "Patriot Jiu Jitsu Participation Waiver and Release") {
    normalized.waiverTitle = `${PROGRAM_NAME} Participation Waiver and Release`;
  }
  if (typeof normalized.waiverBody === "string") {
    normalized.waiverBody = normalized.waiverBody.replaceAll("Patriot Jiu Jitsu", PROGRAM_NAME);
  }
  return normalized;
}

function normalizeStoreItem(item) {
  const base = {
    id: makeId("item"),
    name: "Team Item",
    category: "Shirt",
    price: 0,
    active: true,
    description: "",
    productColor: "#071d49",
    logoText: STORE_MARK_TEXT,
    slogan: STORE_ITEM_TEXT,
    imageUrl: "",
    imageSource: "Generated mockup"
  };
  const normalized = { ...base, ...item };
  if (normalized.logoText === "PJ") normalized.logoText = STORE_MARK_TEXT;
  if (["Patriot Jiu Jitsu", "Heart Might Mind", "Jiu Jitsu"].includes(normalized.slogan)) {
    normalized.slogan = normalized.id === "hat" ? "American Fork Patriots" : STORE_ITEM_TEXT;
  }
  if (normalized.description === "Patriot JJ navy camp shirt.") {
    normalized.description = "American Heritage Patriots Jiu-Jitsu navy camp shirt.";
  }
  if (normalized.description === "Structured cap with Patriot JJ shield.") {
    normalized.description = "Structured cap with American Heritage Patriots Jiu-Jitsu mark.";
  }
  return normalized;
}

function normalizeFlyer(item) {
  const base = {
    id: makeId("flyer"),
    name: `${PROGRAM_NAME} Flyer`,
    type: "flyer",
    imageUrl: "",
    imageSource: "Generated flyer",
    active: false,
    title: FLYER_TITLE,
    subtitle: "3-Day Summer Camps at American Heritage Schools",
    focusLine: "Hybrid Martial Arts • Student Wellness • Self-Defense • Leadership",
    datesLine: "Add dates",
    scheduleLine: "Add schedule",
    priceLine: "Add pricing",
    bullets: [],
    footer: "patriotjj.com • Venmo @bcastle1"
  };
  const normalized = { ...base, ...item };
  if (typeof normalized.bullets === "string") {
    normalized.bullets = normalized.bullets.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return normalized;
}

function saveState() {
  localStorage.setItem(APP_KEY, JSON.stringify(state));
  postHeight();
}

function init() {
  if (new URLSearchParams(window.location.search).get("embed") === "1") {
    document.body.classList.add("embed-mode");
  }

  bindEvents();
  renderAll();
  applyPublicSettings();
  refreshIcons();
  postHeight();
}

function bindEvents() {
  refs.eventList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-event-id]");
    if (!card) return;
    selectedEventId = card.dataset.eventId;
    renderEvents();
    renderEventDetail();
  });

  refs.signupEvent.addEventListener("change", () => {
    selectedEventId = refs.signupEvent.value;
    renderTrackOptions();
    updateSignupPrice();
    renderSignupWaiverPreview();
    renderEvents();
    renderEventDetail();
  });
  refs.signupTrack.addEventListener("change", () => {
    updateSignupPrice();
    renderSignupWaiverPreview();
  });
  refs.signupForm.addEventListener("input", (event) => {
    if (["firstName", "lastName", "waiverSignerName"].includes(event.target.name)) {
      renderSignupWaiverPreview();
    }
  });
  refs.signupForm.addEventListener("submit", handleSignup);
  refs.storeForm.addEventListener("submit", handleStoreOrder);
  refs.openReview.addEventListener("click", () => refs.reviewModal.showModal());
  refs.reviewForm.addEventListener("submit", handleReviewSubmit);
  refs.adminLoginForm.addEventListener("submit", handleAdminLogin);
  refs.adminLogout.addEventListener("click", () => {
    sessionStorage.removeItem("patriotJjAdmin");
    renderAdminGate();
  });
  refs.exportParticipants.addEventListener("click", exportParticipantsCsv);
  refs.participantSearch.addEventListener("input", renderParticipants);
  refs.participantAgeFilter.addEventListener("change", renderParticipants);
  refs.participantEventFilter.addEventListener("change", renderParticipants);
  refs.participantPaymentFilter.addEventListener("change", renderParticipants);
  refs.participantsTable.addEventListener("click", (event) => {
    const waiverButton = event.target.closest("[data-view-waiver]");
    if (waiverButton) {
      event.stopPropagation();
      openWaiverModal(waiverButton.dataset.viewWaiver);
      return;
    }
    const row = event.target.closest("[data-participant-id]");
    if (!row) return;
    selectedParticipantId = row.dataset.participantId;
    renderParticipantDetail();
  });
  refs.paymentsTable.addEventListener("click", handlePaymentTableClick);
  refs.addEvent.addEventListener("click", addEvent);
  refs.addStoreItem.addEventListener("click", addStoreItem);
  refs.addFlyer.addEventListener("click", addFlyer);
  refs.saveVideoSettings.addEventListener("click", saveVideoSettings);
  refs.videoUpload.addEventListener("change", handleVideoUpload);
  refs.photoUpload.addEventListener("change", handlePhotoUpload);
  refs.musicUpload.addEventListener("change", handleMusicUpload);
  refs.buildEditPlan.addEventListener("click", buildEditPlan);
  refs.settingsForm.addEventListener("submit", handleSettingsSave);
  refs.waiverTemplateForm.addEventListener("submit", handleWaiverTemplateSave);
  refs.addFaq.addEventListener("click", addFaq);
  refs.recordPayment.addEventListener("click", recordPendingPayment);
  refs.printCurrentWaiver.addEventListener("click", () => {
    if (pendingCheckout?.participantId) printSignedWaiver(pendingCheckout.participantId);
  });
  refs.printWaiver.addEventListener("click", () => {
    if (refs.printWaiver.dataset.participantId) printSignedWaiver(refs.printWaiver.dataset.participantId);
  });

  $$("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", () => switchAdminTab(button.dataset.adminTab));
  });

  $$("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
}

function renderAll() {
  renderEvents();
  renderEventDetail();
  renderSignupOptions();
  renderSignupWaiverPreview();
  renderStore();
  renderFaqs();
  renderReviews();
  renderAdminGate();
}

function applyPublicSettings() {
  const emailHref = `mailto:${state.settings.contactEmail}?subject=${encodeURIComponent(`${PROGRAM_NAME} question`)}`;
  refs.heroEmail.href = emailHref;
  refs.contactEmail.href = emailHref;
  refs.contactSite.href = state.settings.website || "https://www.patriotjj.com";
  refs.contactVenmo.href = venmoProfileUrl();
  refs.contactVenmo.innerHTML = `<i data-lucide="badge-dollar-sign"></i>Venmo @${escapeHtml(cleanVenmoHandle())}`;
  const activeFlyer = getActiveFlyer();
  if (refs.flyerImage && activeFlyer) {
    refs.flyerImage.src = flyerImageUrl(activeFlyer);
    refs.flyerImage.alt = `${activeFlyer.name} flyer`;
  }
  if (refs.publicFlyerLink && activeFlyer) {
    refs.publicFlyerLink.href = flyerImageUrl(activeFlyer);
  }

  if (state.settings.publicVideoUrl) {
    refs.publicVideo.src = state.settings.publicVideoUrl;
    if (activeFlyer) refs.publicVideo.poster = flyerImageUrl(activeFlyer);
    refs.publicVideo.classList.remove("hidden");
  } else {
    refs.publicVideo.removeAttribute("src");
    refs.publicVideo.load();
  }
}

function renderEvents() {
  const activeEvents = state.events.filter((event) => event.active);
  if (!activeEvents.some((event) => event.id === selectedEventId) && activeEvents[0]) {
    selectedEventId = activeEvents[0].id;
  }

  refs.eventList.innerHTML = activeEvents
    .map((event) => `
      <button class="event-card ${event.id === selectedEventId ? "active" : ""}" type="button" data-event-id="${event.id}">
        <span class="event-date"><i data-lucide="calendar"></i>${escapeHtml(event.dateLine)}</span>
        <h3>${escapeHtml(event.title)}</h3>
        <p>${escapeHtml(event.description)}</p>
        ${event.tracks.map((track) => `
          <div class="track-row">
            <span><strong>${escapeHtml(track.label)}</strong><br>${escapeHtml(track.time)}</span>
            <strong>$${Number(track.price || 0)}</strong>
          </div>
        `).join("")}
      </button>
    `)
    .join("");
  refreshIcons();
}

function renderEventDetail() {
  const event = getSelectedEvent();
  if (!event) {
    refs.eventDetail.innerHTML = "<p>No active sessions are available.</p>";
    return;
  }

  refs.eventDetail.innerHTML = `
    <p class="eyebrow">Selected camp</p>
    <h2>${escapeHtml(event.title)}</h2>
    <p><strong>${escapeHtml(event.dateLine)}</strong><br>${escapeHtml(event.dayLine)}</p>
    <p>${escapeHtml(event.venue)}</p>
    <div class="price-band">
      ${event.tracks.map((track) => `
        <span><strong>$${Number(track.price || 0)}</strong>${escapeHtml(track.label)}<br>${escapeHtml(track.time)}</span>
      `).join("")}
    </div>
    <div class="button-row">
      <a class="primary-button" href="#signup" data-select-event="${event.id}">
        <i data-lucide="user-plus"></i>
        Register for ${escapeHtml(event.title)}
      </a>
      <a class="ghost-button" href="${venmoProfileUrl()}" target="_blank" rel="noreferrer">
        <i data-lucide="badge-dollar-sign"></i>
        Open Venmo
      </a>
    </div>
  `;

  const selectLink = refs.eventDetail.querySelector("[data-select-event]");
  selectLink.addEventListener("click", () => {
    refs.signupEvent.value = event.id;
    selectedEventId = event.id;
    renderTrackOptions();
    updateSignupPrice();
  });
  refreshIcons();
}

function renderSignupOptions() {
  refs.signupEvent.innerHTML = state.events
    .filter((event) => event.active)
    .map((event) => `<option value="${event.id}">${escapeHtml(event.title)} - ${escapeHtml(event.dateLine)}</option>`)
    .join("");
  refs.signupEvent.value = selectedEventId;
  renderTrackOptions();
  renderParticipantEventFilter();
  updateSignupPrice();
  renderSignupWaiverPreview();
}

function renderTrackOptions() {
  const event = getSelectedEvent();
  refs.signupTrack.innerHTML = (event?.tracks || [])
    .map((track) => `<option value="${track.id}">${escapeHtml(track.label)} - ${escapeHtml(track.time)} - $${Number(track.price || 0)}</option>`)
    .join("");
}

function updateSignupPrice() {
  const event = state.events.find((item) => item.id === refs.signupEvent.value);
  const track = event?.tracks.find((item) => item.id === refs.signupTrack.value) || event?.tracks[0];
  refs.pricePreview.textContent = `$${Number(track?.price || 0)} due`;
}

function renderSignupWaiverPreview() {
  if (!refs.signupWaiverPreview) return;
  const participantName = [refs.signupForm.elements.firstName?.value, refs.signupForm.elements.lastName?.value]
    .filter(Boolean)
    .join(" ") || "the participant";
  const previewData = {
    participantName,
    signerName: refs.signupForm.elements.waiverSignerName?.value || "the signer",
    eventTitle: eventTitle(refs.signupEvent.value),
    trackLabel: trackLabel(refs.signupEvent.value, refs.signupTrack.value),
    signedDate: "date of signature"
  };
  refs.signupWaiverPreview.innerHTML = renderWaiverText(state.settings.waiverBody, previewData)
    .split("\n\n")
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(refs.signupForm);
  const age = Number(formData.get("age"));
  const guardianName = String(formData.get("guardianName") || "").trim();
  const signerName = clean(formData.get("waiverSignerName"));
  const signerRole = clean(formData.get("waiverSignerRole"));
  const signature = clean(formData.get("waiverSignature"));
  if (age < 18 && !guardianName) {
    toast("Guardian name is required for minors.");
    refs.signupForm.elements.guardianName.focus();
    return;
  }
  if (age < 18 && signerRole === "Self") {
    toast("A parent or legal guardian must sign for minors.");
    refs.signupForm.elements.waiverSignerRole.focus();
    return;
  }
  if (signature.toLowerCase() !== signerName.toLowerCase()) {
    toast("The electronic signature must match the signer name.");
    refs.signupForm.elements.waiverSignature.focus();
    return;
  }

  const participant = {
    id: makeId("participant"),
    firstName: clean(formData.get("firstName")),
    lastName: clean(formData.get("lastName")),
    age,
    gender: clean(formData.get("gender")),
    guardianName,
    address: clean(formData.get("address")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    eventId: clean(formData.get("eventId")),
    trackId: clean(formData.get("trackId")),
    notes: clean(formData.get("notes")),
    signedUpAt: new Date().toISOString()
  };
  participant.waiver = createSignedWaiver(participant, {
    signerName,
    signerRole,
    electronicConsent: formData.get("waiverElectronicConsent") === "on",
    agreement: formData.get("waiverAgreement") === "on"
  });

  const amount = priceFor(participant.eventId, participant.trackId);
  const payment = {
    id: makeId("payment"),
    participantId: participant.id,
    orderId: "",
    date: new Date().toISOString(),
    amount,
    memo: paymentMemo(participant),
    method: "Venmo",
    status: "pending",
    receiptSent: false
  };

  state.participants.unshift(participant);
  state.payments.unshift(payment);
  selectedParticipantId = participant.id;
  saveState();
  renderAdmin();
  openPaymentModal({ type: "participant", participantId: participant.id, paymentId: payment.id });
  refs.signupForm.reset();
  refs.signupEvent.value = selectedEventId;
  renderTrackOptions();
  updateSignupPrice();
  renderSignupWaiverPreview();
  toast("Signup saved. Venmo checkout is ready.");
}

function openPaymentModal(checkout) {
  pendingCheckout = checkout;
  const payment = state.payments.find((item) => item.id === checkout.paymentId);
  const participant = payment?.participantId ? state.participants.find((item) => item.id === payment.participantId) : null;
  const order = payment?.orderId ? state.storeOrders.find((item) => item.id === payment.orderId) : null;
  const title = participant ? fullName(participant) : order ? `Store order ${order.itemName}` : "Payment";
  refs.paymentTitle.textContent = `Complete payment for ${title}.`;
  refs.paymentSummary.innerHTML = `
    <div class="payment-row"><span>Amount</span><strong>$${Number(payment?.amount || 0).toFixed(2)}</strong></div>
    <div class="payment-row"><span>Venmo</span><strong>@${escapeHtml(cleanVenmoHandle())}</strong></div>
    <div class="payment-row"><span>Memo</span><strong>${escapeHtml(payment?.memo || "")}</strong></div>
    <div class="payment-row"><span>Status</span><span class="status-pill ${payment?.status || "pending"}">${escapeHtml(payment?.status || "pending")}</span></div>
  `;
  refs.venmoPayLink.href = venmoPayUrl(payment);
  refs.printCurrentWaiver.classList.toggle("hidden", !participant?.waiver);
  refs.printCurrentWaiver.dataset.participantId = participant?.id || "";
  refs.paymentModal.showModal();
  refreshIcons();
}

function recordPendingPayment() {
  if (!pendingCheckout) return;
  const payment = state.payments.find((item) => item.id === pendingCheckout.paymentId);
  if (!payment) return;
  payment.status = "paid";
  payment.receiptSent = true;
  payment.date = new Date().toISOString();
  saveState();
  renderAll();
  refs.paymentModal.close();
  toast("Payment marked paid and receipt recorded.");
}

function handleStoreOrder(event) {
  event.preventDefault();
  const formData = new FormData(refs.storeForm);
  const item = state.storeItems.find((storeItem) => storeItem.id === formData.get("itemId"));
  if (!item) return;
  const quantity = Number(formData.get("quantity") || 1);
  const order = {
    id: makeId("order"),
    itemId: item.id,
    itemName: item.name,
    fit: clean(formData.get("fit")),
    size: clean(formData.get("size")),
    quantity,
    email: clean(formData.get("email")),
    total: Number(item.price || 0) * quantity,
    createdAt: new Date().toISOString()
  };
  const payment = {
    id: makeId("payment"),
    participantId: "",
    orderId: order.id,
    date: new Date().toISOString(),
    amount: order.total,
    memo: `${PROGRAM_NAME} Team Store - ${order.itemName} - ${order.fit} ${order.size}`,
    method: "Venmo",
    status: "pending",
    receiptSent: false
  };
  state.storeOrders.unshift(order);
  state.payments.unshift(payment);
  saveState();
  renderAdmin();
  openPaymentModal({ type: "store", orderId: order.id, paymentId: payment.id });
  refs.storeForm.reset();
  renderStoreOptions();
  toast("Store order saved. Venmo checkout is ready.");
}

function renderStore() {
  const activeItems = state.storeItems.filter((item) => item.active);
  refs.storeGrid.innerHTML = activeItems
    .map((item) => `
      <article class="store-card">
        <figure class="store-visual">
          <img class="store-image" src="${escapeAttr(itemImageUrl(item))}" alt="${escapeAttr(item.name)} product mockup">
        </figure>
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </div>
        <div class="store-design">
          <span>${escapeHtml(item.logoText || STORE_MARK_TEXT)}</span>
          <span>${escapeHtml(item.slogan || STORE_ITEM_TEXT)}</span>
        </div>
        <span class="store-price">$${Number(item.price || 0).toFixed(2)}</span>
      </article>
    `)
    .join("");
  renderStoreOptions();
  refreshIcons();
}

function renderStoreOptions() {
  refs.storeItem.innerHTML = state.storeItems
    .filter((item) => item.active)
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)} - $${Number(item.price || 0).toFixed(2)}</option>`)
    .join("");
}

function renderFaqs() {
  refs.qaList.innerHTML = state.faqs
    .map((faq, index) => `
      <article class="qa-item ${index === 0 ? "open" : ""}">
        <button class="qa-question" type="button">
          ${escapeHtml(faq.question)}
          <i data-lucide="chevron-down"></i>
        </button>
        <p class="qa-answer">${escapeHtml(faq.answer)}</p>
      </article>
    `)
    .join("");
  $$(".qa-question", refs.qaList).forEach((button) => {
    button.addEventListener("click", () => button.closest(".qa-item").classList.toggle("open"));
  });
  refreshIcons();
}

function renderReviews() {
  refs.reviewList.innerHTML = state.reviews
    .map((review) => `
      <article class="review-card">
        <div class="review-stars">${"★".repeat(Number(review.rating || 5))}</div>
        <p>"${escapeHtml(review.quote)}"</p>
        <strong>${escapeHtml(review.name)}</strong>
      </article>
    `)
    .join("");
}

function handleReviewSubmit(event) {
  event.preventDefault();
  const formData = new FormData(refs.reviewForm);
  state.reviews.unshift({
    id: makeId("review"),
    name: clean(formData.get("name")),
    rating: Number(formData.get("rating") || 5),
    quote: clean(formData.get("quote"))
  });
  saveState();
  refs.reviewForm.reset();
  refs.reviewModal.close();
  renderReviews();
  renderReviewEditor();
  toast("Review added.");
}

function renderAdminGate() {
  const isAuthed = sessionStorage.getItem("patriotJjAdmin") === "true";
  refs.adminLogin.classList.toggle("hidden", isAuthed);
  refs.adminApp.classList.toggle("hidden", !isAuthed);
  if (isAuthed) renderAdmin();
}

function handleAdminLogin(event) {
  event.preventDefault();
  const password = refs.adminLoginForm.elements.password.value;
  if (password !== ADMIN_PASSWORD) {
    toast("Incorrect admin password.");
    return;
  }
  sessionStorage.setItem("patriotJjAdmin", "true");
  refs.adminLoginForm.reset();
  renderAdminGate();
  toast("Admin dashboard unlocked.");
}

function renderAdmin() {
  renderAdminMetrics();
  renderParticipantEventFilter();
  renderParticipants();
  renderPayments();
  renderEventEditor();
  renderStoreEditor();
  renderStoreOrders();
  renderMediaAdmin();
  renderSettingsForm();
  renderWaiverTemplateForm();
  renderFaqEditor();
  renderReviewEditor();
  refreshIcons();
}

function renderAdminMetrics() {
  const paid = state.payments.filter((payment) => payment.status === "paid");
  const revenue = paid.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const pending = state.payments.filter((payment) => payment.status !== "paid").length;
  refs.adminMetrics.innerHTML = `
    <span><strong>${state.participants.length}</strong>Participants</span>
    <span><strong>$${revenue.toFixed(0)}</strong>Paid revenue</span>
    <span><strong>${pending}</strong>Pending payments</span>
    <span><strong>${state.storeOrders.length}</strong>Store orders</span>
  `;
}

function renderParticipantEventFilter() {
  refs.participantEventFilter.innerHTML = `<option value="all">All sessions</option>${state.events
    .map((event) => `<option value="${event.id}">${escapeHtml(event.title)}</option>`)
    .join("")}`;
}

function renderParticipants() {
  const query = refs.participantSearch.value.toLowerCase().trim();
  const ageFilter = refs.participantAgeFilter.value;
  const eventFilter = refs.participantEventFilter.value;
  const paymentFilter = refs.participantPaymentFilter.value;
  const rows = state.participants.filter((participant) => {
    const searchable = [
      fullName(participant),
      participant.email,
      participant.phone,
      participant.guardianName,
      participant.address
    ].join(" ").toLowerCase();
    const paymentState = participantPaymentState(participant.id);
    return (
      (!query || searchable.includes(query)) &&
      (ageFilter === "all" || (ageFilter === "minor" ? participant.age < 18 : participant.age >= 18)) &&
      (eventFilter === "all" || participant.eventId === eventFilter) &&
      (paymentFilter === "all" || paymentState === paymentFilter)
    );
  });

  refs.participantsTable.innerHTML = rows
    .map((participant) => {
      const event = state.events.find((item) => item.id === participant.eventId);
      const paymentState = participantPaymentState(participant.id);
      return `
        <tr class="clickable-row" data-participant-id="${participant.id}">
          <td><strong>${escapeHtml(fullName(participant))}</strong><br>${escapeHtml(participant.email)}</td>
          <td>${Number(participant.age || 0)}</td>
          <td>${escapeHtml(event?.title || "Unknown")}<br>${escapeHtml(trackLabel(participant.eventId, participant.trackId))}</td>
          <td>${escapeHtml(participant.phone)}</td>
          <td><span class="status-pill ${paymentState}">${paymentState}</span></td>
          <td>
            ${participant.waiver ? `
              <button class="status-pill active" type="button" data-view-waiver="${participant.id}">View</button>
            ` : `
              <span class="status-pill pending">missing</span>
            `}
          </td>
        </tr>
      `;
    })
    .join("") || `<tr><td colspan="6">No participants match the current filters.</td></tr>`;

  if (!state.participants.some((participant) => participant.id === selectedParticipantId)) {
    selectedParticipantId = state.participants[0]?.id || "";
  }
  renderParticipantDetail();
}

function renderParticipantDetail() {
  const participant = state.participants.find((item) => item.id === selectedParticipantId);
  if (!participant) {
    refs.participantDetail.innerHTML = "<p>Select a participant to view registration and payment history.</p>";
    return;
  }
  const payments = state.payments.filter((payment) => payment.participantId === participant.id);
  refs.participantDetail.innerHTML = `
    <h3>${escapeHtml(fullName(participant))}</h3>
    <span class="status-pill ${participantPaymentState(participant.id)}">${participantPaymentState(participant.id)}</span>
    <dl class="detail-list">
      <div><dt>Signed up</dt><dd>${formatDateTime(participant.signedUpAt)}</dd></div>
      <div><dt>Age</dt><dd>${Number(participant.age || 0)}</dd></div>
      <div><dt>Gender</dt><dd>${escapeHtml(participant.gender)}</dd></div>
      <div><dt>Guardian</dt><dd>${escapeHtml(participant.guardianName || "N/A")}</dd></div>
      <div><dt>Address</dt><dd>${escapeHtml(participant.address)}</dd></div>
      <div><dt>Phone</dt><dd>${escapeHtml(participant.phone)}</dd></div>
      <div><dt>Email</dt><dd>${escapeHtml(participant.email)}</dd></div>
      <div><dt>Session</dt><dd>${escapeHtml(eventTitle(participant.eventId))}</dd></div>
      <div><dt>Track</dt><dd>${escapeHtml(trackLabel(participant.eventId, participant.trackId))}</dd></div>
      <div><dt>Waiver</dt><dd>${participant.waiver ? `Signed ${formatDateTime(participant.waiver.signedAt)}` : "Not on file"}</dd></div>
    </dl>
    <h3>Payment history</h3>
    ${payments.map((payment) => `
      <div class="payment-row">
        <span>${formatDateTime(payment.date)}<br>${escapeHtml(payment.memo)}</span>
        <strong>$${Number(payment.amount || 0).toFixed(2)} <span class="status-pill ${payment.status}">${payment.status}</span></strong>
      </div>
    `).join("") || "<p>No payments recorded.</p>"}
    <div class="button-row">
      <button class="primary-button" type="button" data-mark-paid="${participant.id}">
        <i data-lucide="check-circle-2"></i>
        Mark Paid
      </button>
      <a class="ghost-button" href="${receiptMailto(participant)}">
        <i data-lucide="mail"></i>
        Email Receipt
      </a>
      ${participant.waiver ? `
        <button class="ghost-button" type="button" data-detail-waiver="${participant.id}">
          <i data-lucide="file-signature"></i>
          View Waiver
        </button>
      ` : ""}
    </div>
  `;
  const markPaid = refs.participantDetail.querySelector("[data-mark-paid]");
  markPaid.addEventListener("click", () => markParticipantPaid(participant.id));
  const waiverButton = refs.participantDetail.querySelector("[data-detail-waiver]");
  if (waiverButton) waiverButton.addEventListener("click", () => openWaiverModal(participant.id));
  refreshIcons();
}

function markParticipantPaid(participantId) {
  const payment = state.payments.find((item) => item.participantId === participantId && item.status !== "paid");
  if (!payment) {
    toast("No pending payment for this participant.");
    return;
  }
  payment.status = "paid";
  payment.receiptSent = true;
  payment.date = new Date().toISOString();
  saveState();
  renderAdmin();
  toast("Participant payment marked paid.");
}

function openWaiverModal(participantId) {
  const participant = state.participants.find((item) => item.id === participantId);
  if (!participant?.waiver) {
    toast("No signed waiver is on file for this participant.");
    return;
  }
  refs.waiverModalTitle.textContent = `${fullName(participant)} signed waiver`;
  refs.waiverModalContent.innerHTML = signedWaiverHtml(participant);
  refs.printWaiver.dataset.participantId = participant.id;
  refs.waiverModal.showModal();
  refreshIcons();
}

function signedWaiverHtml(participant) {
  const waiver = participant.waiver;
  return `
    <header class="signed-waiver-header">
      <h3>${escapeHtml(waiver.title || "Signed Waiver")}</h3>
      <span class="status-pill active">Electronically signed</span>
    </header>
    <dl class="detail-list waiver-meta">
      <div><dt>Participant</dt><dd>${escapeHtml(waiver.participantName || fullName(participant))}</dd></div>
      <div><dt>Age</dt><dd>${Number(waiver.participantAge || participant.age || 0)}</dd></div>
      <div><dt>Guardian</dt><dd>${escapeHtml(waiver.guardianName || participant.guardianName || "N/A")}</dd></div>
      <div><dt>Session</dt><dd>${escapeHtml(waiver.eventTitle || eventTitle(participant.eventId))}</dd></div>
      <div><dt>Track</dt><dd>${escapeHtml(waiver.trackLabel || trackLabel(participant.eventId, participant.trackId))}</dd></div>
      <div><dt>Signer</dt><dd>${escapeHtml(waiver.signerName)} (${escapeHtml(waiver.signerRole)})</dd></div>
      <div><dt>Signed</dt><dd>${formatDateTime(waiver.signedAt)}</dd></div>
    </dl>
    <div class="waiver-body">
      ${String(waiver.body || "").split("\n\n").map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
    <div class="signature-block">
      <span>Electronic signature</span>
      <strong>${escapeHtml(waiver.signature || waiver.signerName)}</strong>
      <small>${escapeHtml(waiver.recordNotice || "Signed electronically by typed name.")}</small>
    </div>
    <ul class="waiver-proof">
      <li>Electronic records consent: ${waiver.electronicConsent ? "Yes" : "No"}</li>
      <li>Waiver agreement acknowledgment: ${waiver.agreement ? "Yes" : "No"}</li>
      <li>Record ID: ${escapeHtml(waiver.id || "N/A")}</li>
    </ul>
  `;
}

function printSignedWaiver(participantId) {
  const participant = state.participants.find((item) => item.id === participantId);
  if (!participant?.waiver) {
    toast("No signed waiver is on file for this participant.");
    return;
  }
  const printWindow = window.open("", "_blank", "width=900,height=720");
  if (!printWindow) {
    toast("Pop-up blocked. Open the waiver and use your browser print command.");
    return;
  }
  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(fullName(participant))} Waiver</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 32px; color: #111827; }
          h1, h2, h3 { color: #071d49; margin-bottom: 8px; }
          p { line-height: 1.55; }
          dl { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; }
          dt { color: #5c6472; font-weight: 700; }
          dd { margin: 0 0 8px; font-weight: 700; }
          .signature { margin-top: 24px; padding-top: 14px; border-top: 2px solid #071d49; }
          .notice { margin-top: 18px; font-size: 12px; color: #5c6472; }
          @media print { button { display: none; } body { margin: 20px; } }
        </style>
      </head>
      <body>
        <button onclick="window.print()">Print</button>
        <h1>${escapeHtml(participant.waiver.title || "Signed Waiver")}</h1>
        <dl>
          <div><dt>Participant</dt><dd>${escapeHtml(participant.waiver.participantName || fullName(participant))}</dd></div>
          <div><dt>Age</dt><dd>${Number(participant.waiver.participantAge || participant.age || 0)}</dd></div>
          <div><dt>Guardian</dt><dd>${escapeHtml(participant.waiver.guardianName || participant.guardianName || "N/A")}</dd></div>
          <div><dt>Session</dt><dd>${escapeHtml(participant.waiver.eventTitle || eventTitle(participant.eventId))}</dd></div>
          <div><dt>Track</dt><dd>${escapeHtml(participant.waiver.trackLabel || trackLabel(participant.eventId, participant.trackId))}</dd></div>
          <div><dt>Signed</dt><dd>${formatDateTime(participant.waiver.signedAt)}</dd></div>
        </dl>
        ${String(participant.waiver.body || "").split("\n\n").map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        <div class="signature">
          <h2>Electronic signature</h2>
          <p><strong>${escapeHtml(participant.waiver.signature || participant.waiver.signerName)}</strong></p>
          <p>Signer role: ${escapeHtml(participant.waiver.signerRole)} | Electronic records consent: ${participant.waiver.electronicConsent ? "Yes" : "No"} | Waiver acknowledgment: ${participant.waiver.agreement ? "Yes" : "No"}</p>
        </div>
        <p class="notice">Record ID: ${escapeHtml(participant.waiver.id || "N/A")} | ${escapeHtml(participant.waiver.recordNotice || "Signed electronically by typed name.")}</p>
        <script>window.addEventListener("load", () => setTimeout(() => window.print(), 250));<\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function renderPayments() {
  refs.paymentsTable.innerHTML = state.payments
    .map((payment) => {
      const participant = payment.participantId ? state.participants.find((item) => item.id === payment.participantId) : null;
      const order = payment.orderId ? state.storeOrders.find((item) => item.id === payment.orderId) : null;
      const label = participant ? fullName(participant) : order ? `Store: ${order.itemName}` : "Payment";
      return `
        <tr>
          <td>${formatDateTime(payment.date)}</td>
          <td>${escapeHtml(label)}</td>
          <td>${escapeHtml(payment.memo)}</td>
          <td>$${Number(payment.amount || 0).toFixed(2)}</td>
          <td>
            <button class="status-pill ${payment.status}" type="button" data-toggle-payment="${payment.id}">
              ${escapeHtml(payment.status)}
            </button>
          </td>
        </tr>
      `;
    })
    .join("") || `<tr><td colspan="5">No payments yet.</td></tr>`;
}

function handlePaymentTableClick(event) {
  const button = event.target.closest("[data-toggle-payment]");
  if (!button) return;
  const payment = state.payments.find((item) => item.id === button.dataset.togglePayment);
  if (!payment) return;
  payment.status = payment.status === "paid" ? "pending" : "paid";
  payment.receiptSent = payment.status === "paid";
  payment.date = new Date().toISOString();
  saveState();
  renderAdmin();
}

function renderEventEditor() {
  refs.eventEditor.innerHTML = state.events
    .map((event) => `
      <form class="editor-card" data-event-editor="${event.id}">
        <div class="mini-actions">
          <h3>${escapeHtml(event.title)}</h3>
          <label><input type="checkbox" name="active" ${event.active ? "checked" : ""}> Active</label>
        </div>
        <div class="form-grid two">
          <label>Title<input name="title" value="${escapeAttr(event.title)}"></label>
          <label>Dates<input name="dateLine" value="${escapeAttr(event.dateLine)}"></label>
          <label>Days<input name="dayLine" value="${escapeAttr(event.dayLine)}"></label>
          <label>Venue<input name="venue" value="${escapeAttr(event.venue)}"></label>
          <label>Youth time<input name="youthTime" value="${escapeAttr(event.tracks[0]?.time || "")}"></label>
          <label>Youth price<input name="youthPrice" type="number" min="0" value="${Number(event.tracks[0]?.price || 0)}"></label>
          <label>Teen time<input name="teenTime" value="${escapeAttr(event.tracks[1]?.time || "")}"></label>
          <label>Teen price<input name="teenPrice" type="number" min="0" value="${Number(event.tracks[1]?.price || 0)}"></label>
        </div>
        <label>Description<textarea name="description" rows="3">${escapeHtml(event.description)}</textarea></label>
        <button class="primary-button" type="submit"><i data-lucide="save"></i>Save Event</button>
      </form>
    `)
    .join("");
  $$("[data-event-editor]", refs.eventEditor).forEach((form) => {
    form.addEventListener("submit", handleEventSave);
  });
}

function handleEventSave(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const camp = state.events.find((item) => item.id === form.dataset.eventEditor);
  if (!camp) return;
  const formData = new FormData(form);
  camp.title = clean(formData.get("title"));
  camp.dateLine = clean(formData.get("dateLine"));
  camp.dayLine = clean(formData.get("dayLine"));
  camp.venue = clean(formData.get("venue"));
  camp.description = clean(formData.get("description"));
  camp.active = formData.get("active") === "on";
  camp.tracks = [
    { id: "youth", label: "1st-6th Grade", time: clean(formData.get("youthTime")), price: Number(formData.get("youthPrice") || 0) },
    { id: "teen", label: "7th-12th Grade", time: clean(formData.get("teenTime")), price: Number(formData.get("teenPrice") || 0) }
  ];
  saveState();
  renderAll();
  toast("Event updated.");
}

function addEvent() {
  state.events.push({
    id: makeId("event"),
    title: "New Event",
    dateLine: "Add dates",
    dayLine: "Add days",
    venue: "American Heritage Schools, American Fork",
    description: "Describe the session.",
    active: true,
    tracks: [
      { id: "youth", label: "1st-6th Grade", time: "1:00 - 3:00 PM", price: 150 },
      { id: "teen", label: "7th-12th Grade", time: "4:00 - 6:30 PM", price: 200 }
    ]
  });
  saveState();
  renderAll();
  toast("Event added.");
}

function renderStoreEditor() {
  refs.storeEditor.innerHTML = state.storeItems
    .map((item) => `
      <form class="editor-card" data-store-editor="${item.id}">
        <div class="mini-actions">
          <h3>${escapeHtml(item.name)}</h3>
          <label><input type="checkbox" name="active" ${item.active ? "checked" : ""}> Active</label>
        </div>
        <figure class="admin-product-preview">
          <img src="${escapeAttr(itemImageUrl(item))}" alt="${escapeAttr(item.name)} product preview">
          <figcaption>${escapeHtml(item.imageSource || "Generated mockup")}</figcaption>
        </figure>
        <div class="form-grid two">
          <label>Name<input name="name" value="${escapeAttr(item.name)}"></label>
          <label>Category<input name="category" value="${escapeAttr(item.category)}"></label>
          <label>Price<input name="price" type="number" min="0" value="${Number(item.price || 0)}"></label>
          <label>Product color<input name="productColor" type="color" value="${escapeAttr(item.productColor || "#071d49")}"></label>
          <label>Logo / mark text<input name="logoText" value="${escapeAttr(item.logoText || STORE_MARK_TEXT)}"></label>
          <label>Slogan / item text<input name="slogan" value="${escapeAttr(item.slogan || STORE_ITEM_TEXT)}"></label>
        </div>
        <label>Description<textarea name="description" rows="3">${escapeHtml(item.description)}</textarea></label>
        <div class="idea-strip">
          ${designIdeasFor(item).map((idea) => `
            <button class="idea-chip" type="button" data-idea-choice="${item.id}" data-logo="${escapeAttr(idea.logoText)}" data-slogan="${escapeAttr(idea.slogan)}">
              <strong>${escapeHtml(idea.logoText)}</strong>
              <span>${escapeHtml(idea.slogan)}</span>
            </button>
          `).join("")}
        </div>
        <div class="button-row">
          <button class="primary-button" type="submit"><i data-lucide="save"></i>Save Item</button>
          <button class="secondary-button" type="button" data-generate-mockup="${item.id}">
            <i data-lucide="wand-sparkles"></i>
            Generate Mockup
          </button>
          <label class="file-button ghost-button">
            <i data-lucide="image-up"></i>
            Upload Image
            <input data-upload-store-image="${item.id}" type="file" accept="image/*">
          </label>
          <a class="ghost-button" href="${escapeAttr(itemImageUrl(item))}" download="${escapeAttr(mockupFileName(item))}">
            <i data-lucide="download"></i>
            Download
          </a>
        </div>
      </form>
    `)
    .join("");
  $$("[data-store-editor]", refs.storeEditor).forEach((form) => {
    form.addEventListener("submit", handleStoreSave);
  });
  $$("[data-idea-choice]", refs.storeEditor).forEach((button) => {
    button.addEventListener("click", handleIdeaChoice);
  });
  $$("[data-generate-mockup]", refs.storeEditor).forEach((button) => {
    button.addEventListener("click", handleGenerateMockup);
  });
  $$("[data-upload-store-image]", refs.storeEditor).forEach((input) => {
    input.addEventListener("change", handleStoreImageUpload);
  });
}

function handleStoreSave(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const item = state.storeItems.find((storeItem) => storeItem.id === form.dataset.storeEditor);
  if (!item) return;
  persistStoreForm(item, form);
  saveState();
  renderAll();
  toast("Store item updated.");
}

function addStoreItem() {
  state.storeItems.push({
    id: makeId("item"),
    name: "New Team Item",
    category: "Shirt",
    price: 25,
    active: true,
    description: "Add item details.",
    productColor: "#071d49",
    logoText: STORE_MARK_TEXT,
    slogan: STORE_ITEM_TEXT,
    imageUrl: "",
    imageSource: "Generated mockup"
  });
  saveState();
  renderAll();
  toast("Store item added.");
}

function persistStoreForm(item, form) {
  const formData = new FormData(form);
  item.name = clean(formData.get("name"));
  item.category = clean(formData.get("category"));
  item.price = Number(formData.get("price") || 0);
  item.description = clean(formData.get("description"));
  item.productColor = clean(formData.get("productColor")) || "#071d49";
  item.logoText = clean(formData.get("logoText")) || STORE_MARK_TEXT;
  item.slogan = clean(formData.get("slogan")) || STORE_ITEM_TEXT;
  item.active = formData.get("active") === "on";
}

function handleIdeaChoice(event) {
  const button = event.currentTarget;
  const form = button.closest("[data-store-editor]");
  if (!form) return;
  form.elements.logoText.value = button.dataset.logo || STORE_MARK_TEXT;
  form.elements.slogan.value = button.dataset.slogan || STORE_ITEM_TEXT;
  toast("Design idea applied. Generate a mockup to preview it.");
}

function handleGenerateMockup(event) {
  const itemId = event.currentTarget.dataset.generateMockup;
  const item = state.storeItems.find((storeItem) => storeItem.id === itemId);
  const form = event.currentTarget.closest("[data-store-editor]");
  if (!item || !form) return;
  persistStoreForm(item, form);
  item.imageUrl = makeStoreMockupDataUrl(item);
  item.imageSource = "Generated mockup";
  saveState();
  renderAll();
  toast("Product mockup generated.");
}

function handleStoreImageUpload(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  const item = state.storeItems.find((storeItem) => storeItem.id === input.dataset.uploadStoreImage);
  if (!file || !item) return;
  const reader = new FileReader();
  reader.onload = () => {
    item.imageUrl = String(reader.result || "");
    item.imageSource = `Uploaded image: ${file.name}`;
    saveState();
    renderAll();
    toast("Product image uploaded.");
  };
  reader.readAsDataURL(file);
}

function designIdeasFor(item) {
  const category = String(item.category || "").toLowerCase();
  const shared = [
    { logoText: "AHS", slogan: STORE_ITEM_TEXT },
    { logoText: "PATRIOTS", slogan: "Heart Might Mind" },
    { logoText: "JJ", slogan: "Discipline Focus Respect" }
  ];
  if (category.includes("hat") || category.includes("accessory")) {
    return [
      { logoText: "AHS", slogan: "American Fork Patriots" },
      { logoText: "PATRIOTS", slogan: "Mat Crew" },
      { logoText: "JJ", slogan: "Jiu-Jitsu Camp" }
    ];
  }
  if (category.includes("hood") || category.includes("outer")) {
    return [
      { logoText: "AHS", slogan: STORE_ITEM_TEXT },
      { logoText: "PATRIOTS", slogan: "Self-Defense Leadership" },
      { logoText: "JJ", slogan: "American Heritage Camps" }
    ];
  }
  if (category.includes("rash") || category.includes("training")) {
    return [
      { logoText: "PATRIOTS", slogan: STORE_ITEM_TEXT },
      { logoText: "AHS", slogan: "Control Confidence Character" },
      { logoText: "JJ", slogan: "Hybrid Martial Arts" }
    ];
  }
  return shared;
}

function itemImageUrl(item) {
  return item.imageUrl || makeStoreMockupDataUrl(item);
}

function mockupFileName(item) {
  const extension = item.imageUrl?.startsWith("data:image/svg") || !item.imageUrl ? "svg" : "png";
  return `${slugify(item.name)}-mockup.${extension}`;
}

function makeStoreMockupDataUrl(item) {
  const color = validHex(item.productColor) ? item.productColor : "#071d49";
  const accent = color.toLowerCase() === "#d71920" ? "#071d49" : "#d71920";
  const logoText = svgText(item.logoText || STORE_MARK_TEXT).slice(0, 14);
  const slogan = String(item.slogan || STORE_ITEM_TEXT).slice(0, 48);
  const category = String(item.category || "").toLowerCase();
  const product = category.includes("hat") || category.includes("accessory")
    ? hatSvg(color, accent, logoText, slogan)
    : category.includes("hood") || category.includes("outer")
      ? hoodieSvg(color, accent, logoText, slogan)
      : category.includes("rash") || category.includes("training")
        ? rashguardSvg(color, accent, logoText, slogan)
        : shirtSvg(color, accent, logoText, slogan);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 680" role="img" aria-label="${svgText(item.name)} product mockup">
      <defs>
        <radialGradient id="bg" cx="48%" cy="22%" r="78%">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.52" stop-color="#edf2f8"/>
          <stop offset="1" stop-color="#d9e2ef"/>
        </radialGradient>
        <linearGradient id="fabric" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.24"/>
          <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0.24"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#071d49" flood-opacity="0.22"/>
        </filter>
        <filter id="texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.045"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="900" height="680" fill="url(#bg)"/>
      <ellipse cx="450" cy="610" rx="285" ry="34" fill="#071d49" opacity="0.12"/>
      ${product}
      <text x="450" y="625" text-anchor="middle" fill="#5c6472" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700">${svgText(item.name)}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function shirtSvg(color, accent, logoText, slogan) {
  return `
    <g filter="url(#shadow)">
      <path d="M305 136 L379 94 C413 124 487 124 521 94 L595 136 L720 235 L641 334 L602 295 L602 558 L298 558 L298 295 L259 334 L180 235 Z" fill="${color}"/>
      <path d="M305 136 L379 94 C413 124 487 124 521 94 L595 136 L720 235 L641 334 L602 295 L602 558 L298 558 L298 295 L259 334 L180 235 Z" fill="url(#fabric)"/>
      <path d="M382 98 C414 159 486 159 518 98" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="12"/>
      <path d="M298 295 L602 295" stroke="#ffffff" stroke-opacity="0.15" stroke-width="5"/>
      ${crestSvg(450, 312, 78, accent, logoText)}
      ${productSloganSvg(450, 414, slogan, "#ffffff", 34)}
      <rect x="298" y="538" width="304" height="20" fill="${accent}" opacity="0.9"/>
      <path d="M305 136 L379 94 C413 124 487 124 521 94 L595 136 L720 235 L641 334 L602 295 L602 558 L298 558 L298 295 L259 334 L180 235 Z" filter="url(#texture)" opacity="0.7"/>
    </g>
  `;
}

function rashguardSvg(color, accent, logoText, slogan) {
  return `
    <g filter="url(#shadow)">
      <path d="M270 153 L370 105 C411 132 489 132 530 105 L630 153 L715 262 L647 333 L592 291 L592 558 L308 558 L308 291 L253 333 L185 262 Z" fill="${color}"/>
      <path d="M270 153 L370 105 C411 132 489 132 530 105 L630 153 L715 262 L647 333 L592 291 L592 558 L308 558 L308 291 L253 333 L185 262 Z" fill="url(#fabric)"/>
      <path d="M308 204 C372 176 528 176 592 204" fill="none" stroke="${accent}" stroke-width="22" opacity="0.92"/>
      <path d="M308 245 C385 220 515 220 592 245" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.72"/>
      ${crestSvg(450, 330, 72, "#071d49", logoText)}
      ${productSloganSvg(450, 434, slogan, "#ffffff", 31)}
      <path d="M308 526 H592" stroke="${accent}" stroke-width="28"/>
      <path d="M270 153 L370 105 C411 132 489 132 530 105 L630 153 L715 262 L647 333 L592 291 L592 558 L308 558 L308 291 L253 333 L185 262 Z" filter="url(#texture)" opacity="0.76"/>
    </g>
  `;
}

function hoodieSvg(color, accent, logoText, slogan) {
  return `
    <g filter="url(#shadow)">
      <path d="M323 165 C340 95 560 95 577 165 L643 191 L707 327 L639 369 L603 310 L603 558 L297 558 L297 310 L261 369 L193 327 L257 191 Z" fill="${color}"/>
      <path d="M323 165 C340 95 560 95 577 165 L643 191 L707 327 L639 369 L603 310 L603 558 L297 558 L297 310 L261 369 L193 327 L257 191 Z" fill="url(#fabric)"/>
      <path d="M351 148 C373 214 527 214 549 148 C518 120 382 120 351 148 Z" fill="#0b1220" opacity="0.38"/>
      <path d="M382 190 C405 234 495 234 518 190" fill="none" stroke="#ffffff" stroke-opacity="0.46" stroke-width="10"/>
      <path d="M365 458 C393 492 507 492 535 458 L548 530 H352 Z" fill="#071d49" opacity="0.36"/>
      ${crestSvg(450, 318, 76, accent, logoText)}
      ${productSloganSvg(450, 414, slogan, "#ffffff", 32)}
      <path d="M297 540 H603" stroke="${accent}" stroke-width="25"/>
      <path d="M323 165 C340 95 560 95 577 165 L643 191 L707 327 L639 369 L603 310 L603 558 L297 558 L297 310 L261 369 L193 327 L257 191 Z" filter="url(#texture)" opacity="0.76"/>
    </g>
  `;
}

function hatSvg(color, accent, logoText, slogan) {
  return `
    <g filter="url(#shadow)">
      <path d="M240 368 C266 216 345 158 452 158 C566 158 637 226 657 370 C566 417 339 417 240 368 Z" fill="${color}"/>
      <path d="M240 368 C266 216 345 158 452 158 C566 158 637 226 657 370 C566 417 339 417 240 368 Z" fill="url(#fabric)"/>
      <path d="M236 366 C360 433 556 430 750 390 C690 480 372 503 190 410 C189 383 204 370 236 366 Z" fill="${accent}"/>
      <path d="M318 196 C345 282 345 337 337 392" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="6"/>
      <path d="M452 158 C454 260 454 327 450 404" fill="none" stroke="#ffffff" stroke-opacity="0.17" stroke-width="7"/>
      <path d="M586 214 C554 285 551 337 559 391" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="6"/>
      ${crestSvg(450, 306, 82, accent, logoText)}
      ${productSloganSvg(450, 438, slogan, "#071d49", 28)}
      <path d="M240 368 C266 216 345 158 452 158 C566 158 637 226 657 370 C566 417 339 417 240 368 Z" filter="url(#texture)" opacity="0.72"/>
    </g>
  `;
}

function crestSvg(cx, cy, size, accent, logoText) {
  const r = size / 2;
  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="#ffffff"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 9}" fill="${accent}"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 1}" fill="#071d49"/>
      <path d="M${cx - r * 0.52} ${cy - r * 0.16} H${cx + r * 0.52} L${cx + r * 0.38} ${cy + r * 0.56} L${cx} ${cy + r * 0.82} L${cx - r * 0.38} ${cy + r * 0.56} Z" fill="#ffffff"/>
      <text x="${cx}" y="${cy + r * 0.18}" text-anchor="middle" fill="#071d49" font-family="Arial Black, Arial, sans-serif" font-size="${Math.max(20, r * 0.56)}" font-weight="900">${logoText}</text>
    </g>
  `;
}

function productSloganSvg(x, y, text, fill, fontSize) {
  const lines = wrapProductText(text, 24, 2);
  const size = lines.length > 1 ? Math.max(22, fontSize - 5) : fontSize;
  const lineHeight = size + 9;
  const firstY = y - ((lines.length - 1) * lineHeight) / 2;
  return lines.map((line, index) => `
    <text x="${x}" y="${firstY + index * lineHeight}" text-anchor="middle" fill="${fill}" font-family="Arial Black, Arial, sans-serif" font-size="${size}" font-weight="900">${svgText(line)}</text>
  `).join("");
}

function wrapProductText(text, maxLineLength, maxLines) {
  const words = String(text || STORE_ITEM_TEXT).trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLineLength && current && lines.length < maxLines - 1) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines - 1);
    kept.push(lines.slice(maxLines - 1).join(" "));
    return kept;
  }
  return lines.length ? lines : [STORE_ITEM_TEXT];
}

function renderStoreOrders() {
  refs.storeOrdersTable.innerHTML = state.storeOrders
    .map((order) => `
      <tr>
        <td>${formatDateTime(order.createdAt)}</td>
        <td>${escapeHtml(order.itemName)} x ${Number(order.quantity || 1)}</td>
        <td>${escapeHtml(order.fit)} / ${escapeHtml(order.size)}</td>
        <td>${escapeHtml(order.email)}</td>
        <td>$${Number(order.total || 0).toFixed(2)}</td>
      </tr>
    `)
    .join("") || `<tr><td colspan="5">No store orders yet.</td></tr>`;
}

function renderMediaAdmin() {
  refs.heroVideoUrl.value = state.settings.publicVideoUrl || "";
  refs.videoTitle.value = state.settings.publicVideoTitle || "";
  refs.videoCaption.value = state.settings.publicVideoCaption || "";
  const videoOptions = [
    ...state.media.videos.map((item) => ({ value: item.id, label: item.name })),
    { value: "flyer", label: "Flyer slideshow" }
  ];
  refs.editVideoSource.innerHTML = videoOptions.map((item) => `<option value="${item.value}">${escapeHtml(item.label)}</option>`).join("");
  refs.editMusicSource.innerHTML = [
    ...state.songs.map((song) => ({ value: song.id, label: `${song.title} (${song.mood})` })),
    ...state.media.music.map((song) => ({ value: song.id, label: song.name }))
  ].map((item) => `<option value="${item.value}">${escapeHtml(item.label)}</option>`).join("");
  renderMediaLibrary();
  renderFlyerLibrary();
  renderFlyerEditor();
  renderSongs();
}

function saveVideoSettings() {
  state.settings.publicVideoUrl = refs.heroVideoUrl.value.trim();
  state.settings.publicVideoTitle = refs.videoTitle.value.trim();
  state.settings.publicVideoCaption = refs.videoCaption.value.trim();
  saveState();
  applyPublicSettings();
  toast("Public video settings saved.");
}

function handleVideoUpload(event) {
  const [file] = Array.from(event.target.files || []);
  if (!file) return;
  const id = makeId("video");
  const url = URL.createObjectURL(file);
  sessionMedia.set(id, url);
  state.media.videos.unshift({ id, name: file.name, type: file.type, size: file.size, addedAt: new Date().toISOString(), sessionOnly: true });
  state.settings.publicVideoUrl = url;
  refs.heroVideoUrl.value = url;
  saveState();
  applyPublicSettings();
  renderMediaAdmin();
  toast("Video uploaded for this browser session.");
}

function handlePhotoUpload(event) {
  const files = Array.from(event.target.files || []);
  files.forEach((file) => {
    const id = makeId("photo");
    const url = URL.createObjectURL(file);
    sessionMedia.set(id, url);
    state.media.photos.unshift({ id, name: file.name, type: file.type, size: file.size, addedAt: new Date().toISOString(), sessionOnly: true });
  });
  saveState();
  renderMediaAdmin();
  toast("Photo library updated.");
}

function handleMusicUpload(event) {
  const files = Array.from(event.target.files || []);
  files.forEach((file) => {
    const id = makeId("music");
    const url = URL.createObjectURL(file);
    sessionMedia.set(id, url);
    state.media.music.unshift({ id, name: file.name, type: file.type, size: file.size, addedAt: new Date().toISOString(), sessionOnly: true });
  });
  saveState();
  renderMediaAdmin();
  toast("Music library updated.");
}

function renderMediaLibrary() {
  const rows = [
    ...state.media.photos.map((item) => ({ ...item, kind: "Photo" })),
    ...(state.media.flyers || []).map((item) => ({ ...item, kind: item.type === "brochure" ? "Brochure" : "Flyer" })),
    ...state.media.videos.map((item) => ({ ...item, kind: "Video" })),
    ...state.media.music.map((item) => ({ ...item, kind: "Music" }))
  ];
  refs.mediaLibrary.innerHTML = rows
    .map((item) => `
      <div class="library-row">
        <span><strong>${escapeHtml(item.kind)}</strong><br>${escapeHtml(item.name)}</span>
        <span class="status-pill ${item.sessionOnly ? "pending" : "active"}">${item.sessionOnly ? "session" : "saved"}</span>
      </div>
    `)
    .join("") || "<p>No media uploaded yet.</p>";
}

function renderFlyerLibrary() {
  refs.flyerLibrary.innerHTML = (state.media.flyers || [])
    .map((flyer) => `
      <article class="flyer-card ${flyer.active ? "active" : ""}">
        <figure class="flyer-thumb">
          <img src="${escapeAttr(flyerImageUrl(flyer))}" alt="${escapeAttr(flyer.name)} preview">
        </figure>
        <div>
          <div class="mini-actions">
            <h3>${escapeHtml(flyer.name)}</h3>
            <span class="status-pill ${flyer.active ? "active" : ""}">${flyer.active ? "active" : flyer.type}</span>
          </div>
          <p>${escapeHtml(flyer.subtitle)}</p>
          <div class="button-row">
            <button class="ghost-button" type="button" data-set-active-flyer="${flyer.id}">
              <i data-lucide="badge-check"></i>
              Make Active
            </button>
            <a class="ghost-button" href="${escapeAttr(flyerImageUrl(flyer))}" download="${escapeAttr(slugify(flyer.name))}.${flyerImageUrl(flyer).startsWith("data:image/svg") ? "svg" : "png"}">
              <i data-lucide="download"></i>
              Download
            </a>
          </div>
        </div>
      </article>
    `)
    .join("");
  $$("[data-set-active-flyer]", refs.flyerLibrary).forEach((button) => {
    button.addEventListener("click", () => setActiveFlyer(button.dataset.setActiveFlyer));
  });
  refreshIcons();
}

function renderFlyerEditor() {
  refs.flyerEditor.innerHTML = (state.media.flyers || [])
    .map((flyer) => `
      <form class="editor-card flyer-editor-card" data-flyer-editor="${flyer.id}">
        <figure class="admin-flyer-preview">
          <img src="${escapeAttr(flyerImageUrl(flyer))}" alt="${escapeAttr(flyer.name)} editable flyer preview">
          <figcaption>${escapeHtml(flyer.imageSource || "Generated flyer")}</figcaption>
        </figure>
        <div class="form-grid two">
          <label>Library name<input name="name" value="${escapeAttr(flyer.name)}"></label>
          <label>Type
            <select name="type">
              <option value="flyer" ${flyer.type === "flyer" ? "selected" : ""}>Flyer</option>
              <option value="brochure" ${flyer.type === "brochure" ? "selected" : ""}>Brochure</option>
            </select>
          </label>
          <label>Title<input name="title" value="${escapeAttr(flyer.title)}"></label>
          <label>Subtitle<input name="subtitle" value="${escapeAttr(flyer.subtitle)}"></label>
        </div>
        <label>Focus line<input name="focusLine" value="${escapeAttr(flyer.focusLine)}"></label>
        <label>Dates<input name="datesLine" value="${escapeAttr(flyer.datesLine)}"></label>
        <label>Schedule<input name="scheduleLine" value="${escapeAttr(flyer.scheduleLine)}"></label>
        <label>Pricing<input name="priceLine" value="${escapeAttr(flyer.priceLine)}"></label>
        <label>Bullets<textarea name="bullets" rows="5">${escapeHtml((flyer.bullets || []).join("\n"))}</textarea></label>
        <label>Footer<input name="footer" value="${escapeAttr(flyer.footer)}"></label>
        <div class="button-row">
          <button class="primary-button" type="submit"><i data-lucide="save"></i>Save Copy</button>
          <button class="secondary-button" type="button" data-generate-flyer="${flyer.id}">
            <i data-lucide="wand-sparkles"></i>
            Generate Flyer
          </button>
          <label class="file-button ghost-button">
            <i data-lucide="image-up"></i>
            Upload Flyer
            <input data-upload-flyer="${flyer.id}" type="file" accept="image/*">
          </label>
          <button class="ghost-button" type="button" data-set-active-flyer="${flyer.id}">
            <i data-lucide="badge-check"></i>
            Make Active
          </button>
        </div>
      </form>
    `)
    .join("");
  $$("[data-flyer-editor]", refs.flyerEditor).forEach((form) => {
    form.addEventListener("submit", handleFlyerSave);
  });
  $$("[data-generate-flyer]", refs.flyerEditor).forEach((button) => {
    button.addEventListener("click", handleGenerateFlyer);
  });
  $$("[data-upload-flyer]", refs.flyerEditor).forEach((input) => {
    input.addEventListener("change", handleFlyerUpload);
  });
  $$("[data-set-active-flyer]", refs.flyerEditor).forEach((button) => {
    button.addEventListener("click", () => setActiveFlyer(button.dataset.setActiveFlyer));
  });
  refreshIcons();
}

function persistFlyerForm(flyer, form) {
  const formData = new FormData(form);
  flyer.name = clean(formData.get("name")) || `${PROGRAM_NAME} Flyer`;
  flyer.type = clean(formData.get("type")) || "flyer";
  flyer.title = clean(formData.get("title")) || FLYER_TITLE;
  flyer.subtitle = clean(formData.get("subtitle"));
  flyer.focusLine = clean(formData.get("focusLine"));
  flyer.datesLine = clean(formData.get("datesLine"));
  flyer.scheduleLine = clean(formData.get("scheduleLine"));
  flyer.priceLine = clean(formData.get("priceLine"));
  flyer.bullets = clean(formData.get("bullets")).split("\n").map((line) => line.trim()).filter(Boolean);
  flyer.footer = clean(formData.get("footer"));
}

function handleFlyerSave(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const flyer = state.media.flyers.find((item) => item.id === form.dataset.flyerEditor);
  if (!flyer) return;
  persistFlyerForm(flyer, form);
  saveState();
  renderMediaAdmin();
  toast("Flyer copy saved.");
}

function handleGenerateFlyer(event) {
  const flyer = state.media.flyers.find((item) => item.id === event.currentTarget.dataset.generateFlyer);
  const form = event.currentTarget.closest("[data-flyer-editor]");
  if (!flyer || !form) return;
  persistFlyerForm(flyer, form);
  flyer.imageUrl = makeFlyerDataUrl(flyer);
  flyer.imageSource = "Generated editable flyer";
  saveState();
  renderMediaAdmin();
  if (flyer.active) applyPublicSettings();
  toast("Flyer generated.");
}

function handleFlyerUpload(event) {
  const input = event.currentTarget;
  const file = input.files?.[0];
  const flyer = state.media.flyers.find((item) => item.id === input.dataset.uploadFlyer);
  if (!file || !flyer) return;
  const reader = new FileReader();
  reader.onload = () => {
    flyer.imageUrl = String(reader.result || "");
    flyer.imageSource = `Uploaded image: ${file.name}`;
    saveState();
    renderMediaAdmin();
    if (flyer.active) applyPublicSettings();
    toast("Flyer uploaded.");
  };
  reader.readAsDataURL(file);
}

function addFlyer() {
  state.media.flyers.push(normalizeFlyer({
    id: makeId("flyer"),
    name: "New Camp Flyer",
    title: FLYER_TITLE,
    subtitle: "3-Day Summer Camps",
    datesLine: "Add session dates",
    scheduleLine: "Add grade groups and times",
    priceLine: "Add pricing",
    bullets: [
      "Practical Jiu-Jitsu and self-defense",
      "Confidence, discipline, and focus",
      "Leadership and character development"
    ],
    footer: "patriotjj.com • Venmo @bcastle1"
  }));
  saveState();
  renderMediaAdmin();
  toast("Flyer added to the library.");
}

function setActiveFlyer(flyerId) {
  state.media.flyers.forEach((flyer) => {
    flyer.active = flyer.id === flyerId;
  });
  saveState();
  renderMediaAdmin();
  applyPublicSettings();
  toast("Active flyer updated.");
}

function getActiveFlyer() {
  return state.media.flyers?.find((flyer) => flyer.active) || state.media.flyers?.[0];
}

function flyerImageUrl(flyer) {
  return flyer.imageUrl || makeFlyerDataUrl(flyer);
}

function makeFlyerDataUrl(flyer) {
  const bullets = (flyer.bullets || []).slice(0, 8);
  const bulletRows = bullets.map((bullet, index) => {
    const x = index % 2 === 0 ? 108 : 498;
    const y = 420 + Math.floor(index / 2) * 52;
    return `
      <circle cx="${x}" cy="${y - 7}" r="14" fill="#071d49"/>
      <path d="M${x - 7} ${y - 8} l5 6 l10 -12" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${x + 28}" y="${y}" fill="#071d49" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="800">${svgText(bullet).slice(0, 54)}</text>
    `;
  }).join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1160" role="img" aria-label="${svgText(flyer.name)} generated flyer">
      <defs>
        <linearGradient id="paper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset="0.56" stop-color="#f8fafc"/>
          <stop offset="1" stop-color="#eef2f7"/>
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#071d49" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="900" height="1160" fill="url(#paper)"/>
      <rect x="34" y="32" width="832" height="1096" rx="18" fill="#ffffff" stroke="#071d49" stroke-width="5"/>
      <g transform="translate(96 58)">
        ${flyerBadgeSvg(0, 0)}
        ${flyerBadgeSvg(644, 0)}
      </g>
      <text x="450" y="118" text-anchor="middle" fill="#071d49" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="900">${svgText(flyer.title || FLYER_TITLE).slice(0, 30)}</text>
      <text x="450" y="186" text-anchor="middle" fill="#d71920" font-family="Arial Black, Arial, sans-serif" font-size="50" font-weight="900">${svgText(flyer.subtitle || "3-Day Summer Camps").slice(0, 44)}</text>
      <rect x="65" y="220" width="770" height="48" fill="#071d49"/>
      <text x="450" y="252" text-anchor="middle" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="25" font-weight="900">${svgText(flyer.focusLine || "").slice(0, 74)}</text>
      <text x="450" y="322" text-anchor="middle" fill="#071d49" font-family="Arial Black, Arial, sans-serif" font-size="46" font-weight="900">WHAT STUDENTS LEARN</text>
      <rect x="78" y="350" width="744" height="240" rx="14" fill="#ffffff" stroke="#071d49" stroke-width="4"/>
      ${bulletRows}
      <rect x="72" y="640" width="756" height="130" rx="16" fill="#ffffff" stroke="#d71920" stroke-width="5"/>
      <text x="450" y="690" text-anchor="middle" fill="#d71920" font-family="Arial Black, Arial, sans-serif" font-size="44" font-weight="900">${svgText(flyer.datesLine || "Add dates").slice(0, 58)}</text>
      <text x="450" y="735" text-anchor="middle" fill="#071d49" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="900">${svgText(flyer.scheduleLine || "Add schedule").slice(0, 70)}</text>
      <g filter="url(#softShadow)">
        <rect x="72" y="812" width="756" height="116" rx="14" fill="#071d49"/>
        <text x="450" y="866" text-anchor="middle" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="36" font-weight="900">PRICE AND REGISTRATION</text>
        <text x="450" y="904" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="900">${svgText(flyer.priceLine || "Add pricing").slice(0, 78)}</text>
      </g>
      <text x="450" y="984" text-anchor="middle" fill="#071d49" font-family="Arial Black, Arial, sans-serif" font-size="34" font-weight="900">EXPERT MARTIAL ARTS INSTRUCTORS</text>
      <text x="450" y="1030" text-anchor="middle" fill="#263247" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800">Self-defense • leadership • confidence • discipline • focus</text>
      <rect x="110" y="1062" width="680" height="54" rx="12" fill="#071d49"/>
      <text x="450" y="1098" text-anchor="middle" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="29" font-weight="900">${svgText(flyer.footer || "patriotjj.com").slice(0, 70)}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function flyerBadgeSvg(x, y) {
  return `
    <g transform="translate(${x} ${y})">
      <circle cx="34" cy="34" r="34" fill="#d71920"/>
      <circle cx="34" cy="34" r="26" fill="#ffffff"/>
      <circle cx="34" cy="34" r="22" fill="#071d49"/>
      <text x="34" y="43" text-anchor="middle" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-size="18">AHS</text>
    </g>
  `;
}

function renderSongs() {
  refs.songGrid.innerHTML = state.songs
    .map((song) => `
      <article class="song-card ${song.active ? "active" : ""}">
        <strong>${escapeHtml(song.title)}</strong>
        <span>${escapeHtml(song.mood)}</span>
        <small>${Number(song.bpm || 0)} BPM</small>
      </article>
    `)
    .join("");
}

function buildEditPlan() {
  const videoLabel = refs.editVideoSource.options[refs.editVideoSource.selectedIndex]?.text || "Selected video";
  const musicLabel = refs.editMusicSource.options[refs.editMusicSource.selectedIndex]?.text || "Selected music";
  const title = refs.editTitle.value.trim() || `${PROGRAM_NAME} Summer Camp`;
  refs.editPlan.textContent = [
    `Title: ${title}`,
    `Source: ${videoLabel}`,
    `Music: ${musicLabel}`,
    "0:00 - Open with flyer title and venue.",
    "0:05 - Show warmups, breakfalls, and coach welcome.",
    "0:20 - Cut to takedown, sweep, and control drills.",
    "0:45 - Add leadership and confidence caption.",
    "1:00 - Show team bow, smiles, and certificate moment.",
    "1:15 - End card: patriotjj.com | Venmo @bcastle1."
  ].join("\n");
  toast("Video edit plan created.");
}

function renderSettingsForm() {
  refs.settingsForm.elements.email.value = state.settings.contactEmail;
  refs.settingsForm.elements.phone.value = state.settings.phone;
  refs.settingsForm.elements.website.value = state.settings.website;
  refs.settingsForm.elements.venmo.value = state.settings.venmoHandle;
}

function handleSettingsSave(event) {
  event.preventDefault();
  const formData = new FormData(refs.settingsForm);
  state.settings.contactEmail = clean(formData.get("email"));
  state.settings.phone = clean(formData.get("phone"));
  state.settings.website = clean(formData.get("website"));
  state.settings.venmoHandle = clean(formData.get("venmo")).replace(/^@/, "");
  saveState();
  applyPublicSettings();
  toast("Contact settings saved.");
}

function renderWaiverTemplateForm() {
  refs.waiverTemplateForm.elements.title.value = state.settings.waiverTitle || "";
  refs.waiverTemplateForm.elements.body.value = state.settings.waiverBody || "";
}

function handleWaiverTemplateSave(event) {
  event.preventDefault();
  const formData = new FormData(refs.waiverTemplateForm);
  state.settings.waiverTitle = clean(formData.get("title")) || `${PROGRAM_NAME} Participation Waiver and Release`;
  state.settings.waiverBody = clean(formData.get("body"));
  saveState();
  renderSignupWaiverPreview();
  toast("Waiver template saved for future signups.");
}

function renderFaqEditor() {
  refs.faqEditor.innerHTML = state.faqs
    .map((faq) => `
      <form class="editor-card" data-faq-editor="${faq.id}">
        <label>Question<input name="question" value="${escapeAttr(faq.question)}"></label>
        <label>Answer<textarea name="answer" rows="3">${escapeHtml(faq.answer)}</textarea></label>
        <button class="primary-button" type="submit"><i data-lucide="save"></i>Save Q&amp;A</button>
      </form>
    `)
    .join("");
  $$("[data-faq-editor]", refs.faqEditor).forEach((form) => form.addEventListener("submit", handleFaqSave));
}

function handleFaqSave(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const faq = state.faqs.find((item) => item.id === form.dataset.faqEditor);
  if (!faq) return;
  const formData = new FormData(form);
  faq.question = clean(formData.get("question"));
  faq.answer = clean(formData.get("answer"));
  saveState();
  renderFaqs();
  renderFaqEditor();
  toast("Q&A updated.");
}

function addFaq() {
  state.faqs.push({ id: makeId("faq"), question: "New question?", answer: "Add the answer here." });
  saveState();
  renderFaqs();
  renderFaqEditor();
  toast("Q&A added.");
}

function renderReviewEditor() {
  refs.reviewEditor.innerHTML = state.reviews
    .map((review) => `
      <div class="review-card">
        <div class="review-stars">${"★".repeat(Number(review.rating || 5))}</div>
        <p>"${escapeHtml(review.quote)}"</p>
        <strong>${escapeHtml(review.name)}</strong>
      </div>
    `)
    .join("");
}

function switchAdminTab(tabName) {
  $$("[data-admin-tab]").forEach((button) => button.classList.toggle("active", button.dataset.adminTab === tabName));
  $$("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tabName));
}

function exportParticipantsCsv() {
  const rows = [
    ["First Name", "Last Name", "Age", "Gender", "Guardian", "Address", "Email", "Phone", "Session", "Track", "Signed Up", "Payment", "Waiver Signed", "Waiver Signer"],
    ...state.participants.map((participant) => [
      participant.firstName,
      participant.lastName,
      participant.age,
      participant.gender,
      participant.guardianName,
      participant.address,
      participant.email,
      participant.phone,
      eventTitle(participant.eventId),
      trackLabel(participant.eventId, participant.trackId),
      formatDateTime(participant.signedUpAt),
      participantPaymentState(participant.id),
      participant.waiver?.signedAt ? formatDateTime(participant.waiver.signedAt) : "",
      participant.waiver?.signerName || ""
    ])
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "patriot-jj-participants.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function getSelectedEvent() {
  return state.events.find((event) => event.id === selectedEventId) || state.events.find((event) => event.active);
}

function priceFor(eventId, trackId) {
  const event = state.events.find((item) => item.id === eventId);
  return Number(event?.tracks.find((track) => track.id === trackId)?.price || 0);
}

function eventTitle(eventId) {
  return state.events.find((event) => event.id === eventId)?.title || "Unknown";
}

function trackLabel(eventId, trackId) {
  const event = state.events.find((item) => item.id === eventId);
  const track = event?.tracks.find((item) => item.id === trackId);
  return track ? `${track.label} | ${track.time}` : "Unknown";
}

function paymentMemo(participant) {
  return `${PROGRAM_NAME} - ${eventTitle(participant.eventId)} - ${fullName(participant)}`;
}

function createSignedWaiver(participant, signatureData) {
  const signedAt = new Date().toISOString();
  const waiverData = {
    participantName: fullName(participant),
    signerName: signatureData.signerName,
    eventTitle: eventTitle(participant.eventId),
    trackLabel: trackLabel(participant.eventId, participant.trackId),
    signedDate: formatDateTime(signedAt)
  };
  return {
    id: makeId("waiver"),
    title: state.settings.waiverTitle,
    body: renderWaiverText(state.settings.waiverBody, waiverData),
    signerName: signatureData.signerName,
    signerRole: signatureData.signerRole,
    electronicConsent: Boolean(signatureData.electronicConsent),
    agreement: Boolean(signatureData.agreement),
    signature: signatureData.signerName,
    signedAt,
    participantName: fullName(participant),
    participantAge: participant.age,
    guardianName: participant.guardianName,
    eventTitle: eventTitle(participant.eventId),
    trackLabel: trackLabel(participant.eventId, participant.trackId),
    templateVersion: "2026-05-26-static-template",
    recordNotice: `Signed electronically by typed name in the ${PROGRAM_NAME} signup app.`
  };
}

function renderWaiverText(template, values) {
  return String(template || "")
    .replaceAll("{participantName}", values.participantName || "the participant")
    .replaceAll("{signerName}", values.signerName || "the signer")
    .replaceAll("{eventTitle}", values.eventTitle || "the selected session")
    .replaceAll("{trackLabel}", values.trackLabel || "the selected track")
    .replaceAll("{signedDate}", values.signedDate || "");
}

function participantWaiverState(participant) {
  return participant.waiver?.signedAt ? "signed" : "missing";
}

function participantPaymentState(participantId) {
  const payments = state.payments.filter((payment) => payment.participantId === participantId);
  return payments.some((payment) => payment.status === "paid") ? "paid" : "pending";
}

function fullName(participant) {
  return `${participant.firstName || ""} ${participant.lastName || ""}`.trim();
}

function venmoProfileUrl() {
  return `https://venmo.com/${encodeURIComponent(cleanVenmoHandle())}`;
}

function venmoPayUrl(payment) {
  const handle = cleanVenmoHandle();
  const amount = Number(payment?.amount || 0).toFixed(2);
  const note = encodeURIComponent(payment?.memo || PROGRAM_NAME);
  return `https://venmo.com/?txn=pay&recipients=${encodeURIComponent(handle)}&amount=${amount}&note=${note}`;
}

function cleanVenmoHandle() {
  return String(state.settings.venmoHandle || "bcastle1").replace(/^@/, "");
}

function receiptMailto(participant) {
  const payments = state.payments.filter((payment) => payment.participantId === participant.id);
  const paidTotal = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const subject = encodeURIComponent(`${PROGRAM_NAME} receipt`);
  const body = encodeURIComponent(
    `Hi ${fullName(participant)},\n\nThank you for registering for ${eventTitle(participant.eventId)}.\nPayment recorded: $${paidTotal.toFixed(2)}.\n\n${PROGRAM_NAME}`
  );
  return `mailto:${participant.email}?subject=${subject}&body=${body}`;
}

function formatDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function clean(value) {
  return String(value ?? "").trim();
}

function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function slugify(value) {
  return String(value || "item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "item";
}

function validHex(value) {
  return /^#[0-9a-f]{6}$/i.test(String(value || ""));
}

function svgText(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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

function toast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => refs.toast.classList.remove("show"), 2600);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function postHeight() {
  if (window.parent === window) return;
  window.requestAnimationFrame(() => {
    window.parent.postMessage(
      { type: "patriotJj:height", height: document.documentElement.scrollHeight },
      "*"
    );
  });
}

window.addEventListener("load", () => {
  init();
  setTimeout(refreshIcons, 150);
});
window.addEventListener("resize", postHeight);
