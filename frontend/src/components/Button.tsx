
const Button = ({onClick, children}: {onClick: ()=>void, children: React.ReactNode} ) => {
  return (
    <button onClick={onClick} className="text-white text-2xl bg-green-500 hover:bg-green-700 py-4 px-8 rounded-lg font-bold ">
        {children}
    </button>
  )
}

export default Button
