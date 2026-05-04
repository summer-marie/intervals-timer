// ===== STATE =====
const state = {
  // Settings
  roundDuration: 30,
  roundCount: 1,
  roundBreakDuration: 0,
  sets: 3,
  breakDuration: 30,
  currentBg: 'hero-pattern-temple',
  currentColor: {
    id: 'dark-gray',
    primary: '#1a202c',
    secondary: '#374151'
  },
  currentPreset: 'custom',

  // Timer state
  isRunning: false,
  isPaused: false,
  currentSet: 1,
  currentRound: 1,
  timeLeft: 0,
  isBreak: false,
  isRoundBreak: false,
  isComplete: false,
  intervalId: null,
  totalElapsedTime: 0,

  // Audio
  isMuted: false,
  audioContext: null,
  
  // Voice
  voiceEnabled: true
};

// ===== DATA =====
const presets = [
  {
    id: 'custom',
    name: 'Custom',
    desc: 'Design your own workout',
    config: null
  },
  {
    id: 'tabata',
    name: 'Tabata Classic',
    desc: '8 rounds × 20s work / 10s rest',
    config: {
      roundCount: 8,
      roundDuration: 20,
      roundBreakDuration: 10,
      sets: 1,
      breakDuration: 0
    }
  },
  {
    id: 'amrap',
    name: 'AMRAP Intervals',
    desc: '10 rounds × 40s / 20s, 3 sets',
    config: {
      roundCount: 10,
      roundDuration: 40,
      roundBreakDuration: 20,
      sets: 3,
      breakDuration: 60
    }
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    desc: '5 rounds × 30s / 15s, 3 sets',
    config: {
      roundCount: 5,
      roundDuration: 30,
      roundBreakDuration: 15,
      sets: 3,
      breakDuration: 45
    }
  },
  {
    id: 'endurance',
    name: 'Endurance Block',
    desc: '6 rounds × 45s / 15s, 4 sets',
    config: {
      roundCount: 6,
      roundDuration: 45,
      roundBreakDuration: 15,
      sets: 4,
      breakDuration: 90
    }
  },
  {
    id: 'sprint',
    name: 'Sprint Intervals',
    desc: '10 rounds × 15s / 45s, 3 sets',
    config: {
      roundCount: 10,
      roundDuration: 15,
      roundBreakDuration: 45,
      sets: 3,
      breakDuration: 60
    }
  }
];

const backgrounds = [
  { id: '4-point-stars', name: '4-Point Stars', className: 'hero-pattern-4-point-stars' },
  { id: 'temple', name: 'Temple', className: 'hero-pattern-temple' },
  { id: 'bubbles', name: 'Bubbles', className: 'hero-pattern-bubbles' },
  { id: 'moroccan', name: 'Moroccan', className: 'hero-pattern-moroccan' },
  { id: 'circuit-board', name: 'Circuit Board', className: 'hero-pattern-circuit-board' },
  { id: 'slanted-stars', name: 'Slanted Stars', className: 'hero-pattern-slanted-stars' },
  { id: 'curtain', name: 'Curtain', className: 'hero-pattern-curtain' },
  { id: 'glamorous', name: 'Glamorous', className: 'hero-pattern-glamorous' }
];

const colors = [
  { id: 'dark-gray', name: 'Dark Gray', primary: '#1a202c', secondary: '#374151' },
  { id: 'teal-blue', name: 'Teal Blue', primary: '#045d72', secondary: '#050505' },
  { id: 'purple-night', name: 'Purple Night', primary: '#2d1b69', secondary: '#8b5cf6' },
  { id: 'forest-green', name: 'Forest Green', primary: '#064e3b', secondary: '#10b981' },
  { id: 'crimson-red', name: 'Crimson Red', primary: '#7f1d1d', secondary: '#ef4444' },
  { id: 'midnight-blue', name: 'Midnight Blue', primary: '#1e3a8a', secondary: '#3b82f6' },
  { id: 'amber-gold', name: 'Amber Gold', primary: '#92400e', secondary: '#f59e0b' },
  { id: 'pink', name: 'Pink', primary: '#c2185b', secondary: '#e91e8c' },
  { id: 'pastel-green', name: 'Pastel Green', primary: '#6dbf87', secondary: '#a8d8b9' },
  { id: 'pastel-blue', name: 'Pastel Blue', primary: '#6aafd6', secondary: '#a8cfe8' },
  { id: 'pastel-grey', name: 'Soft Grey', primary: '#9eaab5', secondary: '#c8d3da' },
  { id: 'pastel-cream', name: 'Off White', primary: '#c8bfa8', secondary: '#e8e0d0' },
  { id: 'chrome-red', name: 'Chrome Red', primary: '#c0392b', secondary: '#922b21' },
  { id: 'chrome-slate', name: 'Chrome Slate', primary: '#5d6d7e', secondary: '#2e4057' },
  { id: 'chrome-purple', name: 'Chrome Purple', primary: '#7d3c98', secondary: '#4a235a' }
];

const motivationalMessages = [
  "You absolutely crushed it! 💪",
  "Beast mode: COMPLETED! 🔥",
  "That was incredible! Keep it up! ⚡",
  "You're unstoppable! Amazing work! 🌟",
  "Legendary performance! You earned this! 🏆",
  "Stronger every day! You did it! 💯"
];

// ===== AUDIO SYSTEM (Web Audio API) =====
function initAudio() {
  if (!state.audioContext) {
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// ===== VOICE SYSTEM (Web Speech API) =====
function speak(text) {
  if (!state.voiceEnabled) return;
  if (!window.speechSynthesis) return;
  
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.15;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  // Use selected voice if available
  const voiceSelect = document.getElementById('voiceSelect');
  const voices = window.speechSynthesis.getVoices();
  if (voiceSelect && voiceSelect.value !== '' && voices[voiceSelect.value]) {
    utterance.voice = voices[voiceSelect.value];
  }
  
  window.speechSynthesis.speak(utterance);
}

function loadVoices() {
  const voiceSelect = document.getElementById('voiceSelect');
  if (!voiceSelect) return;
  
  const voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = voice.name + ' (' + voice.lang + ')';
    voiceSelect.appendChild(option);
  });
  
  // Auto-select an English voice by default
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  if (englishVoice) {
    voiceSelect.value = voices.indexOf(englishVoice);
  }
}

function updateVoiceSelectVisibility() {
  const voiceSelectGroup = document.getElementById('voiceSelectGroup');
  if (state.voiceEnabled) {
    voiceSelectGroup.classList.add('visible');
  } else {
    voiceSelectGroup.classList.remove('visible');
  }
}

function playBeep(frequency = 880, duration = 0.1, volume = 0.3) {
  if (state.isMuted || !state.audioContext) return;

  const oscillator = state.audioContext.createOscillator();
  const gainNode = state.audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(state.audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, state.audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, state.audioContext.currentTime + duration);

  oscillator.start(state.audioContext.currentTime);
  oscillator.stop(state.audioContext.currentTime + duration);
}

function playDoubleBeep() {
  playBeep(880, 0.1);
  setTimeout(() => playBeep(880, 0.1), 150);
}

function playCountdownBeep() {
  playBeep(660, 0.15, 0.2);
}

function playCompletionMelody() {
  if (state.isMuted) return;
  playBeep(523, 0.2); // C
  setTimeout(() => playBeep(659, 0.2), 250); // E
  setTimeout(() => playBeep(784, 0.4), 500); // G
}

// ===== TIMER LOGIC =====
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) {
    return secs.toString().padStart(2, '0');
  }
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  readSettingsFromInputs();
  
  state.isRunning = true;
  state.isPaused = false;
  state.currentSet = 1;
  state.currentRound = 1;
  state.timeLeft = state.roundDuration;
  state.isBreak = false;
  state.isRoundBreak = false;
  state.isComplete = false;
  state.totalElapsedTime = 0;

  initAudio();
  playBeep();
  speak("Let's go!");

  updateUI();
  showTimerDisplay();

  state.intervalId = setInterval(timerTick, 1000);
}

function timerTick() {
  if (state.isPaused) return;

  // Countdown beeps for last 3 seconds of work intervals
  if (!state.isBreak && !state.isRoundBreak && state.timeLeft <= 3 && state.timeLeft > 0) {
    playCountdownBeep();
  }
  
  // Voice countdown at 3 seconds during work intervals
  if (!state.isBreak && !state.isRoundBreak && state.timeLeft === 3) {
    speak("3, 2, 1");
  }

  state.timeLeft--;
  state.totalElapsedTime++;

  if (state.timeLeft < 0) {
    handleIntervalComplete();
  } else {
    updateUI();
  }
}

function handleIntervalComplete() {
  if (state.isBreak) {
    // Set break is over, start next set
    state.currentSet++;
    state.currentRound = 1;
    state.timeLeft = state.roundDuration;
    state.isBreak = false;
    state.isRoundBreak = false;
    playBeep();
    speak("Begin!");
  } else if (state.isRoundBreak) {
    // Round break is over, continue to next round
    state.currentRound++;
    state.timeLeft = state.roundDuration;
    state.isRoundBreak = false;
    playBeep();
    speak("Begin!");
  } else {
    // Round is over
    if (state.currentRound < state.roundCount) {
      // More rounds in this set
      if (state.roundBreakDuration > 0) {
        // Break between rounds
        state.timeLeft = state.roundBreakDuration;
        state.isRoundBreak = true;
        playDoubleBeep();
        speak("Rest");
      } else {
        // No round break, continue to next round
        state.currentRound++;
        state.timeLeft = state.roundDuration;
        playBeep();
        speak("Begin!");
      }
    } else {
      // Set completed
      if (state.currentSet < state.sets) {
        // Not the last set
        if (state.breakDuration > 0) {
          state.timeLeft = state.breakDuration;
          state.isBreak = true;
          playDoubleBeep();
          speak("Set break. Rest up.");
        } else {
          // No break, go to next set
          state.currentSet++;
          state.currentRound = 1;
          state.timeLeft = state.roundDuration;
          playBeep();
          speak("Begin!");
        }
      } else {
        // Workout complete!
        completeWorkout();
        return;
      }
    }
  }

  updateUI();
}

function pauseTimer() {
  state.isPaused = true;
  speak("Paused");
  updateUI();
}

function resumeTimer() {
  state.isPaused = false;
  speak("Resume in 3, 2, 1");
  updateUI();
}

function stopTimer() {
  clearInterval(state.intervalId);
  state.isRunning = false;
  state.isPaused = false;
  state.currentSet = 1;
  state.currentRound = 1;
  state.timeLeft = 0;
  state.isBreak = false;
  state.isRoundBreak = false;
  state.isComplete = false;
  state.totalElapsedTime = 0;
  
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  
  showSettingsPanel();
}

function completeWorkout() {
  clearInterval(state.intervalId);
  state.isRunning = false;
  state.isComplete = true;

  playCompletionMelody();
  speak("Workout complete. Great job!");

  // Calculate summary
  const totalRounds = state.sets * state.roundCount;
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  document.getElementById('totalTime').textContent = formatTime(state.totalElapsedTime);
  document.getElementById('totalRounds').textContent = totalRounds;
  document.getElementById('setsCompleted').textContent = state.sets;
  document.getElementById('completionMessage').textContent = randomMessage;

  showCompletionScreen();
}

// ===== UI UPDATE =====
function updateUI() {
  // Update header
  document.getElementById('setInfo').textContent = `Set ${state.currentSet} of ${state.sets}`;
  document.getElementById('roundInfo').textContent = `Round ${state.currentRound} of ${state.roundCount}`;

  // Update phase label
  let phaseText = 'Work Time';
  if (state.isPaused) {
    phaseText += ' - PAUSED';
  } else if (state.isBreak) {
    phaseText = 'Set Break';
  } else if (state.isRoundBreak) {
    phaseText = 'Round Break';
  }
  document.getElementById('phaseLabel').textContent = phaseText;

  // Update countdown number
  const countdownNumber = document.getElementById('countdownNumber');
  countdownNumber.textContent = formatTime(state.timeLeft);

  // Update countdown ring
  updateCountdownRing();

  // Update break styling
  const timerDisplay = document.getElementById('timerDisplay');
  const countdownProgress = document.getElementById('countdownProgress');
  
  if (state.isBreak || state.isRoundBreak) {
    timerDisplay.classList.add('break-phase');
    countdownNumber.classList.add('break');
    countdownProgress.classList.add('break');
  } else {
    timerDisplay.classList.remove('break-phase');
    countdownNumber.classList.remove('break');
    countdownProgress.classList.remove('break');
  }

  // Update pause/resume buttons
  if (state.isPaused) {
    document.getElementById('pauseBtn').classList.add('hidden');
    document.getElementById('resumeBtn').classList.remove('hidden');
  } else {
    document.getElementById('pauseBtn').classList.remove('hidden');
    document.getElementById('resumeBtn').classList.add('hidden');
  }

  // Update progress dots
  updateProgressDots();
}

function updateCountdownRing() {
  const progress = document.getElementById('countdownProgress');
  const radius = 140;
  const circumference = 2 * Math.PI * radius;

  let totalDuration;
  if (state.isBreak) {
    totalDuration = state.breakDuration;
  } else if (state.isRoundBreak) {
    totalDuration = state.roundBreakDuration;
  } else {
    totalDuration = state.roundDuration;
  }

  const progressValue = state.timeLeft / totalDuration;
  const offset = circumference * (1 - progressValue);

  progress.style.strokeDasharray = `${circumference} ${circumference}`;
  progress.style.strokeDashoffset = offset;
}

function updateProgressDots() {
  const dotsContainer = document.getElementById('progressDots');
  dotsContainer.innerHTML = '';

  for (let i = 1; i <= state.roundCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    
    if (i < state.currentRound) {
      dot.classList.add('completed');
    } else if (i === state.currentRound && !state.isRoundBreak) {
      dot.classList.add('current');
    } else if (i === state.currentRound && state.isRoundBreak) {
      dot.classList.add('completed');
    }
    
    dotsContainer.appendChild(dot);
  }
}

function readSettingsFromInputs() {
  state.roundCount = parseInt(document.getElementById('roundCount').value) || 1;
  state.roundDuration = parseInt(document.getElementById('roundDuration').value);
  state.roundBreakDuration = parseInt(document.getElementById('roundBreakDuration').value);
  state.sets = parseInt(document.getElementById('sets').value);
  state.breakDuration = parseInt(document.getElementById('breakDuration').value);
}

function updateSettingsInputs() {
  document.getElementById('roundCount').value = state.roundCount;
  document.getElementById('roundDuration').value = state.roundDuration;
  document.getElementById('roundBreakDuration').value = state.roundBreakDuration;
  document.getElementById('sets').value = state.sets;
  document.getElementById('breakDuration').value = state.breakDuration;
}

// ===== VIEW MANAGEMENT =====
function showSettingsPanel() {
  document.getElementById('presetSection').classList.remove('hidden');
  document.getElementById('settingsPanel').classList.remove('hidden');
  document.getElementById('timerDisplay').classList.add('hidden');
  document.getElementById('completionScreen').classList.add('hidden');
}

function showTimerDisplay() {
  document.getElementById('presetSection').classList.add('hidden');
  document.getElementById('settingsPanel').classList.add('hidden');
  document.getElementById('timerDisplay').classList.remove('hidden');
  document.getElementById('completionScreen').classList.add('hidden');
}

function showCompletionScreen() {
  document.getElementById('presetSection').classList.add('hidden');
  document.getElementById('settingsPanel').classList.add('hidden');
  document.getElementById('timerDisplay').classList.add('hidden');
  document.getElementById('completionScreen').classList.remove('hidden');
}

// ===== PRESETS =====
function renderPresets() {
  const grid = document.getElementById('presetGrid');
  grid.innerHTML = '';

  presets.forEach(preset => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    if (preset.id === state.currentPreset) {
      btn.classList.add('active');
    }

    btn.innerHTML = `
      <div class="preset-name">${preset.name}</div>
      <div class="preset-desc">${preset.desc}</div>
    `;

    btn.addEventListener('click', () => {
      state.currentPreset = preset.id;
      
      if (preset.config) {
        state.roundCount = preset.config.roundCount;
        state.roundDuration = preset.config.roundDuration;
        state.roundBreakDuration = preset.config.roundBreakDuration;
        state.sets = preset.config.sets;
        state.breakDuration = preset.config.breakDuration;
        updateSettingsInputs();
      }

      renderPresets();
    });

    grid.appendChild(btn);
  });
}

// ===== BACKGROUND OPTIONS =====
function renderBackgrounds() {
  const container = document.getElementById('bgOptions');
  container.innerHTML = '';

  backgrounds.forEach(bg => {
    const item = document.createElement('div');
    item.className = 'option-item';
    if (bg.className === state.currentBg) {
      item.classList.add('active');
    }

    const preview = document.createElement('div');
    preview.className = `option-preview ${bg.className}`;
    
    const name = document.createElement('div');
    name.className = 'option-name';
    name.textContent = bg.name;

    item.appendChild(preview);
    item.appendChild(name);

    item.addEventListener('click', () => {
      state.currentBg = bg.className;
      document.getElementById('appContainer').className = `app-container ${bg.className}`;
      renderBackgrounds();
    });

    container.appendChild(item);
  });
}

// ===== COLOR OPTIONS =====
function renderColors() {
  const container = document.getElementById('colorOptions');
  container.innerHTML = '';

  colors.forEach(color => {
    const item = document.createElement('div');
    item.className = 'option-item';
    if (color.id === state.currentColor.id) {
      item.classList.add('active');
    }

    const preview = document.createElement('div');
    preview.className = 'option-preview';
    preview.style.background = `linear-gradient(135deg, ${color.primary}, ${color.secondary})`;
    
    const name = document.createElement('div');
    name.className = 'option-name';
    name.textContent = color.name;

    item.appendChild(preview);
    item.appendChild(name);

    item.addEventListener('click', () => {
      state.currentColor = color;
      document.documentElement.style.setProperty('--primary-color', color.primary);
      document.documentElement.style.setProperty('--secondary-color', color.secondary);
      renderColors();
    });

    container.appendChild(item);
  });
}

// ===== EVENT LISTENERS =====
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resumeBtn').addEventListener('click', resumeTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('newWorkoutBtn').addEventListener('click', showSettingsPanel);

document.getElementById('muteToggle').addEventListener('click', () => {
  state.isMuted = !state.isMuted;
  document.getElementById('muteToggle').textContent = state.isMuted ? '🔇' : '🔊';
});

document.getElementById('voiceToggle').addEventListener('click', () => {
  state.voiceEnabled = !state.voiceEnabled;
  document.getElementById('voiceToggle').textContent = state.voiceEnabled ? '🎙️' : '🔇';
  updateVoiceSelectVisibility();
});

document.getElementById('bgSelectorBtn').addEventListener('click', () => {
  const panel = document.getElementById('bgPanel');
  const colorPanel = document.getElementById('colorPanel');
  panel.classList.toggle('open');
  colorPanel.classList.remove('open');
  updateSelectorButtonStates();
});

document.getElementById('colorSelectorBtn').addEventListener('click', () => {
  const panel = document.getElementById('colorPanel');
  const bgPanel = document.getElementById('bgPanel');
  panel.classList.toggle('open');
  bgPanel.classList.remove('open');
  updateSelectorButtonStates();
});

// Close buttons for panels
document.getElementById('bgPanelCloseBtn').addEventListener('click', () => {
  document.getElementById('bgPanel').classList.remove('open');
  updateSelectorButtonStates();
});

document.getElementById('colorPanelCloseBtn').addEventListener('click', () => {
  document.getElementById('colorPanel').classList.remove('open');
  updateSelectorButtonStates();
});

// Update selector button active states
function updateSelectorButtonStates() {
  const bgBtn = document.getElementById('bgSelectorBtn');
  const colorBtn = document.getElementById('colorSelectorBtn');
  const bgPanel = document.getElementById('bgPanel');
  const colorPanel = document.getElementById('colorPanel');
  
  if (bgPanel.classList.contains('open')) {
    bgBtn.classList.add('active');
  } else {
    bgBtn.classList.remove('active');
  }
  
  if (colorPanel.classList.contains('open')) {
    colorBtn.classList.add('active');
  } else {
    colorBtn.classList.remove('active');
  }
}

// Input validation for round count
document.getElementById('roundCount').addEventListener('blur', (e) => {
  let value = parseInt(e.target.value) || 1;
  value = Math.max(1, Math.min(99, value));
  e.target.value = value;
});

// When user manually changes settings, switch to custom preset
['roundCount', 'roundDuration', 'roundBreakDuration', 'sets', 'breakDuration'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    state.currentPreset = 'custom';
    renderPresets();
  });
});

// ===== INITIALIZATION =====
function init() {
  renderPresets();
  renderBackgrounds();
  renderColors();
  updateSettingsInputs();
  showSettingsPanel();
  
  // Load voices for speech synthesis
  if (window.speechSynthesis) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }
  
  // Initialize voice select visibility
  updateVoiceSelectVisibility();
}

// Cancel speech on page unload
window.addEventListener('beforeunload', () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
});

init();
