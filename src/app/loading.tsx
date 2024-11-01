import Image from 'next/image'

export default function Loading() {
  return (
    <main className="w-full h-screen bg-light-beige flex justify-center items-center flex-col gap-[17px]">
      <Image
        src="/image/system/loading.svg"
        alt=""
        width="121"
        height="121"
        className="animate-bounce-y"
      />
      <div className="w-[130px] h-[5px] relative rounded-full overflow-hidden">
        <div className="w-0 h-full absolute left-0 bg-mint-green animate-loading-bar rounded-full"></div>
      </div>
    </main>
  )
}
