/**
 * Campus Careers
 * Frontend-only college job portal.
 *
 * Posted jobs and applications are stored in localStorage on this browser.
 * They are not sent to a server and are not shared with other devices or students.
 */

const STORAGE_KEYS = {
  jobs: "campusCareers.postedJobs",
  applications: "campusCareers.applications",
  users: "campusCareers.users",
  session: "campusCareers.session"
};

const SAMPLE_JOBS = [
  {
    id: "sample-frontend",
    title: "Frontend Developer Intern",
    company: "PixelForge Studio",
    type: "Internship",
    category: "Software",
    location: "Bengaluru, hybrid",
    salary: "₹20,000 / month",
    skills: ["HTML", "CSS", "JavaScript"],
    deadline: "2026-12-15",
    description:
      "Work with the student-facing team to build accessible web pages for campus events. You will turn design mockups into HTML, CSS, and JavaScript, fix layout bugs, and join a weekly review. This internship suits students who have built at least one small website and want guided experience.",
    source: "sample"
  },
  {
    id: "sample-design",
    title: "UI/UX Design Intern",
    company: "Northline Design",
    type: "Internship",
    category: "Design",
    location: "Campus design lab",
    salary: "₹15,000 / month",
    skills: ["Figma", "Wireframing", "User research"],
    deadline: "2026-11-28",
    description:
      "Help the design team study how students find campus services, then sketch and prototype clearer screens in Figma. You will prepare simple user flows, join critique sessions, and write short notes about what you learned. A class project or a small portfolio is enough to apply.",
    source: "sample"
  },
  {
    id: "sample-marketing",
    title: "Digital Marketing Intern",
    company: "BrightPath Media",
    type: "Internship",
    category: "Marketing",
    location: "Remote",
    salary: "₹12,000 / month",
    skills: ["Social media", "Copywriting", "Canva"],
    deadline: "2026-10-25",
    description:
      "Support a short campaign for student workshops. You will draft social posts, schedule content, and report which messages students respond to. Clear writing matters more than a long list of tools. The team will review your drafts before anything is published.",
    source: "sample"
  },
  {
    id: "sample-data",
    title: "Data Analyst Intern",
    company: "Helio Analytics",
    type: "Internship",
    category: "Data",
    location: "Hyderabad, on-site",
    salary: "₹22,000 / month",
    skills: ["Excel", "SQL", "Python"],
    deadline: "2026-12-05",
    description:
      "Clean spreadsheet exports, write basic SQL queries, and help explain placement trends in plain language. You will work with sample data. Students who have used Excel and are learning SQL or Python are welcome. Mentors review your queries before they are shared.",
    source: "sample"
  },
  {
    id: "sample-ambassador",
    title: "Campus Ambassador",
    company: "Horizon Tech",
    type: "Part-time",
    category: "Campus",
    location: "Your college campus",
    salary: "₹8,000 / month + incentives",
    skills: ["Communication", "Events", "Social media"],
    deadline: "2026-11-30",
    description:
      "Represent Horizon Tech at your own college. You will host two short info sessions, share approved posts with student clubs, and collect questions from classmates. The hours are meant to sit alongside classes. You do not need prior sales experience.",
    source: "sample"
  },
  {
    id: "sample-trainee",
    title: "Software Developer Trainee",
    company: "Aster Systems",
    type: "Full-time",
    category: "Software",
    location: "Pune, on-site",
    salary: "₹6.5 LPA",
    skills: ["Java", "Data structures", "Git"],
    deadline: "2027-01-15",
    description:
      "A full-time trainee role for students in their final year. The first three months cover version control, debugging, and shipping a small internal tool with a mentor. You should be comfortable with one programming language and basic data structures.",
    source: "sample"
  }
];

/**
 * Illustrative 10-year series for the internship demo.
 * These are not official annual-report figures for any company.
 * "Exits" mixes resignations and role cuts. Public reports rarely split those.
 */
const COMPANY_ANALYTICS = [
  {
    id: "hcl",
    name: "HCLTech",
    blurb: "Sample view of hiring, exits, campus-offer pay, revenue, and profit from 2017 to 2026. Use this as the worked example in the project report.",
    years: [
      { year: 2017, hired: 16400, exits: 12800, salary: 5.8, revenue: 47000, profit: 6200 },
      { year: 2018, hired: 17100, exits: 13200, salary: 6.1, revenue: 50500, profit: 6800 },
      { year: 2019, hired: 18600, exits: 13900, salary: 6.4, revenue: 54800, profit: 7300 },
      { year: 2020, hired: 14200, exits: 15100, salary: 6.6, revenue: 56600, profit: 7100 },
      { year: 2021, hired: 22800, exits: 14600, salary: 7.2, revenue: 64200, profit: 8900 },
      { year: 2022, hired: 26400, exits: 17200, salary: 8.1, revenue: 75600, profit: 11200 },
      { year: 2023, hired: 24100, exits: 18900, salary: 8.6, revenue: 82300, profit: 12400 },
      { year: 2024, hired: 21800, exits: 17600, salary: 9.1, revenue: 87500, profit: 13100 },
      { year: 2025, hired: 23200, exits: 16800, salary: 9.6, revenue: 93200, profit: 14200 },
      { year: 2026, hired: 20900, exits: 16100, salary: 10.2, revenue: 98800, profit: 15100 }
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    blurb: "A second sample employer so the same charts can be compared. Numbers are rounded classroom data, not Infosys filings.",
    years: [
      { year: 2017, hired: 21000, exits: 16800, salary: 6.2, revenue: 68400, profit: 14300 },
      { year: 2018, hired: 22400, exits: 17100, salary: 6.5, revenue: 73100, profit: 15400 },
      { year: 2019, hired: 24100, exits: 18400, salary: 6.9, revenue: 82600, profit: 16600 },
      { year: 2020, hired: 18600, exits: 19200, salary: 7.0, revenue: 90700, profit: 17800 },
      { year: 2021, hired: 31200, exits: 17600, salary: 7.8, revenue: 100500, profit: 19400 },
      { year: 2022, hired: 34800, exits: 22100, salary: 8.7, revenue: 121600, profit: 22100 },
      { year: 2023, hired: 27600, exits: 24800, salary: 9.2, revenue: 146800, profit: 24100 },
      { year: 2024, hired: 25400, exits: 21900, salary: 9.8, revenue: 153700, profit: 26200 },
      { year: 2025, hired: 26100, exits: 20400, salary: 10.4, revenue: 162400, profit: 27400 },
      { year: 2026, hired: 24300, exits: 19800, salary: 11.1, revenue: 171200, profit: 28900 }
    ]
  },
  {
    id: "wipro",
    name: "Wipro",
    blurb: "A third sample series with a slower salary climb and a dip in hiring during 2020 and 2023.",
    years: [
      { year: 2017, hired: 15200, exits: 12100, salary: 5.4, revenue: 55200, profit: 8500 },
      { year: 2018, hired: 15800, exits: 12600, salary: 5.6, revenue: 54500, profit: 8000 },
      { year: 2019, hired: 16700, exits: 13400, salary: 5.9, revenue: 58900, profit: 9000 },
      { year: 2020, hired: 12100, exits: 14800, salary: 6.0, revenue: 61000, profit: 9700 },
      { year: 2021, hired: 19800, exits: 13200, salary: 6.6, revenue: 67800, profit: 10800 },
      { year: 2022, hired: 23600, exits: 16900, salary: 7.4, revenue: 79100, profit: 12200 },
      { year: 2023, hired: 15400, exits: 18700, salary: 7.6, revenue: 90500, profit: 11300 },
      { year: 2024, hired: 16800, exits: 15900, salary: 8.0, revenue: 89800, profit: 11800 },
      { year: 2025, hired: 17600, exits: 15100, salary: 8.4, revenue: 94200, profit: 12600 },
      { year: 2026, hired: 18100, exits: 14700, salary: 8.9, revenue: 98600, profit: 13200 }
    ]
  },
  companySeries("tcs", "TCS", { hired: 28000, exits: 19000, salary: 6.4, step: 0.45, revenue: 118000, rev: 1.07, profit: 26000, prof: 1.06, dip2023: 0.9 }),
  companySeries("accenture", "Accenture", { hired: 32000, exits: 24000, salary: 7.1, step: 0.5, revenue: 210000, rev: 1.06, profit: 28000, prof: 1.05, dip2023: 0.88 }),
  companySeries("cognizant", "Cognizant", { hired: 26000, exits: 21000, salary: 6.0, step: 0.38, revenue: 98000, rev: 1.05, profit: 14000, prof: 1.04, dip2023: 0.8 }),
  companySeries("techm", "Tech Mahindra", { hired: 14000, exits: 12000, salary: 5.5, step: 0.36, revenue: 31000, rev: 1.06, profit: 3800, prof: 1.05, dip2023: 0.84 }),
  companySeries("capgemini", "Capgemini", { hired: 22000, exits: 17000, salary: 6.3, step: 0.42, revenue: 125000, rev: 1.07, profit: 11000, prof: 1.06, dip2023: 0.86 }),
  companySeries("ibm", "IBM", { hired: 18000, exits: 16000, salary: 7.4, step: 0.4, revenue: 540000, rev: 1.02, profit: 62000, prof: 1.03, dip2023: 0.92 }),
  companySeries("amazon", "Amazon", { hired: 36000, exits: 25000, salary: 12.5, step: 0.7, revenue: 980000, rev: 1.12, profit: 24000, prof: 1.08, dip2023: 0.75 })
];

function companySeries(id, name, seed) {
  const years = [];
  for (let i = 0; i < 10; i += 1) {
    const year = 2017 + i;
    const hiringShock = year === 2020 ? 0.74 : year === 2023 ? seed.dip2023 : 1;
    const exitShock = year === 2020 ? 1.16 : 1;
    years.push({
      year,
      hired: Math.round(seed.hired * Math.pow(1.03, i) * hiringShock),
      exits: Math.round(seed.exits * Math.pow(1.025, i) * exitShock),
      salary: Math.round((seed.salary + i * seed.step) * 10) / 10,
      revenue: Math.round(seed.revenue * Math.pow(seed.rev, i)),
      profit: Math.round(seed.profit * Math.pow(seed.prof, i))
    });
  }
  return {
    id,
    name,
    blurb: `Sample classroom series for ${name} from 2017 to 2026. These are not official filings.`,
    years
  };
}

const state = {
  postedJobs: [],
  applications: [],
  users: [],
  session: null,
  query: "",
  category: "all",
  type: "all",
  storageAvailable: false,
  activeJobId: null,
  analyticsCompanyId: "hcl"
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheElements();
  state.storageAvailable = storageWorks();
  state.postedJobs = readJson(STORAGE_KEYS.jobs, []);
  state.applications = readJson(STORAGE_KEYS.applications, []);
  state.users = readJson(STORAGE_KEYS.users, []);
  state.session = readJson(STORAGE_KEYS.session, null);
  if (!state.session || !state.users.some((user) => user.id === state.session.id)) {
    state.session = null;
  }
  document.getElementById("year").textContent = String(new Date().getFullYear());
  els.deadline.min = todayISODate();
  bindEvents();
  render();

  if (!state.storageAvailable) {
    notify("This browser is not storing data. A refresh will clear applications and posted jobs.", "error");
  }
}

function cacheElements() {
  els.nav = document.getElementById("site-nav");
  els.navToggle = document.getElementById("nav-toggle");
  els.heroQuery = document.getElementById("hero-query");
  els.heroCategory = document.getElementById("hero-category");
  els.jobsQuery = document.getElementById("jobs-query");
  els.jobsCategory = document.getElementById("jobs-category");
  els.jobsType = document.getElementById("jobs-type");
  els.jobsList = document.getElementById("jobs-list");
  els.jobsEmpty = document.getElementById("jobs-empty");
  els.jobsCount = document.getElementById("jobs-count");
  els.applicationsList = document.getElementById("applications-list");
  els.applicationsEmpty = document.getElementById("applications-empty");
  els.postForm = document.getElementById("post-form");
  els.applyForm = document.getElementById("apply-form");
  els.deadline = document.getElementById("job-deadline");
  els.detailsDialog = document.getElementById("details-dialog");
  els.applyDialog = document.getElementById("apply-dialog");
  els.profileDialog = document.getElementById("profile-dialog");
  els.toast = document.getElementById("toast");
  els.analyticsCompany = document.getElementById("analytics-company");
  els.analyticsSummary = document.getElementById("analytics-summary");
  els.analyticsRows = document.getElementById("analytics-rows");
  els.chartPeople = document.getElementById("chart-people");
  els.chartMoney = document.getElementById("chart-money");
}

function bindEvents() {
  els.navToggle.addEventListener("click", toggleNav);

  els.nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });

  document.getElementById("hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    setFilters({
      query: els.heroQuery.value,
      category: els.heroCategory.value
    });
    document.getElementById("jobs").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  els.heroQuery.addEventListener("input", () => {
    setFilters({ query: els.heroQuery.value });
  });
  els.jobsQuery.addEventListener("input", () => {
    setFilters({ query: els.jobsQuery.value });
  });
  els.heroCategory.addEventListener("change", () => {
    setFilters({ category: els.heroCategory.value });
  });
  els.jobsCategory.addEventListener("change", () => {
    setFilters({ category: els.jobsCategory.value });
  });
  els.jobsType.addEventListener("change", () => {
    setFilters({ type: els.jobsType.value });
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    setFilters({ query: "", category: "all", type: "all" });
    els.heroQuery.value = "";
    els.jobsQuery.value = "";
  });

  document.getElementById("jobs-filter").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  els.postForm.addEventListener("submit", onPostJob);
  els.applyForm.addEventListener("submit", onApply);
  document.getElementById("login-form").addEventListener("submit", onLogin);
  document.getElementById("register-form").addEventListener("submit", onRegister);
  document.getElementById("show-login").addEventListener("click", () => showAuthMode("login"));
  document.getElementById("show-register").addEventListener("click", () => showAuthMode("register"));
  document.getElementById("logout-button").addEventListener("click", logout);

  document.getElementById("open-profile").addEventListener("click", openProfile);
  document.getElementById("close-details").addEventListener("click", () => els.detailsDialog.close());
  document.getElementById("close-apply").addEventListener("click", () => els.applyDialog.close());
  document.getElementById("close-profile").addEventListener("click", () => els.profileDialog.close());
  document.getElementById("details-apply").addEventListener("click", () => {
    if (state.activeJobId) openApply(state.activeJobId);
  });

  [els.detailsDialog, els.applyDialog, els.profileDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  COMPANY_ANALYTICS.forEach((company) => {
    const option = document.createElement("option");
    option.value = company.id;
    option.textContent = company.name;
    els.analyticsCompany.append(option);
  });
  els.analyticsCompany.value = state.analyticsCompanyId;
  els.analyticsCompany.addEventListener("change", () => {
    state.analyticsCompanyId = els.analyticsCompany.value;
    renderAnalytics();
  });
}

function setFilters(partial) {
  if (Object.prototype.hasOwnProperty.call(partial, "query")) {
    state.query = partial.query;
    if (els.heroQuery.value !== state.query) els.heroQuery.value = state.query;
    if (els.jobsQuery.value !== state.query) els.jobsQuery.value = state.query;
  }
  if (Object.prototype.hasOwnProperty.call(partial, "category")) {
    state.category = partial.category;
    els.heroCategory.value = state.category;
    els.jobsCategory.value = state.category;
  }
  if (Object.prototype.hasOwnProperty.call(partial, "type")) {
    state.type = partial.type;
    els.jobsType.value = state.type;
  }
  renderJobs();
}

function allJobs() {
  return [...state.postedJobs, ...SAMPLE_JOBS];
}

function findJob(jobId) {
  return allJobs().find((job) => job.id === jobId) || null;
}

function visibleJobs() {
  const query = state.query.trim().toLowerCase();
  return allJobs().filter((job) => {
    const haystack = `${job.title} ${job.company}`.toLowerCase();
    const matchesQuery = query === "" || haystack.includes(query);
    const matchesCategory = state.category === "all" || job.category === state.category;
    const matchesType = state.type === "all" || job.type === state.type;
    return matchesQuery && matchesCategory && matchesType;
  });
}

function render() {
  renderAccount();
  renderJobs();
  renderApplications();
  renderStats();
  renderAnalytics();
}

function renderStats() {
  const jobs = allJobs();
  document.getElementById("stat-roles").textContent = String(jobs.length);
  document.getElementById("stat-internships").textContent = String(
    jobs.filter((job) => job.type === "Internship").length
  );
  document.getElementById("stat-applications").textContent = String(myApplications().length);
}

function renderJobs() {
  const jobs = visibleJobs();
  els.jobsList.replaceChildren();
  els.jobsEmpty.hidden = jobs.length > 0;

  const noun = jobs.length === 1 ? "role" : "roles";
  els.jobsCount.textContent = state.query || state.category !== "all" || state.type !== "all"
    ? `${jobs.length} ${noun} match`
    : `${jobs.length} open ${noun}`;

  jobs.forEach((job) => {
    const card = document.createElement("article");
    card.className = "job-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${job.title} at ${job.company}`);

    const top = document.createElement("div");
    top.className = "card-top";
    top.append(badge(job.type), deadlineLabel(job.deadline));

    const title = document.createElement("h3");
    title.textContent = job.title;

    const company = document.createElement("p");
    company.className = "company";
    company.textContent = job.company;

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = `${job.location} · ${job.salary}`;

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "btn btn-ghost";
    detailsButton.textContent = "View details";
    detailsButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openDetails(job.id);
    });

    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.className = "btn btn-primary";
    applyButton.textContent = "Apply Now";
    applyButton.disabled = isDeadlinePassed(job.deadline);
    applyButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openApply(job.id);
    });

    actions.append(detailsButton, applyButton);
    card.append(top, title, company, meta, skillList(job.skills), actions);

    card.addEventListener("click", () => openDetails(job.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target === card) openDetails(job.id);
    });

    els.jobsList.append(card);
  });
}

function myApplications() {
  if (!state.session) return [];
  return state.applications.filter((item) => item.email === state.session.email);
}

function renderApplications() {
  const applications = myApplications();
  els.applicationsList.replaceChildren();
  els.applicationsEmpty.hidden = applications.length > 0;
  els.applicationsEmpty.textContent = state.session
    ? "You have not applied to any jobs from this account yet."
    : "Log in to see the applications saved for your account on this computer.";

  applications.forEach((application) => {
    const card = document.createElement("article");
    card.className = "application-card";

    const title = document.createElement("h3");
    title.textContent = application.jobTitle;

    const company = document.createElement("p");
    company.className = "company";
    company.textContent = application.company;

    const date = document.createElement("p");
    date.textContent = `Applied ${formatDateTime(application.appliedAt)}`;

    const status = document.createElement("p");
    const statusBadge = document.createElement("span");
    statusBadge.className = "badge badge-submitted";
    statusBadge.textContent = application.status;
    status.append(statusBadge);

    card.append(title, company, date, status);
    els.applicationsList.append(card);
  });

  renderStats();
}

function selectedCompany() {
  return COMPANY_ANALYTICS.find((company) => company.id === state.analyticsCompanyId) || COMPANY_ANALYTICS[0];
}

function renderAnalytics() {
  const company = selectedCompany();
  const years = company.years;
  const first = years[0];
  const last = years[years.length - 1];
  const hired = years.reduce((sum, row) => sum + row.hired, 0);
  const exits = years.reduce((sum, row) => sum + row.exits, 0);
  const salaryGain = percentChange(first.salary, last.salary);
  const revenueGain = percentChange(first.revenue, last.revenue);
  const profitGain = percentChange(first.profit, last.profit);

  document.getElementById("analytics-note").textContent =
    `${company.blurb} Salary is the sample average fresher offer in ₹ lakh per year. Revenue and profit are sample ₹ crore figures.`;
  document.getElementById("analytics-caption").textContent =
    `${company.name}, 2017–2026. Sample data for this internship project, not an official filing.`;

  const cards = [
    ["People hired", formatCount(hired), "Total across 10 years"],
    ["Exits", formatCount(exits), "Left the company"],
    ["Net workforce", signedCount(hired - exits), "Hired minus exits"],
    ["Salary gain", signedPercent(salaryGain), `${formatLpa(first.salary)} to ${formatLpa(last.salary)}`],
    ["Revenue gain", signedPercent(revenueGain), `${formatCrore(first.revenue)} to ${formatCrore(last.revenue)}`],
    ["Profit gain", signedPercent(profitGain), `${formatCrore(first.profit)} to ${formatCrore(last.profit)}`]
  ];

  els.analyticsSummary.replaceChildren();
  cards.forEach(([label, value, detail]) => {
    const card = document.createElement("article");
    card.className = "summary-card";
    const name = document.createElement("span");
    name.textContent = label;
    const strong = document.createElement("strong");
    strong.textContent = value;
    const note = document.createElement("span");
    note.textContent = detail;
    card.append(name, strong, note);
    els.analyticsSummary.append(card);
  });

  const maxPeople = Math.max(...years.map((row) => Math.max(row.hired, row.exits)));
  const maxSalary = Math.max(...years.map((row) => row.salary));
  const maxRevenue = Math.max(...years.map((row) => row.revenue));
  els.chartPeople.replaceChildren();
  els.chartMoney.replaceChildren();
  els.analyticsRows.replaceChildren();

  years.forEach((row, index) => {
    els.chartPeople.append(barColumn(row.year, [
      { value: row.hired, max: maxPeople, className: "bar" },
      { value: row.exits, max: maxPeople, className: "bar bar-exits" }
    ]));
    els.chartMoney.append(barColumn(row.year, [
      { value: row.salary, max: maxSalary, className: "bar bar-salary" },
      { value: row.revenue, max: maxRevenue, className: "bar bar-revenue" }
    ]));

    const previous = index === 0 ? null : years[index - 1];
    const salaryDelta = previous ? percentChange(previous.salary, row.salary) : 0;
    const tr = document.createElement("tr");
    [
      String(row.year),
      formatCount(row.hired),
      formatCount(row.exits),
      signedCount(row.hired - row.exits),
      formatLpa(row.salary),
      index === 0 ? "—" : signedPercent(salaryDelta),
      formatCrore(row.revenue),
      formatCrore(row.profit)
    ].forEach((text, cellIndex) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      if (cellIndex === 3 || cellIndex === 5) {
        const numeric = cellIndex === 3 ? row.hired - row.exits : salaryDelta;
        if (!(cellIndex === 5 && index === 0)) {
          cell.className = numeric < 0 ? "delta-down" : "delta-up";
        }
      }
      tr.append(cell);
    });
    els.analyticsRows.append(tr);
  });

  els.chartPeople.setAttribute(
    "aria-label",
    `${company.name} hired ${formatCount(hired)} people and recorded ${formatCount(exits)} exits from 2017 to 2026.`
  );
  els.chartMoney.setAttribute(
    "aria-label",
    `${company.name} average salary moved from ${formatLpa(first.salary)} to ${formatLpa(last.salary)}, and revenue moved from ${formatCrore(first.revenue)} to ${formatCrore(last.revenue)}.`
  );
}

function barColumn(year, bars) {
  const column = document.createElement("div");
  column.className = "bar-col";
  const pair = document.createElement("div");
  pair.className = "bar-pair";
  bars.forEach((bar) => {
    const element = document.createElement("div");
    element.className = bar.className;
    const height = Math.max(6, Math.round((bar.value / bar.max) * 100));
    element.style.height = `${height}%`;
    element.title = String(bar.value);
    pair.append(element);
  });
  const label = document.createElement("span");
  label.textContent = String(year).slice(2);
  column.append(pair, label);
  return column;
}

function percentChange(start, end) {
  if (!start) return 0;
  return ((end - start) / start) * 100;
}

function signedPercent(value) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

function signedCount(value) {
  return `${value > 0 ? "+" : ""}${formatCount(value)}`;
}

function formatCount(value) {
  return Number(value).toLocaleString("en-IN");
}

function formatLpa(value) {
  return `₹${value} LPA`;
}

function formatCrore(value) {
  return `₹${formatCount(value)} cr`;
}

function openDetails(jobId) {
  const job = findJob(jobId);
  if (!job) return;
  state.activeJobId = job.id;

  document.getElementById("details-type").textContent = `${job.type} · ${job.category}`;
  document.getElementById("details-title").textContent = job.title;
  document.getElementById("details-company").textContent = job.company;
  document.getElementById("details-location").textContent = job.location;
  document.getElementById("details-salary").textContent = job.salary;
  document.getElementById("details-deadline").textContent = formatDate(job.deadline);
  document.getElementById("details-category").textContent = job.category;
  document.getElementById("details-description").textContent = job.description;

  const skills = document.getElementById("details-skills");
  skills.replaceChildren();
  job.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skills.append(item);
  });

  const applyButton = document.getElementById("details-apply");
  const closed = isDeadlinePassed(job.deadline);
  applyButton.disabled = closed;
  applyButton.textContent = closed ? "Deadline passed" : "Apply Now";
  els.detailsDialog.showModal();
}

function openApply(jobId) {
  const job = findJob(jobId);
  if (!job) return;
  if (isDeadlinePassed(job.deadline)) {
    notify("The application deadline for this job has passed.", "error");
    return;
  }

  if (!state.session) {
    if (els.detailsDialog.open) els.detailsDialog.close();
    notify("Log in first. Your account is saved on this computer.", "error");
    openProfile();
    return;
  }

  state.activeJobId = job.id;
  if (els.detailsDialog.open) els.detailsDialog.close();

  els.applyForm.reset();
  clearFormErrors(els.applyForm);
  hideAlert("apply-alert");
  document.getElementById("apply-title").textContent = `Apply for ${job.title}`;
  document.getElementById("apply-subtitle").textContent =
    `${job.company} · saved for ${state.session.email} on this computer. Status starts as Submitted.`;
  document.getElementById("student-name").value = state.session.name;
  const emailInput = document.getElementById("student-email");
  emailInput.value = state.session.email;
  emailInput.readOnly = true;

  els.applyDialog.showModal();
  document.getElementById("student-name").focus();
}

function onApply(event) {
  event.preventDefault();
  const submitButton = els.applyForm.querySelector("[type='submit']");
  submitButton.disabled = true;

  try {
    clearFormErrors(els.applyForm);
    hideAlert("apply-alert");

    const job = findJob(state.activeJobId);
    if (!job) {
      showAlert("apply-alert", "That job is no longer available.");
      return;
    }

    const application = {
      studentName: valueOf("student-name"),
      email: valueOf("student-email").toLowerCase(),
      department: valueOf("student-department"),
      year: valueOf("student-year"),
      resumeLink: valueOf("resume-link"),
      coverLetter: valueOf("cover-letter")
    };

    const errors = validateApplication(application);
    const duplicate = state.applications.some(
      (item) => item.jobId === job.id && item.email === application.email
    );
    if (duplicate) {
      errors.push({ id: "student-email", message: "This email already applied to this job in this browser." });
    }

    if (errors.length > 0) {
      showFieldErrors(errors);
      showAlert("apply-alert", "Check the highlighted fields before submitting.");
      focusField(errors[0].id);
      return;
    }

    const record = {
      id: createId("application"),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      ...application,
      appliedAt: new Date().toISOString(),
      status: "Submitted"
    };

    state.applications.unshift(record);
    if (!writeJson(STORAGE_KEYS.applications, state.applications)) {
      state.applications.shift();
      showAlert("apply-alert", "The application could not be saved in this browser.");
      notify("Could not save the application in this browser.", "error");
      return;
    }

    renderApplications();
    els.applyDialog.close();
    notify("Application submitted. Status: Submitted. Saved in this browser only.", "success");
    document.getElementById("applications").scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    submitButton.disabled = false;
  }
}

function validateApplication(application) {
  const errors = [];
  if (application.studentName.length < 2) {
    errors.push({ id: "student-name", message: "Enter the student name." });
  }
  if (!isEmail(application.email)) {
    errors.push({ id: "student-email", message: "Enter a valid college email address." });
  }
  if (!application.department) {
    errors.push({ id: "student-department", message: "Select a department." });
  }
  if (!application.year) {
    errors.push({ id: "student-year", message: "Select a year of study." });
  }
  if (!isHttpUrl(application.resumeLink)) {
    errors.push({ id: "resume-link", message: "Enter a resume link that starts with http:// or https://." });
  }
  if (application.coverLetter.length < 20) {
    errors.push({ id: "cover-letter", message: "Write a short cover letter (at least 20 characters)." });
  }
  return errors;
}

function onPostJob(event) {
  event.preventDefault();
  const submitButton = els.postForm.querySelector("[type='submit']");
  submitButton.disabled = true;

  try {
    clearFormErrors(els.postForm);
    hideAlert("post-alert");

    const draft = {
      title: valueOf("job-title"),
      company: valueOf("job-company"),
      description: valueOf("job-description"),
      type: valueOf("job-type"),
      category: valueOf("job-category"),
      location: valueOf("job-location"),
      salary: valueOf("job-salary"),
      skills: splitSkills(valueOf("job-skills")),
      deadline: valueOf("job-deadline")
    };

    const errors = validateJob(draft);
    if (errors.length > 0) {
      showFieldErrors(errors);
      showAlert("post-alert", "Add the missing or invalid job details.");
      focusField(errors[0].id);
      return;
    }

    const job = {
      id: createId("posted"),
      ...draft,
      source: "posted"
    };

    state.postedJobs.unshift(job);
    if (!writeJson(STORAGE_KEYS.jobs, state.postedJobs)) {
      state.postedJobs.shift();
      showAlert("post-alert", "This browser could not store the job.");
      notify("Could not save the job in this browser.", "error");
      return;
    }

    els.postForm.reset();
    els.deadline.min = todayISODate();
    setFilters({ query: "", category: "all", type: "all" });
    els.heroQuery.value = "";
    els.jobsQuery.value = "";
    render();
    const firstCard = els.jobsList.querySelector(".job-card");
    if (firstCard) firstCard.classList.add("is-new");
    notify("Job posted. It is saved in this browser only.", "success");
    document.getElementById("jobs").scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    submitButton.disabled = false;
  }
}

function validateJob(job) {
  const errors = [];
  if (job.title.length < 3) errors.push({ id: "job-title", message: "Enter a job title." });
  if (job.company.length < 2) errors.push({ id: "job-company", message: "Enter a company name." });
  if (job.description.length < 40) {
    errors.push({ id: "job-description", message: "Describe the role in at least 40 characters." });
  }
  if (!job.type) errors.push({ id: "job-type", message: "Select a job type." });
  if (!job.category) errors.push({ id: "job-category", message: "Select a category." });
  if (job.location.length < 2) errors.push({ id: "job-location", message: "Enter a location." });
  if (job.salary.length < 2) errors.push({ id: "job-salary", message: "Enter a salary or stipend." });
  if (job.skills.length === 0) errors.push({ id: "job-skills", message: "Enter at least one skill." });
  if (!job.deadline) {
    errors.push({ id: "job-deadline", message: "Choose an application deadline." });
  } else if (job.deadline < todayISODate()) {
    errors.push({ id: "job-deadline", message: "The deadline must be today or a future date." });
  }
  return errors;
}

function renderAccount() {
  const button = document.getElementById("open-profile");
  button.textContent = state.session ? state.session.name.split(" ")[0] : "Login / Register";
}

function openProfile() {
  closeNav();
  const loggedIn = Boolean(state.session);
  document.getElementById("auth-guest").hidden = loggedIn;
  document.getElementById("auth-user").hidden = !loggedIn;
  if (loggedIn) {
    document.getElementById("auth-welcome").textContent =
      `${state.session.name} · ${state.session.email}. This login is stored on this computer only.`;
  } else {
    showAuthMode("login");
    hideAlert("login-alert");
    hideAlert("register-alert");
  }
  els.profileDialog.showModal();
  if (!loggedIn) document.getElementById("login-email").focus();
}

function showAuthMode(mode) {
  document.getElementById("login-form").hidden = mode !== "login";
  document.getElementById("register-form").hidden = mode !== "register";
  document.getElementById("show-login").classList.toggle("is-active", mode === "login");
  document.getElementById("show-register").classList.toggle("is-active", mode === "register");
  document.getElementById("profile-title").textContent = mode === "login" ? "Login" : "Register";
  if (mode === "register") document.getElementById("register-name").focus();
}

async function onLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  clearFormErrors(form);
  hideAlert("login-alert");
  const email = valueOf("login-email").toLowerCase();
  const password = document.getElementById("login-password").value;
  const errors = [];
  if (!isEmail(email)) errors.push({ id: "login-email", message: "Enter the email you registered." });
  if (password.length < 6) errors.push({ id: "login-password", message: "Enter your password (at least 6 characters)." });
  if (errors.length > 0) {
    showFieldErrors(errors);
    focusField(errors[0].id);
    return;
  }
  const user = state.users.find((item) => item.email === email);
  if (!user) {
    showAlert("login-alert", "No account with that email is saved on this computer. Register first.");
    return;
  }
  const digest = await hashPassword(password, user.salt);
  if (!safeEqual(digest.hash, user.hash)) {
    showAlert("login-alert", "That password does not match the account saved on this computer.");
    return;
  }
  startSession(user);
  form.reset();
  els.profileDialog.close();
  notify(`Welcome back, ${user.name}. You are logged in on this computer.`, "success");
}

async function onRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  clearFormErrors(form);
  hideAlert("register-alert");
  const name = valueOf("register-name");
  const email = valueOf("register-email").toLowerCase();
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;
  const errors = [];
  if (name.length < 2) errors.push({ id: "register-name", message: "Enter your name." });
  if (!isEmail(email)) errors.push({ id: "register-email", message: "Enter a valid college email." });
  if (password.length < 6) errors.push({ id: "register-password", message: "Use at least 6 characters." });
  if (password !== confirm) errors.push({ id: "register-confirm", message: "Passwords do not match." });
  if (state.users.some((user) => user.email === email)) {
    errors.push({ id: "register-email", message: "That email is already registered on this computer." });
  }
  if (errors.length > 0) {
    showFieldErrors(errors);
    focusField(errors[0].id);
    return;
  }
  const digest = await hashPassword(password);
  const user = {
    id: createId("user"),
    name,
    email,
    salt: digest.salt,
    hash: digest.hash,
    createdAt: new Date().toISOString()
  };
  state.users.push(user);
  if (!writeJson(STORAGE_KEYS.users, state.users)) {
    state.users.pop();
    showAlert("register-alert", "This computer could not store the account.");
    return;
  }
  startSession(user);
  form.reset();
  els.profileDialog.close();
  notify("Account created and saved on this computer. You are logged in.", "success");
}

function startSession(user) {
  state.session = { id: user.id, name: user.name, email: user.email };
  if (!writeJson(STORAGE_KEYS.session, state.session)) {
    notify("Login worked, but this browser could not remember it after refresh.", "error");
  }
  renderAccount();
  renderApplications();
}

function logout() {
  state.session = null;
  removeKey(STORAGE_KEYS.session);
  renderAccount();
  renderApplications();
  els.profileDialog.close();
  notify("You are logged out on this computer.", "success");
}

async function hashPassword(password, saltHex) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 60000, hash: "SHA-256" },
    key,
    256
  );
  return { salt: bytesToHex(salt), hash: bytesToHex(bits) };
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

function safeEqual(left, right) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return diff === 0;
}

function toggleNav() {
  const open = !els.nav.classList.contains("is-open");
  els.nav.classList.toggle("is-open", open);
  els.navToggle.setAttribute("aria-expanded", String(open));
  els.navToggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Open menu";
}

function closeNav() {
  els.nav.classList.remove("is-open");
  els.navToggle.setAttribute("aria-expanded", "false");
  const label = els.navToggle.querySelector(".visually-hidden");
  if (label) label.textContent = "Open menu";
}

function badge(type) {
  const span = document.createElement("span");
  const slug = type.toLowerCase().replace(/\s+/g, "-");
  span.className = `badge badge-${slug}`;
  span.textContent = type;
  return span;
}

function deadlineLabel(deadline) {
  const span = document.createElement("span");
  span.className = "deadline";
  if (isDeadlinePassed(deadline)) {
    span.textContent = "Deadline passed";
    return span;
  }
  const days = daysUntil(deadline);
  span.textContent = days <= 7 ? `Closing ${formatDate(deadline)}` : `Apply by ${formatDate(deadline)}`;
  if (days <= 7) span.classList.add("badge", "badge-soon");
  return span;
}

function skillList(skills) {
  const list = document.createElement("ul");
  list.className = "skills";
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    list.append(item);
  });
  return list;
}

function showFieldErrors(errors) {
  errors.forEach((error) => {
    const input = document.getElementById(error.id);
    const message = document.getElementById(`${error.id}-error`);
    if (!input || !message) return;
    input.setAttribute("aria-invalid", "true");
    input.closest(".field").classList.add("has-error");
    message.textContent = error.message;
  });
}

function clearFormErrors(form) {
  form.querySelectorAll(".field").forEach((field) => field.classList.remove("has-error"));
  form.querySelectorAll("[aria-invalid]").forEach((input) => input.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((message) => {
    message.textContent = "";
  });
}

function showAlert(id, message, success) {
  const alert = document.getElementById(id);
  alert.hidden = false;
  alert.textContent = message;
  alert.classList.toggle("is-success", Boolean(success));
}

function hideAlert(id) {
  const alert = document.getElementById(id);
  alert.hidden = true;
  alert.textContent = "";
  alert.classList.remove("is-success");
}

function focusField(id) {
  const field = document.getElementById(id);
  if (field) field.focus();
}

function valueOf(id) {
  return document.getElementById(id).value.trim();
}

function splitSkills(value) {
  return value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function todayISODate() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function isDeadlinePassed(deadline) {
  return deadline < todayISODate();
}

function daysUntil(deadline) {
  const start = new Date(`${todayISODate()}T00:00:00`);
  const end = new Date(`${deadline}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function formatDateTime(isoDateTime) {
  const date = new Date(isoDateTime);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function createId(prefix) {
  if (window.crypto && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

let toastTimer = 0;

function notify(message, type) {
  els.toast.textContent = message;
  els.toast.className = `toast is-visible is-${type === "error" ? "error" : "success"}`;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    els.toast.className = "toast";
    els.toast.textContent = "";
  }, 4200);
}

function storageWorks() {
  const testKey = "__campusCareersTest";
  try {
    localStorage.setItem(testKey, "ok");
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed.filter(Boolean) : fallback;
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (error) {
    notify("Saved data in this browser could not be read, so the list was left empty.", "error");
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    notify("The saved profile could not be removed.", "error");
  }
}
