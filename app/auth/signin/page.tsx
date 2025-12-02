'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Chrome } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Email veya şifre hatalı')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <img src="/logo.svg" alt="SCE Digital CRM" className="h-16 w-16" />
            <div className="text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SCE Digital
              </div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">CRM Platform</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hoş Geldiniz</h1>
          <p className="text-slate-600">Devam etmek için giriş yapın</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Giriş Yap
            </h2>
            <p className="text-slate-600">Hesabınıza giriş yapın</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">veya</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-300 py-3 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            <Chrome size={20} />
            Google ile Giriş Yap
          </button>

          <p className="text-center text-sm text-slate-600 mt-6">
            Hesabınız yok mu?{' '}
            <a href="/auth/signup" className="text-primary-600 hover:underline font-medium">
              Kayıt Olun
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
