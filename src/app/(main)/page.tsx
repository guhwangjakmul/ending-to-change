'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import CharacterSection from '@/components/main/CharacterSection'
import FooterButtons from '@/components/main/FooterButtons'
import Levelup from '@/components/main/Levelup'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'
import {
  getPotion,
  getProgress,
  updateIsAllCompleted,
  upgradeProgress,
  usePotion,
} from '@/apis/main'
import { getUserId } from '@/apis/user'
import { changeComplete, getCategoryProgress } from '@/apis/category'
import { removeLocalStorage, setLocalStorageCategory } from '@/utils/common/localStorage'
import Loading from '@/app/loading'
import { CategoryNameEnglish } from '@/types/CategoryField'
import calculateProgressDetails from '@/utils/main/calculateProgressDetails'
import useUserStore from '@/store/useUserStore'

const categoryList = ['water', 'air', 'soil', 'warming', 'recycle', 'energy']

interface MainState {
  userId: string
  categoryId: number
  loading: boolean
  potion: null | number
  currentProgress: null | number
  level: number
  isEnd: boolean
  isAllCompleted: boolean
  isExistedStorage: boolean
  index: number
  message: string
  isShowLevelUp: boolean
}

export default function Page() {
  const [state, setState] = useState<MainState>({
    userId: '',
    categoryId: 1,
    loading: true,
    potion: null,
    currentProgress: null,
    level: 1,
    isEnd: false,
    isAllCompleted: false,
    isExistedStorage: false,
    index: 0,
    message: '',
    isShowLevelUp: false,
  })
  const { userId: zustandUserId, categoryId: zustandCategoryId, setUserId } = useUserStore()

  const currentCategoryName = categoryList[state.categoryId - 1] as CategoryNameEnglish

  useEffect(() => {
    if (state.isAllCompleted) console.log('All categories completed!')

    const fetchPotionProgress = async () => {
      try {
        let userId: string | null = zustandUserId

        // Zustand에 userId가 없는 경우 API 호출로 로드
        if (!userId) {
          userId = (await getUserId()) || null
          if (!userId) throw new Error('유저 ID를 찾을 수 없습니다.')
          setUserId(userId)
        }

        let categoryId: number | null = zustandCategoryId

        // Zustand에 categoryId가 없는 경우 API 호출로 로드
        if (!categoryId) {
          const getCurrentCategoryInfo = await getCategoryProgress(userId)
          const isClearCategoryInfo = getCurrentCategoryInfo.find(
            category => !category.is_completed,
          )
          if (!isClearCategoryInfo) return setState(prev => ({ ...prev, isAllCompleted: true }))
          const currentCategoryId = isClearCategoryInfo.category_id
          setState(prev => ({
            ...prev,
            categoryId: currentCategoryId,
          }))
        }

        setLocalStorageCategory('category', 'id', state.categoryId || 0)

        const localStorageData = JSON.parse(localStorage.getItem('viewResultCategory') as string)

        // [1] 로컬스토리지에 viewResultCategory 존재O
        if (localStorageData) {
          setState(prev => ({
            ...prev,
            categoryId: localStorageData.id,
            index: 2,
            level: 3,
            isEnd: true,
            currentProgress: 200,
            isExistedStorage: true,
            loading: false,
          }))
        }
        // [2] 로컬스토리지에 viewResultCategory 존재X
        else {
          const currentPoint = await getPotion(userId)
          const currentProgress = await getProgress(userId, state.categoryId)
          const { level, index, adjustedProgress } = calculateProgressDetails(
            currentProgress as number,
          )

          setState(prev => ({
            ...prev,
            categoryId: state.categoryId,
            potion: currentPoint,
            level,
            index,
            currentProgress: adjustedProgress,
            loading: false,
          }))
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchPotionProgress()
  }, [state.categoryId])

  const handleUsePotion = async () => {
    if (!state.potion) return
    if (state.potion <= 0) return setState(prev => ({ ...prev, message: '물약이 부족해요' }))

    const newPotion = state.potion - 1
    const newProgress = (state.currentProgress || 0) + 10

    setState(prev => ({ ...prev, potion: newPotion, currentProgress: newProgress }))
    usePotion(state.userId)
    upgradeProgress(state.userId, state.categoryId)

    if (newProgress === 100 || newProgress === 150 || newProgress === 200) {
      setState(prev => ({ ...prev, isShowLevelup: true, currentProgress: 0 }))
    }

    if (newProgress === 200) {
      changeComplete(state.userId, state.categoryId)
      const categories = await getCategoryProgress(state.userId)
      const allCompleted = categories.every(cat => cat.is_completed)
      if (allCompleted && categories.length === 6) {
        await updateIsAllCompleted(state.userId)
        setState(prev => ({ ...prev, isAllCompleted: true }))
      }
    }
  }

  const handleCloseLevelup = () => {
    setState(prev => ({
      ...prev,
      isShowLevelup: false,
      level: prev.level < 3 ? prev.level + 1 : prev.level,
      isEnd: prev.level === 3 ? true : prev.isEnd,
      index: prev.index + 1,
    }))
  }

  if (state.loading) return <Loading />

  return (
    <div className="relative w-full h-full flex justify-center">
      {currentCategoryName && (
        <Image
          src={`/image/character/${currentCategoryName}_${state.level}.svg`}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
        />
      )}
      <CharacterSection selectedCharacter={currentCategoryName} index={state.index} />
      {state.message && (
        <div className="font-gothic-m absolute text-light-beige top-2/3 text-lg animate-fadeout">
          {state.message}
        </div>
      )}
      {!state.isEnd ? (
        <FooterButtons
          currentProgress={state.currentProgress ?? 0}
          level={state.level}
          handleUsePotion={handleUsePotion}
          count={state.potion ?? 0}
        />
      ) : (
        <div className="absolute bottom-8 space-y-5">
          <ProgressBar currentProgress={state.currentProgress ?? 0} level={state.level} />
          <div>
            {state.isExistedStorage ? (
              <Button
                width={303}
                height={40}
                fontSize={16}
                color="text-medium-brown"
                backgroundColor="bg-yellow"
                isLink
                onClick={() => removeLocalStorage('viewResultCategory')}
                href={'/mypage'}
                children={'돌아가기'}
              />
            ) : (
              <Button
                width={303}
                height={40}
                fontSize={16}
                color="text-medium-brown"
                backgroundColor="bg-yellow"
                isLink
                href={'/category'}
                children={'다른 주민 구하기'}
              />
            )}
          </div>
        </div>
      )}

      {state.isShowLevelUp && (
        <Levelup
          selectedCharacter={currentCategoryName}
          index={state.index}
          onClose={handleCloseLevelup}
          level={state.level}
          isAllCompleted={state.isAllCompleted}
        />
      )}

      {state.isAllCompleted && (
        <div className="absolute bg-cream w-full h-full justify-center items-center flex flex-col space-y-6">
          <p className="font-gothic-b text-brown">주민을 모두 구했습니다!</p>
          <Button
            width={104}
            height={40}
            fontSize={16}
            backgroundColor="bg-mint"
            color="text-light-mint"
            isLink
            href="/mypage"
            children="마이홈으로"
            isMediumFont
          />
        </div>
      )}
    </div>
  )
}
function getSelectedCharacter(zustandCategoryId: number) {
  throw new Error('Function not implemented.')
}
