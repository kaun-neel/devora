import { reactive, computed, toRefs } from 'vue'

const STORAGE_KEYS = {
  USERS: 'devora_users',
  CURRENT_USER: 'devora_current_user',
  ACTIVITY: 'devora_activity',
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const defaultProfile = {
  name: '',
  title: '',
  bio: '',
  email: '',
  github: '',
  website: '',
  avatar: '',
  memberSince: '',
}

const defaultActivity = {
  inquiriesRun: 0,
  codeDebugs: 0,
  dayStreak: 0,
  daysActive: 0,
  languages: {},
  recentActivity: [],
  badges: [],
  streakDays: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
  lastActiveDate: null,
}

const state = reactive({
  currentUser: loadJSON(STORAGE_KEYS.CURRENT_USER, null),
  activity: loadJSON(STORAGE_KEYS.ACTIVITY, { ...defaultActivity }),
})

function getUsers() {
  return loadJSON(STORAGE_KEYS.USERS, {})
}

function saveUsers(users) {
  saveJSON(STORAGE_KEYS.USERS, users)
}

function syncState() {
  saveJSON(STORAGE_KEYS.CURRENT_USER, state.currentUser)
  saveJSON(STORAGE_KEYS.ACTIVITY, state.activity)
}

function signup(email, password, name) {
  const users = getUsers()
  const key = email.toLowerCase().trim()
  if (users[key]) {
    return { success: false, message: 'An account with this email already exists.' }
  }

  const now = new Date()
  const profile = {
    ...defaultProfile,
    name: name || email.split('@')[0],
    email: key,
    memberSince: now.toISOString(),
    title: 'Developer',
    bio: 'Welcome to Devora!',
  }

  users[key] = { password, profile }
  saveUsers(users)

  state.currentUser = { email: key, ...profile }
  state.activity = { ...defaultActivity, lastActiveDate: now.toISOString() }
  updateStreak()
  syncState()

  return { success: true, message: 'Account created successfully!' }
}

function login(email, password) {
  const users = getUsers()
  const key = email.toLowerCase().trim()
  const user = users[key]

  if (!user) {
    return { success: false, message: 'No account found with this email.' }
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password.' }
  }

  state.currentUser = { email: key, ...user.profile }

  const savedActivity = localStorage.getItem(`devora_activity_${key}`)
  if (savedActivity) {
    state.activity = JSON.parse(savedActivity)
  } else {
    state.activity = { ...defaultActivity, lastActiveDate: new Date().toISOString() }
  }

  updateStreak()
  syncState()
  localStorage.setItem(`devora_activity_${key}`, JSON.stringify(state.activity))

  return { success: true, message: 'Logged in successfully!' }
}

function logout() {
  if (state.currentUser) {
    localStorage.setItem(`devora_activity_${state.currentUser.email}`, JSON.stringify(state.activity))
  }
  state.currentUser = null
  state.activity = { ...defaultActivity }
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  localStorage.removeItem(STORAGE_KEYS.ACTIVITY)
}

function updateProfile(updates) {
  if (!state.currentUser) return

  Object.assign(state.currentUser, updates)

  const users = getUsers()
  const key = state.currentUser.email
  if (users[key]) {
    users[key].profile = { ...users[key].profile, ...updates }
    saveUsers(users)
  }

  syncState()
}

function updateStreak() {
  const now = new Date()
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const today = dayNames[now.getDay()]

  if (state.activity.lastActiveDate) {
    const lastDate = new Date(state.activity.lastActiveDate)
    const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24))

    if (diffDays > 1) {
      state.activity.dayStreak = 1
      state.activity.streakDays = { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false }
    } else if (diffDays === 1) {
      state.activity.dayStreak++
    }
  } else {
    state.activity.dayStreak = 1
  }

  state.activity.streakDays[today] = true
  state.activity.daysActive++
  state.activity.lastActiveDate = now.toISOString()
  syncState()
  saveActivityForUser()
}

function saveActivityForUser() {
  if (state.currentUser) {
    localStorage.setItem(`devora_activity_${state.currentUser.email}`, JSON.stringify(state.activity))
  }
}

function trackLanguageUsage(language) {
  if (!state.currentUser) return
  const lang = language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()
  state.activity.languages[lang] = (state.activity.languages[lang] || 0) + 1
  syncState()
  saveActivityForUser()
  checkBadges()
}

function trackInquiry(prompt, language) {
  if (!state.currentUser) return
  state.activity.inquiriesRun++
  trackLanguageUsage(language === 'auto' ? 'Auto' : language)

  state.activity.recentActivity.unshift({
    type: 'inquiry',
    title: `Code Generation: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`,
    tags: language === 'auto' ? 'AI Auto-detect' : language,
    time: new Date().toISOString(),
    icon: 'code',
    color: 'bg-blue-400',
  })

  if (state.activity.recentActivity.length > 20) {
    state.activity.recentActivity = state.activity.recentActivity.slice(0, 20)
  }

  syncState()
  saveActivityForUser()
  checkBadges()
}

function trackDebug(codeSnippet, language) {
  if (!state.currentUser) return
  state.activity.codeDebugs++
  if (language) trackLanguageUsage(language)

  state.activity.recentActivity.unshift({
    type: 'debug',
    title: `Debug: ${codeSnippet.substring(0, 50)}${codeSnippet.length > 50 ? '...' : ''}`,
    tags: language || 'Auto-detected',
    time: new Date().toISOString(),
    icon: 'bug_report',
    color: 'bg-red-400',
  })

  if (state.activity.recentActivity.length > 20) {
    state.activity.recentActivity = state.activity.recentActivity.slice(0, 20)
  }

  syncState()
  saveActivityForUser()
  checkBadges()
}

function checkBadges() {
  const badges = []

  if (state.activity.inquiriesRun >= 10) {
    badges.push({ id: 'code-explorer', name: 'Code Explorer', icon: 'explore', bgColor: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30', iconBg: 'bg-blue-400' })
  }
  if (state.activity.codeDebugs >= 5) {
    badges.push({ id: 'bug-squasher', name: 'Bug Squasher', icon: 'bug_report', bgColor: 'bg-red-100', darkBg: 'dark:bg-red-900/30', iconBg: 'bg-red-400' })
  }
  if (state.activity.dayStreak >= 3) {
    badges.push({ id: 'streak-starter', name: 'Streak Starter', icon: 'local_fire_department', bgColor: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30', iconBg: 'bg-orange-400' })
  }
  if (state.activity.dayStreak >= 7) {
    badges.push({ id: 'consistency', name: 'Consistency', icon: 'emoji_events', bgColor: 'bg-amber-100', darkBg: 'dark:bg-amber-900/30', iconBg: 'bg-amber-400' })
  }
  if (Object.keys(state.activity.languages).length >= 3) {
    badges.push({ id: 'polyglot', name: 'Polyglot', icon: 'translate', bgColor: 'bg-green-100', darkBg: 'dark:bg-green-900/30', iconBg: 'bg-green-400' })
  }
  if (state.activity.inquiriesRun + state.activity.codeDebugs >= 50) {
    badges.push({ id: 'power-user', name: 'Power User', icon: 'bolt', bgColor: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30', iconBg: 'bg-primary' })
  }
  if (state.activity.inquiriesRun >= 100) {
    badges.push({ id: 'top-coder', name: 'Top 1% Coder', icon: 'military_tech', bgColor: 'bg-yellow-100', darkBg: 'dark:bg-yellow-900/30', iconBg: 'bg-yellow-400' })
  }

  state.activity.badges = badges
  syncState()
  saveActivityForUser()
}

const isLoggedIn = computed(() => !!state.currentUser)

const languageStats = computed(() => {
  const langs = state.activity.languages
  const total = Object.values(langs).reduce((a, b) => a + b, 0)
  if (total === 0) return []

  return Object.entries(langs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
    }))
})

function getTimeAgo(isoString) {
  const now = new Date()
  const date = new Date(isoString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

export function useUserStore() {
  return {
    ...toRefs(state),
    isLoggedIn,
    languageStats,
    signup,
    login,
    logout,
    updateProfile,
    trackInquiry,
    trackDebug,
    trackLanguageUsage,
    getTimeAgo,
  }
}
