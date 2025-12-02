'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905123456789'
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Merhaba, web sitenizden ulaşıyorum.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp ile iletişime geç"
        >
          <MessageCircle size={28} className="fill-current" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            WhatsApp'tan yazın
          </span>

          {/* Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
        </button>
      </div>
    </>
  )
}
