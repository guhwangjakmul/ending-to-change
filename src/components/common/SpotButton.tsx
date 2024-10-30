'use client'
import { SpotButtonProps } from '@/types/SpotButton'
import { useState } from 'react'
import Image from 'next/image'

export default function SpotButton(props: SpotButtonProps) {
  const { category, status, isClickable = true } = props
  const [newStatus, setNewStatus] = useState(status)

  const onClickButton = () => {
    if (!isClickable || newStatus === 'completed') return

    setNewStatus(prevStatus => (prevStatus === 'default' ? 'selected' : 'default'))
  }

  return (
    <button type="button" onClick={onClickButton} className="bg-rose-500">
      <Image src={`/image/button/${category}_${newStatus}.svg`} alt="" width="46" height="65" />
    </button>
  )
}
