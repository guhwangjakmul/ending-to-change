interface QuestionProps {
  question: string
}

export default function Question(props: QuestionProps) {
  const { question } = props
  return (
    <div className="mt-[40px] pt-[40px] px-[30px] mb-[125px] font-gothic-b text-mint-green">
      Q.&nbsp;
      <span className="text-brown">{question}</span>
    </div>
  )
}
