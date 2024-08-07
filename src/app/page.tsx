'use client'
import React from 'react'
import KitchenTimer from './components/KitchenTimer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4">
      <KitchenTimer />
    </div>
  )
}