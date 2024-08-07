'use client'

import React, { useState, useEffect, useRef } from 'react'

const KitchenTimer: React.FC = () => {
  const [time, setTime] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [totalTime, setTotalTime] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      setIsActive(false)
      if (audioRef.current) {
        audioRef.current.play()
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const startTimer = (seconds: number) => {
    setTime(seconds)
    setTotalTime(seconds)
    setIsActive(true)
  }

  const stopTimer = () => {
    setIsActive(false)
    setTime(0)
    setTotalTime(0)
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getColorClass = (): string => {
    if (time <= 10) return 'text-red-600'
    if (time <= 30) return 'text-yellow-600'
    return 'text-blue-600'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">厨房倒计时</h1>
      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <div className={`text-6xl sm:text-7xl font-bold text-center font-mono transition-colors duration-300 ${getColorClass()}`}>
          {formatTime(time)}
        </div>
      </div>
      <div className="w-full h-2 bg-blue-500 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gray-200 rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${100 - (time / totalTime) * 100}%`, marginLeft: 'auto' }}
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => startTimer(60)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full transition duration-300 text-lg">
          1分钟
        </button>
        <button onClick={() => startTimer(180)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-full transition duration-300 text-lg">
          3分钟
        </button>
        <button onClick={() => startTimer(300)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-4 rounded-full transition duration-300 text-lg">
          5分钟
        </button>
        <button onClick={stopTimer} className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-full transition duration-300 text-lg">
          停止
        </button>
      </div>
      <audio ref={audioRef} src="/alarm.mp3" />
    </div>
  )
}

export default KitchenTimer