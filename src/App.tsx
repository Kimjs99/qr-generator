import React, { useState, useRef } from 'react'
import { Plus, Trash2, Download, Upload, QrCode, RotateCcw } from 'lucide-react'
import QRCode from 'qrcode'

interface UrlItem {
  id: string
  url: string
}

function App() {
  const [urls, setUrls] = useState<UrlItem[]>([{ id: '1', url: '' }])
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addUrl = () => {
    if (urls.length < 10) {
      const newId = (urls.length + 1).toString()
      setUrls([...urls, { id: newId, url: '' }])
    }
  }

  const removeUrl = (id: string) => {
    if (urls.length > 1) {
      setUrls(urls.filter(item => item.id !== id))
    }
  }

  const updateUrl = (id: string, url: string) => {
    setUrls(urls.map(item => 
      item.id === id ? { ...item, url } : item
    ))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateQRWithLogo = async (url: string, logoDataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      // QR 코드 생성
      QRCode.toCanvas(canvas, url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) {
          reject(error)
          return
        }

        // 로고 이미지 로드 및 중앙 배치
        const logoImg = new Image()
        logoImg.onload = () => {
          const qrSize = canvas.width
          const logoSize = Math.floor(qrSize * 0.2) // QR 코드 크기의 20%
          const logoX = (qrSize - logoSize) / 2
          const logoY = (qrSize - logoSize) / 2

          // 로고 주변에 흰색 배경 그리기
          const padding = 8
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(
            logoX - padding, 
            logoY - padding, 
            logoSize + (padding * 2), 
            logoSize + (padding * 2)
          )

          // 로고 그리기
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)

          resolve(canvas.toDataURL('image/png'))
        }
        logoImg.onerror = () => reject(new Error('Failed to load logo image'))
        logoImg.src = logoDataUrl
      })
    })
  }

  const resetLogo = () => {
    setLogoFile(null)
    setLogoPreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const resetAll = () => {
    if (window.confirm('모든 데이터를 초기화하시겠습니까?')) {
      setUrls([{ id: '1', url: '' }])
      setLogoFile(null)
      setLogoPreview('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const generateQRCodes = async () => {
    if (!logoFile) {
      alert('로고 이미지를 먼저 업로드해주세요.')
      return
    }

    const validUrls = urls.filter(item => item.url.trim() !== '')
    if (validUrls.length === 0) {
      alert('최소 하나의 URL을 입력해주세요.')
      return
    }

    setIsGenerating(true)

    try {
      const logoDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = reject
        reader.readAsDataURL(logoFile)
      })

      for (let i = 0; i < validUrls.length; i++) {
        const urlItem = validUrls[i]
        const qrDataUrl = await generateQRWithLogo(urlItem.url, logoDataUrl)
        
        // 다운로드
        const link = document.createElement('a')
        link.download = `qr-code-${i + 1}.png`
        link.href = qrDataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      alert(`${validUrls.length}개의 QR 코드가 생성되었습니다!`)
    } catch (error) {
      console.error('QR 코드 생성 중 오류:', error)
      alert('QR 코드 생성 중 오류가 발생했습니다.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">QR 코드 생성기</h1>
            </div>
            <p className="text-gray-600">로고가 포함된 QR 코드를 쉽게 만들어보세요</p>
            <button
              onClick={resetAll}
              className="mt-4 flex items-center mx-auto px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              모든 데이터 초기화
            </button>
          </div>

          {/* 로고 업로드 섹션 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                로고 이미지 업로드
              </label>
              {logoFile && (
                <button
                  onClick={resetLogo}
                  className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  로고 제거
                </button>
              )}
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Upload className="w-12 h-12 mb-2" />
                <span className="text-sm">
                  {logoFile ? '로고 변경하기' : '로고 이미지 선택'}
                </span>
              </button>
              {logoPreview && (
                <div className="mt-4">
                  <img
                    src={logoPreview}
                    alt="로고 미리보기"
                    className="w-20 h-20 object-contain mx-auto rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* URL 입력 섹션 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                URL 목록 ({urls.length}/10)
              </label>
              <button
                onClick={addUrl}
                disabled={urls.length >= 10}
                className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                추가
              </button>
            </div>

            <div className="space-y-3">
              {urls.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateUrl(item.id, e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {urls.length > 1 && (
                    <button
                      onClick={() => removeUrl(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 생성 버튼 */}
          <div className="text-center">
            <button
              onClick={generateQRCodes}
              disabled={isGenerating || !logoFile}
              className="flex items-center justify-center mx-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  생성 중...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  QR 코드 생성하기
                </>
              )}
            </button>
          </div>

          {/* 사용법 안내 */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">사용법</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 로고 이미지를 업로드하세요</li>
              <li>• QR 코드로 만들 URL을 입력하세요 (최대 10개)</li>
              <li>• 'QR 코드 생성하기' 버튼을 클릭하면 자동으로 다운로드됩니다</li>
              <li>• 로고는 QR 코드 중앙에 배치되며, 주변은 흰색으로 처리됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
