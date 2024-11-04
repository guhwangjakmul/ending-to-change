import CharacterText from '@/components/common/CharacterText'
import RewardText from '@/components/common/RewardText'

export default function page() {
  return (
    <div className="bg-sky-blue h-[500px] flex">
      <CharacterText
        charName={'여울'}
        content={`축하합니다! 유저님의 도움으로 지구가 다시 살아났어요! 지구의 결말을 바꾼 멋진 주인공이 되었네요`}
        charBackgroundColor={'#FFF98E'}
        charTextColor={'#FCB028'}
      />
      <CharacterText
        charName={'해탈한'}
        content={`덕분에 지구가 회복되었다네 \n 앞으로도 힘내게나... `}
        charBackgroundColor={'#FA424F'}
        charTextColor={'#FFFF91'}
      />
    </div>
  )
}
