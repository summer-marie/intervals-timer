import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for user selections
  const [roundDuration, setRoundDuration] = useState(30)
  const [roundCount, setRoundCount] = useState(1)
  const [sets, setSets] = useState(3)
  const [breakDuration, setBreakDuration] = useState(30)
  
  // Timer state
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentSet, setCurrentSet] = useState(1)
  const [currentRound, setCurrentRound] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval = null
    
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (isRunning && !isPaused && timeLeft === 0) {
      // Handle round/break transitions
      if (isBreak) {
        // Break is over, start next set
        setCurrentSet(prev => prev + 1)
        setCurrentRound(1)
        setTimeLeft(roundDuration)
        setIsBreak(false)
      } else {
        // Round is over
        if (currentRound < roundCount) {
          // More rounds in this set, continue to next round
          setCurrentRound(prev => prev + 1)
          setTimeLeft(roundDuration)
        } else {
          // Set completed - all rounds in this set are done
          if (currentSet < sets) {
            // Not the last set - check if we need a break between sets
            if (breakDuration > 0) {
              setTimeLeft(breakDuration)
              setIsBreak(true)
            } else {
              // No break, go directly to next set
              setCurrentSet(prev => prev + 1)
              setCurrentRound(1)
              setTimeLeft(roundDuration)
            }
          } else {
            // Last set completed - workout complete
            setIsRunning(false)
            setIsComplete(true)
          }
        }
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, isPaused, timeLeft, currentSet, currentRound, sets, roundCount, roundDuration, breakDuration, isBreak])

  const startTimer = () => {
    setIsRunning(true)
    setIsPaused(false)
    setCurrentSet(1)
    setCurrentRound(1)
    setTimeLeft(roundDuration)
    setIsBreak(false)
    setIsComplete(false)
  }

  const pauseTimer = () => {
    setIsPaused(true)
  }

  const resumeTimer = () => {
    setIsPaused(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setCurrentSet(1)
    setCurrentRound(1)
    setTimeLeft(0)
    setIsBreak(false)
    setIsComplete(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}`
    
    // Remove "0:" prefix when under 1 minute
    if (mins === 0) {
      return secs.toString().padStart(2, '0')
    }
    
    return formattedTime
  }

  return (
    <div className="app hero-pattern-topography min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Intervals Timer</h1>
        
        {/* Settings Panel */}
        {!isRunning && !isComplete && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Setup Your Workout</h2>
            
            {/* Round Count and Duration - Flex Layout */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">
                  Round Count
                </label>
                <select 
                  value={roundCount} 
                  onChange={(e) => setRoundCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} round{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-white text-sm font-medium mb-2">
                  Round Duration
                </label>
                <select 
                  value={roundDuration} 
                  onChange={(e) => setRoundDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10 seconds</option>
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>60 seconds</option>
                </select>
              </div>
            </div>

            {/* Sets Dropdown */}
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Number of Sets
              </label>
              <select 
                value={sets} 
                onChange={(e) => setSets(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} set{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Break Duration Dropdown */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Break Duration
              </label>
              <select 
                value={breakDuration} 
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>No break</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
              </select>
            </div>

            {/* Start Button */}
            <button 
              onClick={startTimer}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Start Timer
            </button>
          </div>
        )}

        {/* Timer Display */}
        {isRunning && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 min-h-[80vh] flex flex-col justify-center">
            <div className="text-white mb-8 text-center">
              <div className="text-4xl md:text-6xl font-bold mb-4">
                Set {currentSet} of {sets}
              </div>
              <div className="text-2xl md:text-3xl font-medium mb-2">
                Round {currentRound} of {roundCount}
              </div>
              <div className="text-2xl md:text-4xl opacity-75">
                {isBreak ? 'Break Time' : 'Work Time'}
                {isPaused && ' - PAUSED'}
              </div>
            </div>
            
            <div className="text-center mb-8 flex-1 flex items-center justify-center">
              <div className={`text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none ${
                isBreak ? 'text-red-500' : 'text-white'
              }`}>
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              {isPaused ? (
                <button 
                  onClick={resumeTimer}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-xl"
                >
                  Resume
                </button>
              ) : (
                <button 
                  onClick={pauseTimer}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-xl"
                >
                  Pause
                </button>
              )}
              
              <button 
                onClick={stopTimer}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-xl"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {isComplete && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center mb-6 max-w-md mx-auto">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-4">Workout Complete!</h2>
            <p className="text-white mb-6">
              Great job! You completed {sets} sets.
            </p>
            <button 
              onClick={() => setIsComplete(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              New Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
