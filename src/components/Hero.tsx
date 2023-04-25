interface HeroProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  score: number
}

const Hero = ({ onSubmit, onChange, score }: HeroProps) => {
  return (
    <div className="sm:w-[400px] w-[300px] text-center">
      <h2>You have scored {score} points and this is a new record!</h2>
      <h2 className="mt-2">
        Enter your name if you want to be part of history!
      </h2>
      <form
        className="flex flex-col justify-center align-middle"
        onSubmit={onSubmit}
      >
        <input
          className="mt-8 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          onChange={onChange}
        />
        <button className="mt-8 font-light bg-teal-400 w-[150px] h-[40px] rounded-md shadow-md shadow-teal-800 hover:shadow-md hover:shadow-teal-500 transition-all self-center">
          Add top score!
        </button>
      </form>
    </div>
  )
}

export default Hero
