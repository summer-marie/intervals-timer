import { useState } from 'react'

const ColorOptions = ({ currentColor, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const colorSchemes = [
    {
      id: 'dark-gray',
      name: 'Dark Gray',
      primary: '#1a202c',
      secondary: '#374151',
      preview: 'bg-gray-800'
    },
    {
      id: 'teal-blue',
      name: 'Teal Blue',
      primary: '#045d72',
      secondary: '#050505',
      preview: 'bg-teal-700'
    },
    {
      id: 'purple-night',
      name: 'Purple Night',
      primary: '#2d1b69',
      secondary: '#8b5cf6',
      preview: 'bg-purple-800'
    },
    {
      id: 'forest-green',
      name: 'Forest Green',
      primary: '#064e3b',
      secondary: '#10b981',
      preview: 'bg-emerald-800'
    },
    {
      id: 'crimson-red',
      name: 'Crimson Red',
      primary: '#7f1d1d',
      secondary: '#ef4444',
      preview: 'bg-red-800'
    },
    {
      id: 'midnight-blue',
      name: 'Midnight Blue',
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      preview: 'bg-blue-800'
    },
    {
      id: 'amber-gold',
      name: 'Amber Gold',
      primary: '#92400e',
      secondary: '#f59e0b',
      preview: 'bg-amber-700'
    },
    {
      id: 'rose-pink',
      name: 'Rose Pink',
      primary: '#9f1239',
      secondary: '#f43f5e',
      preview: 'bg-rose-700'
    }
  ]

  return (
    <>
      {/* Toggle Button - Only show when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
          aria-label="Toggle color options"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
          <span className="text-sm font-medium">Colors</span>
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-black/50 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ width: '320px' }}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white mb-2">Color Schemes</h2>
          <p className="text-white/70 text-sm">Choose your color palette</p>
        </div>

        {/* Color Options */}
        <div className="flex-1 overflow-y-auto" style={{ direction: 'rtl' }}>
          <div className="p-6" style={{ direction: 'ltr' }}>
            <div className="space-y-4">
              {colorSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  onClick={() => onColorChange(scheme)}
                  className={`cursor-pointer group transition-all duration-200 p-4 rounded-lg border-2 ${
                    currentColor?.id === scheme.id 
                      ? 'border-blue-400 bg-blue-400/10' 
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  {/* Color Preview */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex gap-1">
                      {/* Primary Color Circle */}
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white/30"
                        style={{ backgroundColor: scheme.primary }}
                      ></div>
                      {/* Secondary Color Circle */}
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white/30"
                        style={{ backgroundColor: scheme.secondary }}
                      ></div>
                    </div>
                    
                    {/* Selected Indicator */}
                    {currentColor?.id === scheme.id && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 ml-auto">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    currentColor?.id === scheme.id ? 'text-blue-400' : 'text-white group-hover:text-white/90'
                  }`}>
                    {scheme.name}
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

export default ColorOptions
