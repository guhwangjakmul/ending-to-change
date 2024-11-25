interface MessageProps {
  message: string
}

export default function Message(props: MessageProps) {
  const { message } = props

  return (
    <div className="flex items-center justify-center h-full">
      <span className="relative -translate-y-20 font-gothic-b text-brown">{message}</span>
    </div>
  )
}
