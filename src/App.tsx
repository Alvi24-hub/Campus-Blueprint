import { BlueprintViewer } from './components/BlueprintViewer'
import { useAppStore } from './state/store'

function App() {
  const { selectedBuildingId, selectedFloorId } = useAppStore()

  // For testing, we'll always use the sample SVG.
  // Later, you'll switch this based on building/floor.
  const svgUrl = '/sample-floor.svg'

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Campus Blueprint
        </h1>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => useAppStore.setState({ selectedBuildingId: 'AB2', selectedFloorId: 'F3' })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load AB2 Floor 3
          </button>
          <button
            onClick={() => useAppStore.setState({ selectedBuildingId: null, selectedFloorId: null })}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        <BlueprintViewer floorId={selectedFloorId} svgUrl={svgUrl} />
        <div className="mt-4 text-sm text-gray-500">
          Selected room: {useAppStore.getState().selectedSpaceId || 'None'}
        </div>
      </div>
    </div>
  )
}

export default App
