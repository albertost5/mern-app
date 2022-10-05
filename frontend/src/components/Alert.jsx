
const Alert = ({alert}) => {
  return (
    <div className={` ${alert.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-700'} bg-gradient-to-r text-center p-3 rounded-xl uppercase font-bold text-white mb-10 `}>
      {alert.message}
    </div>
  )
}

export default Alert

