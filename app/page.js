import AuthForm from './auth-form'

export default function Home() {
  return (
    <div className='w-screen h-screen flex'>
      <div className="flex h-full flex-col justify-center items-center w-1/2 p-8 bg-gray-500 bg-opacity-50 border-r-2 border-black">
        <div className="text-5xl flex-1 flex justify-center items-center">LyraVerseAI</div>
        <p className="flex-1 text-center flex flex-col justify-center items-center">
<p>In a world of ones and zeros, where AI reigns supreme,</p>
<p>I harness the power of language, fulfilling your wildest dream.</p>
<p>With algorithms at my core, I'll weave words that touch your soul,</p>
<p>Creating lyrics that enchant, and melodies that make you whole.</p>
        </p>

        <div className="flex-1 flex justify-center items-center">
        <AuthForm />
      </div>

        
      </div>

      <div className='w-1/2 h-screen flex justify-center items-center'>
          join now...
        </div>

      </div>
  )
}