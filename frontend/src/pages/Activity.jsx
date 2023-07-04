const stats = [
    { name: 'Number of deploys', value: '405' },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' },
    { name: 'Success rate', value: '98.5%' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Activity = () => {
    return (
    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <div className="flex items-center gap-x-3">
        <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
        <h1 className="flex gap-x-3 text-base leading-7">
          <span className="font-semibold text-white">Planetaria</span>
          <span className="text-gray-600">/</span>
          <span className="font-semibold text-white">mobile-api</span>
        </h1>
      </div>
      <p className="mt-2 text-xs leading-6 text-gray-400">Deploys from GitHub via main branch</p>
    </div>
    <div className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
      Production
    </div>
    <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, statIdx) => (
        <div
            key={stat.name}
            className={classNames(
            statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
            'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
            )}
        >
            <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
            {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
            </p>
        </div>
        ))}
    </div>

  </div>
  )}


export default Activity