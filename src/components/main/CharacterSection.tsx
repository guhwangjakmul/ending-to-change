import React from 'react'
import CharacterBubble from '@/components/common/CharacterBubble'
import characterGroup from '@/assets/characterData'

interface CharacterData {
  koreanName: string
  dialogues: string[]
  nameBg: string
  nameColor: string
}

interface CharacterSectionProps {
  selectedCharacter: keyof typeof characterGroup
  index: number
}

const CharacterSection: React.FC<CharacterSectionProps> = ({ selectedCharacter, index }) => {
  const character = characterGroup[selectedCharacter] as CharacterData

  return (
    <section>
      <CharacterBubble
        charName={character.koreanName}
        content={character.dialogues[index]}
        charBackgroundColor={character.nameBg}
        charTextColor={character.nameColor}
      />
    </section>
  )
}

export default CharacterSection
