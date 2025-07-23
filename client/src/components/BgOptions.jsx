import { useState } from 'react'

const BgOptions = ({ currentBg, onBgChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const backgroundOptions = [
    {
      id: 'topography',
      name: '4-Point Stars',
      className: 'hero-pattern-4-point-stars',
      preview: 'M8 4l4 2-4 2-2 4-4-2 4-2 2-4zm16 0l4 2-4 2-2 4-4-2 4-2 2-4z'
    },
    {
      id: 'hexagons',
      name: 'Temple',
      className: 'hero-pattern-temple',
      preview: 'M50 10h20v20H50V10zm0 30h20v20H50V40zm30-30h20v20H80V10zm0 30h20v20H80V40zM20 50h20v20H20V50zm60 0h20v20H80V50z'
    },
    {
      id: 'overlapping-hexagons',
      name: 'Bubbles',
      className: 'hero-pattern-bubbles',
      preview: 'M20 20c3 0 5-2 5-5s-2-5-5-5-5 2-5 5 2 5 5 5zm25 15c2 0 4-2 4-4s-2-4-4-4-4 2-4 4 2 4 4 4zm-15 20c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3zm35-10c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5-4.5 2-4.5 4.5 2 4.5 4.5 4.5z'
    },
    {
      id: 'moroccan',
      name: 'Moroccan',
      className: 'hero-pattern-moroccan',
      preview: 'M40 20v8h4c6 0 12 6 12 12s-6 12-12 12h-4v8c-6-2-10-6-12-12-2 6-6 10-12 12v-8h-4c-6 0-12-6-12-12s6-12 12-12h4v-8c6 2 10 6 12 12 2-6 6-10 12-12z'
    },
    {
      id: 'circuit-board',
      name: 'Circuit Board',
      className: 'hero-pattern-circuit-board',
      preview: 'M20 10h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-16 8h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm-16 8h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4z'
    },
    {
      id: 'slanted-stars',
      name: 'Slanted Stars',
      className: 'hero-pattern-slanted-stars',
      preview: 'M0 15l15 15H0V15zM15 0l15 15V0H15z'
    },
    {
      id: 'curtain',
      name: 'Curtain',
      className: 'hero-pattern-curtain',
      preview: 'M20 12v-2L0 0v10l4 2h16zm18 0l4-2V0L22 10v2h16z'
    },
    {
      id: 'glamorous',
      name: 'Glamorous',
      className: 'hero-pattern-glamorous',
      preview: 'M40 40l8-8h8l-8 8 8 8h-8l-8-8zm20 0l8-8h8l-8 8 8 8h-8l-8-8z'
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
      <div className={`fixed top-0 left-0 h-full bg-black/50 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '380px' }}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white mb-2">Background Options</h2>
          <p className="text-white/70 text-sm">Choose your workout background</p>
        </div>

        {/* Background Options */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
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

        {/* Footer with Close */}
        <div className="p-6 border-t border-white/20 text-center">
          <span 
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white cursor-pointer transition-colors duration-200 text-xl font-medium"
          >
            Close
          </span>
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
