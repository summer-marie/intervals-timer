import { useState } from 'react'

const BgOptions = ({ currentBg, onBgChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const backgroundOptions = [
    {
      id: 'topography',
      name: 'Topography',
      className: 'hero-pattern-topography',
      preview: 'M40 40L40 40Q42 38 44 40T48 40T52 40Q54 38 56 40L56 40'
    },
    {
      id: 'circuit-board',
      name: 'Circuit Board',
      className: 'hero-pattern-circuit-board',
      preview: 'M8 8h8v8H8V8zm16 0h8v8h-8V8zM8 24h8v8H8v-8zm16 0h8v8h-8v-8z'
    },
    {
      id: 'hexagons',
      name: 'Hexagons',
      className: 'hero-pattern-hexagons',
      preview: 'M28 66L14 52L14 38L28 24L42 38L42 52L28 66Z'
    },
    {
      id: 'overlapping-hexagons',
      name: 'Overlapping Hexagons',
      className: 'hero-pattern-overlapping-hexagons',
      preview: 'M28 66L14 52L14 38L28 24L42 38L42 52L28 66ZM28 86L14 72L14 58L28 44L42 58L42 72L28 86Z'
    },
    {
      id: 'wiggle',
      name: 'Wiggle',
      className: 'hero-pattern-wiggle',
      preview: 'M0 40Q10 30 20 40T40 40T60 40Q70 30 80 40'
    }
  ]

  return (
    <>
      {/* Toggle Button - Only show when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
          aria-label="Toggle background options"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-sm font-medium">Backgrounds</span>
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-black/50 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '380px' }}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          {/* Header with inline close button */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Background Options</h2>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              aria-label="Close background options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              <span className="text-sm font-medium">Close</span>
            </button>
          </div>
          <p className="text-white/70 text-sm">Choose your workout background</p>
        </div>

        {/* Background Options */}
        <div className="p-6 pb-20">
          <div className="grid grid-cols-2 gap-6">
            {backgroundOptions.map((bg) => (
              <div
                key={bg.id}
                onClick={() => onBgChange(bg.className)}
                className={`cursor-pointer group transition-all duration-200 ${
                  currentBg === bg.className ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Preview Circle */}
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-4 transition-all duration-200 overflow-hidden relative ${
                  currentBg === bg.className 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/50' 
                    : 'border-white/30 group-hover:border-white/50'
                }`}>
                  {/* Preview Pattern */}
                  <div className={`w-full h-full ${bg.className} opacity-80`}>
                    <svg 
                      width="64" 
                      height="64" 
                      viewBox="0 0 80 80" 
                      className="w-full h-full"
                    >
                      <path 
                        d={bg.preview} 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        fill="none" 
                        className="text-white/60"
                      />
                    </svg>
                  </div>
                  
                  {/* Selected Indicator */}
                  {currentBg === bg.className && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <p className={`text-center text-sm font-medium transition-colors duration-200 ${
                  currentBg === bg.className ? 'text-blue-400' : 'text-white group-hover:text-white/90'
                }`}>
                  {bg.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default BgOptions
