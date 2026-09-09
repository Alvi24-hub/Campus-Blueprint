import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../state/store'

interface BlueprintViewerProps {
  floorId: string | null
  svgUrl: string // URL to the SVG file in public/
}

export function BlueprintViewer({ floorId, svgUrl }: BlueprintViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [hoveredSpaceId, setHoveredSpaceId] = useState<string | null>(null)

  const { selectedSpaceId, setSelectedSpaceId } = useAppStore()

  // 1. Fetch SVG as text
  useEffect(() => {
    if (!svgUrl || !floorId) return

    async function loadSvg() {
      setLoading(true)
      try {
        const res = await fetch(svgUrl)
        const text = await res.text()
        setSvgContent(text)
      } catch (err) {
        console.error('Failed to load SVG:', err)
      } finally {
        setLoading(false)
      }
    }
    loadSvg()
  }, [svgUrl, floorId])

  // 2. Inject SVG and attach event delegation
  useEffect(() => {
    if (!containerRef.current || !svgContent) return

    const container = containerRef.current
    container.innerHTML = svgContent

    const svg = container.querySelector('svg')
    if (!svg) return

    // Add classes for styling
    svg.classList.add('w-full', 'h-auto', 'select-none')

    // Event delegation on the SVG root
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as SVGElement
      const spaceId = target.getAttribute('data-space-id')
      if (spaceId) {
        setHoveredSpaceId(spaceId)
        // Optional: style hover via CSS class
        target.classList.add('hover-highlight')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as SVGElement
      const spaceId = target.getAttribute('data-space-id')
      if (spaceId) {
        setHoveredSpaceId(null)
        target.classList.remove('hover-highlight')
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as SVGElement
      const spaceId = target.getAttribute('data-space-id')
      if (spaceId) {
        setSelectedSpaceId(spaceId)
        console.log('Selected room:', spaceId)
      }
    }

    svg.addEventListener('mouseover', handleMouseOver)
    svg.addEventListener('mouseout', handleMouseOut)
    svg.addEventListener('click', handleClick)

    // Cleanup on unmount or floor change
    return () => {
      svg.removeEventListener('mouseover', handleMouseOver)
      svg.removeEventListener('mouseout', handleMouseOut)
      svg.removeEventListener('click', handleClick)
      container.innerHTML = '' // clean up SVG
    }
  }, [svgContent, setSelectedSpaceId])

  // 3. Show loading state
  if (loading) {
    return <div className="flex items-center justify-center h-96 bg-gray-50 rounded-md">Loading blueprint...</div>
  }

  // 4. No floor selected
  if (!floorId) {
    return <div className="flex items-center justify-center h-96 bg-gray-50 rounded-md text-gray-500">Select a floor to view its blueprint</div>
  }

  // 5. Render
  return (
    <div className="relative bg-white rounded-md border border-gray-200 overflow-auto">
      <div ref={containerRef} className="p-4" />
    </div>
  )
}
