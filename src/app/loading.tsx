import Image from 'next/image'

export default function Loading() {
  return (
    <main className="w-full h-screen bg-light-beige flex justify-center items-center flex-col gap-[15px]">
      <Image
        src="/image/system/loading.svg"
        alt=""
        width="121"
        height="121"
        className="animate-bounce-y"
      />
      <h1 className="text-gray text-center font-gothic-b">로딩중...</h1>
    </main>
  )
}
