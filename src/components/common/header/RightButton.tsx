import Image from 'next/image'
import Button from '../Button'
import { useEffect, useRef, useState } from 'react'
import Dropdown from './Dropdown'

export default function RightButton({ type }: { type: 'kebabMenuBtn' | 'reportBtn' }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const kebabMenuIconClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // 외부 클릭 감지 함수
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false)
    }
  }

  // 외부 클릭 이벤트 리스너 추가 및 제거
  useEffect(() => {
    // 드롭다운 외부 클릭을 감지
    document.addEventListener('mousedown', handleClickOutside)

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {type === 'kebabMenuBtn' ? (
        <div ref={dropdownRef} className="w-1/5 text-right">
          <button className="relative" onClick={kebabMenuIconClickHandler}>
            <Image
              src="/image/kebab-menu-icon.svg"
              alt="kebabMenuBtn"
              width="5"
              height="20"
              style={{ width: 5, height: 20 }}
            />
            {isDropdownOpen && (
              <div className="absolute top-6 right-0">
                <Dropdown />
              </div>
            )}
          </button>
        </div>
      ) : (
        <Button width={64} height={28} isMediumFont isLink href="/report" fontSize={14}>
          <Image
            src="/image/report-button-icon.svg"
            alt="reportBtn"
            width="18"
            height="18"
            className="mr-[4px]"
            style={{ width: 18, height: 18 }}
          />
          <span>통계</span>
        </Button>
      )}
    </>
  )
}
