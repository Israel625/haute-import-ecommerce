"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SetupPage() {
  const [resultado, setResultado] = useState('')
  const [loading, setLoading] = useState(false)

  const executarSetup = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/setup', { method: 'POST' })
      const data = await response.json()
      setResultado(JSON.stringify(data, null, 2))
    } catch (error) {
      setResultado('Erro: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Setup do Banco</h1>
        
        <Button 
          onClick={executarSetup} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Executando...' : 'Executar Setup'}
        </Button>
        
        {resultado && (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {resultado}
          </pre>
        )}
      </div>
    </div>
  )
}