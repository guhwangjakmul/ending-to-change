'use client'

import { useState, useEffect, useCallback } from 'react'

type UseModalReturn = [boolean, () => void, () => void, Element | null]

const preventScroll = () => {
  const currentScrollY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.top = `-${currentScrollY}px`
  document.body.style.overflowY = 'scroll'
  return currentScrollY
}

const allowScroll = (prevScrollY: number) => {
  document.body.style.position = ''
  document.body.style.width = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
  window.scrollTo(0, prevScrollY)
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [portalElement, setPortalElement] = useState<Element | null>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0) //

  const openModal = useCallback(() => {
    const scrollY = preventScroll() // 스크롤 위치 저장
    setScrollPosition(scrollY)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    allowScroll(scrollPosition)
    setIsOpen(false)
  }, [scrollPosition])

  useEffect(() => {
    setPortalElement(document.getElementById('portal'))
  }, [])

  return [isOpen, openModal, closeModal, portalElement]
}

export default useModal
