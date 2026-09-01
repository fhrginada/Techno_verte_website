"use client"

import React, { useEffect, useRef, useState, useLayoutEffect } from "react"
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion"
import Container from "../ui/Container"
import SectionTitle from "../ui/SectionTitle"
import { cn } from "../../lib/utils/cn"

/*
GrowthTree
-------------
This component renders a 3-tier "growing tree" metaphor for the TechnoVerte
homepage. Visual tiers:
  - Root (origin point)
  - Trunk which splits into two main branches (Government, Enterprise)
  - Each main branch splits again into two leaf nodes which expose solution cards

SVG <path> coordinates are authored against a single viewBox: 0 0 1200 1600.
DOM panels/cards are absolutely positioned using percentage-based top/left
values chosen to align with the SVG endpoints. If you adjust the SVG
coordinates, update the matching percentage positions in `nodePositions`
below so the visual endpoints continue to line up.

RTL handling: the SVG is authored in LTR coordinates. For RTL we simply flip
the SVG horizontally via CSS `transform: scaleX(-1)` and mirror the absolute
position anchors (start/end) by toggling left <-> right anchors below. This
avoids duplicating path data while keeping content and copy identical.

Animation: uses Framer Motion's `useScroll` + `useTransform` to map the
section scroll progress to individual `pathLength` values for each path.
When `prefers-reduced-motion` is set, all paths render fully drawn and all
cards appear immediately (no animations).

Props are strongly typed in `GrowthTreeProps` and the `solutions` array
determines which solution card belongs to which parent branch.
*/

export type Tag = { icon: React.ReactNode; label: string }

export type PanelData = {
  title: string
  subtitle?: string
  tags?: Tag[]
}

export type Solution = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  parentBranch: "government" | "enterprise"
}

export type GrowthTreeProps = {
  eyebrow?: string
  title?: string
  description?: string
  governmentPanel: PanelData
  enterprisePanel: PanelData
  solutions: Solution[]
}

const VIEWBOX_WIDTH = 1200
const VIEWBOX_HEIGHT = 1600

const GrowthTree: React.FC<GrowthTreeProps> = ({
  eyebrow = "ONE PLATFORM",
  title = "One Platform. Every Solution.",
  description = "From national programs to enterprise operations, one system of intelligence grows to meet you where you are.",
  governmentPanel,
  enterprisePanel,
  solutions,
}) => {
  // two refs so desktop and mobile variants have their own scroll targets
  const desktopRef = useRef<HTMLElement | null>(null)
  const mobileRef = useRef<HTMLElement | null>(null)

  // SVG refs for measurement
  const svgDesktopRef = useRef<SVGSVGElement | null>(null)
  const svgMobileRef = useRef<SVGSVGElement | null>(null)

  // element refs (desktop)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const govPanelRef = useRef<HTMLDivElement | null>(null)
  const entPanelRef = useRef<HTMLDivElement | null>(null)
  const govLeafARef = useRef<HTMLDivElement | null>(null)
  const govLeafBRef = useRef<HTMLDivElement | null>(null)
  const entLeafARef = useRef<HTMLDivElement | null>(null)
  const entLeafBRef = useRef<HTMLDivElement | null>(null)

  // element refs (mobile)
  const mRootRef = useRef<HTMLDivElement | null>(null)
  const mGovPanelRef = useRef<HTMLDivElement | null>(null)
  const mEntPanelRef = useRef<HTMLDivElement | null>(null)
  const mGovLeafRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]
  const mEntLeafRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 70%", "end 60%"],
  })
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 80%", "end 70%"],
  })

  const reduceMotion = useReducedMotion()

  // use a media-query driven flag to pick which progress to use so the hidden
  // variant does not animate in the background. breakpoint: lg (1024px)
  const [isDesktop, setIsDesktop] = useState<boolean>(true)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches)
    update(mq)
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // choose active scroll progress based on viewport
  const activeProgress = isDesktop ? desktopProgress : mobileProgress

  const path1 = (reduceMotion ? 1 : useTransform(activeProgress, [0, 0.15], [0, 1])) as MotionValue<number> | number
  const path23 = (reduceMotion ? 1 : useTransform(activeProgress, [0.15, 0.35], [0, 1])) as MotionValue<number> | number
  // four leaf paths: staggered ranges
  const leafA = (reduceMotion ? 1 : useTransform(activeProgress, [0.35, 0.5], [0, 1])) as MotionValue<number> | number
  const leafB = (reduceMotion ? 1 : useTransform(activeProgress, [0.37, 0.52], [0, 1])) as MotionValue<number> | number
  const leafC = (reduceMotion ? 1 : useTransform(activeProgress, [0.5, 0.6], [0, 1])) as MotionValue<number> | number
  const leafD = (reduceMotion ? 1 : useTransform(activeProgress, [0.52, 0.65], [0, 1])) as MotionValue<number> | number

  // twigs animation values (animate slightly after their parent branches)
  const twigMain = (reduceMotion ? 1 : useTransform(activeProgress, [0.36, 0.5], [0, 1])) as MotionValue<number> | number
  const twigLeaf = (reduceMotion ? 1 : useTransform(activeProgress, [0.5, 0.66], [0, 1])) as MotionValue<number> | number

  // endpoint bud radii (map path progress to a growing radius)
  const leafARadius = reduceMotion ? 6 : useTransform(leafA as MotionValue<number>, [0.95, 1], [2, 6])
  const leafBRadius = reduceMotion ? 6 : useTransform(leafB as MotionValue<number>, [0.95, 1], [2, 6])
  const leafCRadius = reduceMotion ? 6 : useTransform(leafC as MotionValue<number>, [0.95, 1], [2, 6])
  const leafDRadius = reduceMotion ? 6 : useTransform(leafD as MotionValue<number>, [0.95, 1], [2, 6])

  // bloom scales for leaves: produce a subtle spring-like overshoot via
  // a three-stop mapping so the leaf briefly scales slightly past 1 then
  // settles back to 1 as the path finishes drawing.
  const leafAScale = (reduceMotion
    ? 1
    : useTransform(leafA as MotionValue<number>, [0, 0.95, 1], [0.6, 1.12, 1])) as MotionValue<number> | number
  const leafBScale = (reduceMotion
    ? 1
    : useTransform(leafB as MotionValue<number>, [0, 0.95, 1], [0.6, 1.12, 1])) as MotionValue<number> | number
  const leafCScale = (reduceMotion
    ? 1
    : useTransform(leafC as MotionValue<number>, [0, 0.95, 1], [0.6, 1.12, 1])) as MotionValue<number> | number
  const leafDScale = (reduceMotion
    ? 1
    : useTransform(leafD as MotionValue<number>, [0, 0.95, 1], [0.6, 1.12, 1])) as MotionValue<number> | number

  // detect RTL at runtime and flip the SVG & anchors
  const [isRTL, setIsRTL] = useState(false)
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsRTL(document.documentElement.dir === "rtl")
    }
  }, [])

  // measured node coordinates in SVG space (pixels)
  const [nodeCoords, setNodeCoords] = useState<Record<string, { x: number; y: number }> | null>(null)
  const [svgSize, setSvgSize] = useState<{ width: number; height: number } | null>(null)

  // layout constants (tuneable)
  const MIN_PANEL_TO_LEAF_V_GAP = 56 // px vertical gap between panel bottom and leaf top
  const MIN_SIBLING_H_GAP = 32 // px horizontal gap between sibling leaf centers

  // fallback percentage positions used to absolutely place panels/cards
  // (these are the same percentage anchors used previously; measurement will
  // override SVG drawing to match actual DOM positions)
  const nodePositions = {
    root: { left: "50%", top: "6%" },
    govPanel: { left: "20%", top: "30%" },
    entPanel: { left: "80%", top: "30%" },
    govLeafA: { left: "12%", top: "48%" },
    govLeafB: { left: "28%", top: "52%" },
    entLeafA: { left: "72%", top: "48%" },
    entLeafB: { left: "88%", top: "52%" },
  }

  // utility: measure and compute coordinates for a list of refs relative to an svg container
  function computeCoords(svgEl: SVGSVGElement | null, refs: Record<string, HTMLElement | null>) {
    if (!svgEl) return undefined
    const svgRect = svgEl.getBoundingClientRect()
    const out: Record<string, { x: number; y: number }> = {}
    const sizes: Record<string, { w: number; h: number }> = {}
    for (const key of Object.keys(refs)) {
      const el = refs[key]
      if (!el) continue
      const r = el.getBoundingClientRect()
      // use element center for both x and y so SVG endpoints match DOM markers
      out[key] = { x: r.left - svgRect.left + r.width / 2, y: r.top - svgRect.top + r.height / 2 }
      sizes[key] = { w: r.width, h: r.height }
    }
    return { out, sizes, width: svgRect.width, height: svgRect.height }
  }

  // measurement effect
  useLayoutEffect(() => {
    let mounted = true
    let tid: number | undefined

    const measure = () => {
      const useDesktop = isDesktop
      if (useDesktop) {
        const svg = svgDesktopRef.current
        const refs: Record<string, HTMLElement | null> = {
          root: rootRef.current,
          govPanel: govPanelRef.current,
          entPanel: entPanelRef.current,
          govLeafA: govLeafARef.current,
          govLeafB: govLeafBRef.current,
          entLeafA: entLeafARef.current,
          entLeafB: entLeafBRef.current,
        }
        const measured = computeCoords(svg, refs)
        if (measured && mounted) {
          // perform safety clamping so panels/cards never extend past svg bounds
          const adjusted: Record<string, { x: number; y: number }> = { ...measured.out }
          const svgW = measured.width

          // clamp panels so their center keeps them inside the svg container
          const clampCenter = (centerX: number, elW: number) => Math.max(elW / 2, Math.min(centerX, svgW - elW / 2))

          // panel widths
          const govW = measured.sizes.govPanel?.w ?? 0
          const entW = measured.sizes.entPanel?.w ?? 0

          if (measured.out.govPanel) {
            adjusted.govPanel.x = clampCenter(measured.out.govPanel.x, govW)
          }
          if (measured.out.entPanel) {
            adjusted.entPanel.x = clampCenter(measured.out.entPanel.x, entW)
          }

          // enforce vertical gap between panel bottom and leaves
          const govH = measured.sizes.govPanel?.h ?? 0
          const entH = measured.sizes.entPanel?.h ?? 0
          const govLeafA_H = measured.sizes.govLeafA?.h ?? 0
          const govLeafB_H = measured.sizes.govLeafB?.h ?? 0
          const entLeafA_H = measured.sizes.entLeafA?.h ?? 0
          const entLeafB_H = measured.sizes.entLeafB?.h ?? 0

          if (measured.out.govLeafA && measured.out.govPanel) {
            const minY = measured.out.govPanel.y + govH / 2 + MIN_PANEL_TO_LEAF_V_GAP + govLeafA_H / 2
            adjusted.govLeafA.y = Math.max(measured.out.govLeafA.y, minY)
          }
          if (measured.out.govLeafB && measured.out.govPanel) {
            const minY = measured.out.govPanel.y + govH / 2 + MIN_PANEL_TO_LEAF_V_GAP + govLeafB_H / 2
            adjusted.govLeafB.y = Math.max(measured.out.govLeafB.y, minY)
          }
          if (measured.out.entLeafA && measured.out.entPanel) {
            const minY = measured.out.entPanel.y + entH / 2 + MIN_PANEL_TO_LEAF_V_GAP + entLeafA_H / 2
            adjusted.entLeafA.y = Math.max(measured.out.entLeafA.y, minY)
          }
          if (measured.out.entLeafB && measured.out.entPanel) {
            const minY = measured.out.entPanel.y + entH / 2 + MIN_PANEL_TO_LEAF_V_GAP + entLeafB_H / 2
            adjusted.entLeafB.y = Math.max(measured.out.entLeafB.y, minY)
          }

          // ensure sibling horizontal gap for government leaves
          if (measured.out.govLeafA && measured.out.govLeafB) {
            let aX = adjusted.govLeafA.x
            let bX = adjusted.govLeafB.x
            const minSep = (measured.sizes.govLeafA.w + measured.sizes.govLeafB.w) / 2 + MIN_SIBLING_H_GAP
            const curSep = Math.abs(bX - aX)
            if (curSep < minSep) {
              const delta = (minSep - curSep) / 2
              aX = Math.max(measured.sizes.govLeafA.w / 2, aX - delta)
              bX = Math.min(svgW - measured.sizes.govLeafB.w / 2, bX + delta)
              adjusted.govLeafA.x = aX
              adjusted.govLeafB.x = bX
            }
          }

          // ensure sibling horizontal gap for enterprise leaves
          if (measured.out.entLeafA && measured.out.entLeafB) {
            let aX = adjusted.entLeafA.x
            let bX = adjusted.entLeafB.x
            const minSep = (measured.sizes.entLeafA.w + measured.sizes.entLeafB.w) / 2 + MIN_SIBLING_H_GAP
            const curSep = Math.abs(bX - aX)
            if (curSep < minSep) {
              const delta = (minSep - curSep) / 2
              aX = Math.max(measured.sizes.entLeafA.w / 2, aX - delta)
              bX = Math.min(svgW - measured.sizes.entLeafB.w / 2, bX + delta)
              adjusted.entLeafA.x = aX
              adjusted.entLeafB.x = bX
            }
          }

          setSvgSize({ width: measured.width, height: measured.height })
          setNodeCoords(adjusted)
        }
      } else {
        const svg = svgMobileRef.current
        const refs: Record<string, HTMLElement | null> = {
          root: mRootRef.current,
          govPanel: mGovPanelRef.current,
          entPanel: mEntPanelRef.current,
          govLeafA: mGovLeafRefs[0].current,
          govLeafB: mGovLeafRefs[1].current,
          entLeafA: mEntLeafRefs[0].current,
          entLeafB: mEntLeafRefs[1].current,
        }
        const measured = computeCoords(svg, refs)
        if (measured && mounted) {
          // mobile: use measured centers directly (stacked layout less likely to overflow)
          setSvgSize({ width: measured.width, height: measured.height })
          setNodeCoords(measured.out)
        }
      }
    }

    measure()
    const onResize = () => {
      if (tid) window.clearTimeout(tid)
      tid = window.setTimeout(measure, 120)
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    return () => {
      mounted = false
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
      if (tid) window.clearTimeout(tid)
    }
  }, [isDesktop])

  // split solutions by parentBranch but keep the incoming array order for predictability
  const govSolutions = solutions.filter((s) => s.parentBranch === "government")
  const entSolutions = solutions.filter((s) => s.parentBranch === "enterprise")

  return (
    <section
      ref={isDesktop ? (desktopRef as any) : (mobileRef as any)}
      className={cn("relative overflow-x-clip overflow-y-visible bg-[#F6F8F5] py-14 md:py-24 lg:py-32")}
      aria-labelledby="growth-tree-heading"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            tone="light"
            id="growth-tree-heading"
          />
        </div>
      </Container>

      <div className="relative w-full">
        {/* Tree area: large min-height to accommodate branches */}
        <div className="w-full mx-auto relative">
          {/* Desktop branching diagram */}
          <div className="hidden lg:block w-full relative" style={{ minHeight: 1600 }}>
              <motion.svg
                ref={svgDesktopRef as any}
                viewBox={nodeCoords ? `0 0 ${Math.max(1200, Math.ceil((svgDesktopRef.current?.getBoundingClientRect().width) || VIEWBOX_WIDTH))} ${Math.max(1400, Math.ceil((svgDesktopRef.current?.getBoundingClientRect().height) || VIEWBOX_HEIGHT))}` : `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              className={cn(
                "pointer-events-none absolute inset-0 w-full h-full",
                isRTL ? "origin-center -scale-x-100" : ""
              )}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* only render paths once we have measured coords to avoid floating endpoints */}
              {nodeCoords && (
                <>
                  {/* gradients */}
                  <defs>
                    <linearGradient id="treeGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#7ED957" />
                      <stop offset="100%" stopColor="#1E7A3C" />
                    </linearGradient>
                  </defs>

                  {/* compute trunk midpoint */}
                  {(() => {
                    const root = nodeCoords.root
                    const gov = nodeCoords.govPanel
                    const ent = nodeCoords.entPanel
                    const trunkY = Math.min(gov.y, ent.y) - 120
                    const trunkMid = { x: root.x, y: trunkY }

                    // Build an angled/polyline path between two points using a single
                    // intermediate "elbow" so branches split at a visually consistent
                    // angle (approx. 35-40deg). This preserves geometric, architectural
                    // character while still reaching measured card positions.
                    const buildAngledPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
                      const dx = b.x - a.x
                      const dy = b.y - a.y
                      // midpoint along y between source and target
                      const midY = a.y + dy * 0.5
                      // desired split angle from the parent (in radians)
                      const angleDeg = 40
                      const angleRad = (angleDeg * Math.PI) / 180
                      // compute an x-offset so the first segment leaves the parent at ~angleDeg
                      const offsetX = Math.tan(angleRad) * Math.abs(midY - a.y)
                      const side = dx >= 0 ? 1 : -1
                      const elbowX = a.x + side * offsetX
                      const elbowY = midY
                      // use two straight segments: parent -> elbow -> target
                      return `M ${a.x} ${a.y} L ${elbowX} ${elbowY} L ${b.x} ${b.y}`
                    }

                    // small helper to generate twig endpoints
                    const makeTwig = (a: { x: number; y: number }, b: { x: number; y: number }, t: number, length = 30, side = 1) => {
                      const dx = b.x - a.x
                      const dy = b.y - a.y
                      const px = a.x + dx * t
                      const py = a.y + dy * t
                      const len = length
                      const nx = -dy
                      const ny = dx
                      const nlen = Math.hypot(nx, ny) || 1
                      const ux = (nx / nlen) * side * len
                      const uy = (ny / nlen) * side * len
                      return { x1: px, y1: py, x2: px + ux, y2: py + uy }
                    }

                    // trunk: straight vertical segment from root to trunk midpoint
                    const trunkPath = `M ${root.x} ${root.y} L ${trunkMid.x} ${trunkMid.y}`
                    const govPath = buildAngledPath(trunkMid, nodeCoords.govPanel)
                    const entPath = buildAngledPath(trunkMid, nodeCoords.entPanel)
                    const govLeafAPath = buildAngledPath(nodeCoords.govPanel, nodeCoords.govLeafA)
                    const govLeafBPath = buildAngledPath(nodeCoords.govPanel, nodeCoords.govLeafB)
                    const entLeafAPath = buildAngledPath(nodeCoords.entPanel, nodeCoords.entLeafA)
                    const entLeafBPath = buildAngledPath(nodeCoords.entPanel, nodeCoords.entLeafB)

                    // twigs: a couple per main branch
                    const twig1 = makeTwig(trunkMid, nodeCoords.govPanel, 0.45, 26, -1)
                    const twig2 = makeTwig(trunkMid, nodeCoords.govPanel, 0.6, 22, 1)
                    const twig3 = makeTwig(trunkMid, nodeCoords.entPanel, 0.45, 26, 1)
                    const twig4 = makeTwig(trunkMid, nodeCoords.entPanel, 0.6, 22, -1)

                    return (
                      <g>
                        {/* trunk */}
                        <motion.path
                          d={trunkPath}
                          stroke="url(#treeGrad)"
                          strokeWidth={5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          style={{ pathLength: path1 as any }}
                        />

                        {/* main branches */}
                        <motion.g
                          style={{ transformOrigin: `${trunkMid.x}px ${trunkMid.y}px` }}
                          animate={reduceMotion ? undefined : undefined}
                        >
                          <motion.path
                            d={govPath}
                            stroke="url(#treeGrad)"
                            strokeWidth={3.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            style={{ pathLength: path23 as any }}
                          />
                          <motion.path
                            d={entPath}
                            stroke="url(#treeGrad)"
                            strokeWidth={3.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            style={{ pathLength: path23 as any }}
                          />

                          {/* twigs for main branches */}
                          <motion.path d={`M ${twig1.x1} ${twig1.y1} L ${twig1.x2} ${twig1.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigMain as any }} />
                          <motion.path d={`M ${twig2.x1} ${twig2.y1} L ${twig2.x2} ${twig2.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigMain as any }} />
                          <motion.path d={`M ${twig3.x1} ${twig3.y1} L ${twig3.x2} ${twig3.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigMain as any }} />
                          <motion.path d={`M ${twig4.x1} ${twig4.y1} L ${twig4.x2} ${twig4.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigMain as any }} />
                        </motion.g>

                        {/* leaf branches */}
                        <motion.path d={govLeafAPath} stroke="url(#treeGrad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: leafA as any }} />
                        <motion.path d={govLeafBPath} stroke="url(#treeGrad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: leafB as any }} />
                        <motion.path d={entLeafAPath} stroke="url(#treeGrad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: leafC as any }} />
                        <motion.path d={entLeafBPath} stroke="url(#treeGrad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ pathLength: leafD as any }} />

                        {/* leaf twigs */}
                        {(() => {
                          const lg1 = makeTwig(nodeCoords.govPanel, nodeCoords.govLeafA, 0.35, 18, -1)
                          const lg2 = makeTwig(nodeCoords.govPanel, nodeCoords.govLeafB, 0.5, 16, 1)
                          return (
                            <>
                              <motion.path d={`M ${lg1.x1} ${lg1.y1} L ${lg1.x2} ${lg1.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigLeaf as any }} />
                              <motion.path d={`M ${lg2.x1} ${lg2.y1} L ${lg2.x2} ${lg2.y2}`} stroke="#2F8E3D" strokeWidth={1} strokeLinecap="round" style={{ pathLength: twigLeaf as any }} />
                            </>
                          )
                        })()}

                        {/* endpoint leaves: stylized almond/vesica shapes that align with
                            the incoming branch angle. `buildLeafPath` creates a vertical
                            leaf centered at (cx,cy) and we rotate it to match the branch.
                            The scale is driven by the leaf*Scale MotionValues for a
                            brief overshoot bloom as the path completes. */}
                        {(() => {
                          const buildLeafPath = (cx: number, cy: number, angle: number, size = 12) => {
                            // simple vesica-path (two arcs) centered at cx,cy; rotate via
                            // the element's transform attribute so the d can stay simple
                            const rx = size * 0.55
                            const ry = size
                            return `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 0 ${cx} ${cy + ry} A ${rx} ${ry} 0 1 0 ${cx} ${cy - ry} Z`
                          }

                          const gA = nodeCoords.govLeafA
                          const gB = nodeCoords.govLeafB
                          const eA = nodeCoords.entLeafA
                          const eB = nodeCoords.entLeafB
                          const gp = nodeCoords.govPanel
                          const ep = nodeCoords.entPanel

                          const angleGovA = (Math.atan2(gA.y - gp.y, gA.x - gp.x) * 180) / Math.PI
                          const angleGovB = (Math.atan2(gB.y - gp.y, gB.x - gp.x) * 180) / Math.PI
                          const angleEntA = (Math.atan2(eA.y - ep.y, eA.x - ep.x) * 180) / Math.PI
                          const angleEntB = (Math.atan2(eB.y - ep.y, eB.x - ep.x) * 180) / Math.PI

                          return (
                            <>
                              <motion.g style={{ scale: leafAScale as any, transformOrigin: `${gA.x}px ${gA.y - 6}px` }}>
                                <motion.path d={buildLeafPath(gA.x, gA.y - 6, angleGovA, 12)} transform={`rotate(${angleGovA} ${gA.x} ${gA.y - 6})`} fill="url(#treeGrad)" />
                              </motion.g>

                              <motion.g style={{ scale: leafBScale as any, transformOrigin: `${gB.x}px ${gB.y - 6}px` }}>
                                <motion.path d={buildLeafPath(gB.x, gB.y - 6, angleGovB, 12)} transform={`rotate(${angleGovB} ${gB.x} ${gB.y - 6})`} fill="url(#treeGrad)" />
                              </motion.g>

                              <motion.g style={{ scale: leafCScale as any, transformOrigin: `${eA.x}px ${eA.y - 6}px` }}>
                                <motion.path d={buildLeafPath(eA.x, eA.y - 6, angleEntA, 12)} transform={`rotate(${angleEntA} ${eA.x} ${eA.y - 6})`} fill="url(#treeGrad)" />
                              </motion.g>

                              <motion.g style={{ scale: leafDScale as any, transformOrigin: `${eB.x}px ${eB.y - 6}px` }}>
                                <motion.path d={buildLeafPath(eB.x, eB.y - 6, angleEntB, 12)} transform={`rotate(${angleEntB} ${eB.x} ${eB.y - 6})`} fill="url(#treeGrad)" />
                              </motion.g>

                              {/* root emphasis: slightly larger leaf to read as source + pulse */}
                              <motion.g style={{ transformOrigin: `${nodeCoords.root.x}px ${nodeCoords.root.y}px` }}>
                                <motion.path d={buildLeafPath(nodeCoords.root.x, nodeCoords.root.y, 0, 14)} transform={`rotate(0 ${nodeCoords.root.x} ${nodeCoords.root.y})`} fill="url(#treeGrad)" />
                              </motion.g>

                              {!reduceMotion && (
                                <motion.circle cx={nodeCoords.root.x} cy={nodeCoords.root.y} r={20} fill="#4CAF50" opacity={0.12} animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.06, 0.12] }} transition={{ duration: 3.5, repeat: Infinity }} />
                              )}
                            </>
                          )
                        })()}
                      </g>
                    )
                  })()}
                </>
              )}
            </motion.svg>
          </div>

          {/* Mobile stacked diagram: simplified vertical tree */}
          <div className="lg:hidden w-full relative" ref={mobileRef as any}>
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.svg ref={svgMobileRef as any} viewBox={`0 0 600 1400`} className="w-full h-full">
                {/* vertical trunk */}
                <motion.path
                  d={`M300 40 L300 160`}
                  stroke="#4CAF50"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: path1 as any }}
                />

                {/* trunk -> government panel */}
                <motion.path
                  d={`M300 160 L300 360`}
                  stroke="#4CAF50"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: path23 as any }}
                />

                {/* government -> leaves */}
                <motion.path
                  d={`M300 420 L220 540`}
                  stroke="#4CAF50"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: leafA as any }}
                />
                <motion.path
                  d={`M300 420 L380 540`}
                  stroke="#4CAF50"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: leafB as any }}
                />

                {/* government -> enterprise connector */}
                <motion.path
                  d={`M300 680 L300 840`}
                  stroke="#4CAF50"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: path23 as any }}
                />

                {/* enterprise -> leaves */}
                <motion.path
                  d={`M300 920 L220 1040`}
                  stroke="#4CAF50"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: leafC as any }}
                />
                <motion.path
                  d={`M300 920 L380 1040`}
                  stroke="#4CAF50"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: leafD as any }}
                />
              </motion.svg>
            </div>

            {/* Stacked panels and cards */}
            <div className="max-w-2xl mx-auto py-8">
              {/* Root marker */}
              <div className="flex justify-center mb-8">
                <div ref={mRootRef as any} className="w-4 h-4 rounded-full bg-[#4CAF50]" />
              </div>

              {/* Government panel */}
              <div ref={mGovPanelRef as any} className="mx-4 mb-8">
                <div className="bg-[#0B1F14] rounded-2xl p-6 text-[#F3F7F3]">
                  <h3 className="font-heading font-bold text-xl">{governmentPanel.title}</h3>
                  {governmentPanel.subtitle && <p className="mt-2 text-mutedDark text-sm">{governmentPanel.subtitle}</p>}
                </div>
              </div>

              {/* Government leaf cards stacked */}
              <div className="mx-4 mb-12 space-y-4">
                {govSolutions.map((s, i) => (
                  <motion.div ref={mGovLeafRefs[i] as any} key={i} initial={{ opacity: 0, scale: 0.96 }} style={{ opacity: i === 0 ? (leafA as any) : (leafB as any) }} className="bg-white border border-[#EAEFE8] rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{s.icon}</div>
                      <div>
                        <h4 className="font-heading font-semibold text-lg">{s.title}</h4>
                        <p className="text-sm text-mutedLight">{s.description}</p>
                        <a href={s.href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enterprise panel */}
              <div ref={mEntPanelRef as any} className="mx-4 mb-8">
                <div className="bg-[#12291C] rounded-2xl p-6 text-[#CFF7D8]">
                  <h3 className="font-heading font-bold text-xl">{enterprisePanel.title}</h3>
                  {enterprisePanel.subtitle && <p className="mt-2 text-mutedDark text-sm">{enterprisePanel.subtitle}</p>}
                </div>
              </div>

              {/* Enterprise leaf cards stacked */}
              <div className="mx-4 mb-12 space-y-4">
                {entSolutions.map((s, i) => (
                  <motion.div ref={mEntLeafRefs[i] as any} key={i} initial={{ opacity: 0, scale: 0.96 }} style={{ opacity: i === 0 ? (leafC as any) : (leafD as any) }} className="bg-white border border-[#EAEFE8] rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{s.icon}</div>
                      <div>
                        <h4 className="font-heading font-semibold text-lg">{s.title}</h4>
                        <p className="text-sm text-mutedLight">{s.description}</p>
                        <a href={s.href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Panels & Cards placed absolutely to align visually with the SVG */}
          {/* Root marker */}
          <div
            ref={rootRef as any}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={
              nodeCoords
                ? { left: `${nodeCoords.root.x}px`, top: `${nodeCoords.root.y}px` }
                : { left: nodePositions.root.left, top: nodePositions.root.top }
            }
          >
            <div className="w-4 h-4 rounded-full bg-[#4CAF50]" />
          </div>

          {/* Government panel */}
          <motion.div
            ref={govPanelRef as any}
            initial={{ opacity: 0, scale: 0.95 }}
            className="absolute transform -translate-x-1/2"
            style={{
              opacity: path23 as any,
              scale: path23 as any,
              left: nodeCoords ? `${nodeCoords.govPanel.x}px` : isRTL ? undefined : nodePositions.govPanel.left,
              right: nodeCoords ? undefined : isRTL ? nodePositions.govPanel.left : undefined,
              top: nodeCoords ? `${nodeCoords.govPanel.y}px` : nodePositions.govPanel.top,
            }}
          >
            <div className="bg-[#0B1F14] rounded-2xl p-8 min-w-[280px] max-w-sm text-[#F3F7F3]">
              <h3 className="font-heading font-bold text-xl">{governmentPanel.title}</h3>
              {governmentPanel.subtitle && <p className="mt-2 text-mutedDark text-sm">{governmentPanel.subtitle}</p>}
              {governmentPanel.tags && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {governmentPanel.tags.map((t, i) => (
                    <div key={i} className="px-2 py-1 rounded-full bg-white/5 text-sm">
                      <span className="inline-flex items-center gap-2">{t.icon}<span>{t.label}</span></span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Enterprise panel */}
          <motion.div
            ref={entPanelRef as any}
            initial={{ opacity: 0, scale: 0.95 }}
            className="absolute transform -translate-x-1/2"
            style={{
              opacity: path23 as any,
              scale: path23 as any,
              left: nodeCoords ? `${nodeCoords.entPanel.x}px` : isRTL ? undefined : nodePositions.entPanel.left,
              right: nodeCoords ? undefined : isRTL ? nodePositions.entPanel.left : undefined,
              top: nodeCoords ? `${nodeCoords.entPanel.y}px` : nodePositions.entPanel.top,
            }}
          >
            <div className="bg-[#12291C] rounded-2xl p-8 min-w-[280px] max-w-sm text-[#CFF7D8]">
              <h3 className="font-heading font-bold text-xl">{enterprisePanel.title}</h3>
              {enterprisePanel.subtitle && <p className="mt-2 text-mutedDark text-sm">{enterprisePanel.subtitle}</p>}
              {enterprisePanel.tags && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {enterprisePanel.tags.map((t, i) => (
                    <div key={i} className="px-2 py-1 rounded-full bg-white/5 text-sm">
                      <span className="inline-flex items-center gap-2">{t.icon}<span>{t.label}</span></span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Government leaf cards */}
          <div
            ref={govLeafARef as any}
            className="absolute transform -translate-x-1/2"
            style={nodeCoords ? { left: `${nodeCoords.govLeafA.x}px`, top: `${nodeCoords.govLeafA.y}px` } : { left: nodePositions.govLeafA.left, top: nodePositions.govLeafA.top }}
          >
            {govSolutions[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                style={{ opacity: leafA as any, scale: leafA as any }}
                className="bg-white border border-[#EAEFE8] rounded-xl p-6 max-w-[240px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{govSolutions[0].icon}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">{govSolutions[0].title}</h4>
                    <p className="text-sm text-mutedLight">{govSolutions[0].description}</p>
                    <a href={govSolutions[0].href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div
            ref={govLeafBRef as any}
            className="absolute transform -translate-x-1/2"
            style={nodeCoords ? { left: `${nodeCoords.govLeafB.x}px`, top: `${nodeCoords.govLeafB.y}px` } : { left: nodePositions.govLeafB.left, top: nodePositions.govLeafB.top }}
          >
            {govSolutions[1] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                style={{ opacity: leafB as any, scale: leafB as any }}
                className="bg-white border border-[#EAEFE8] rounded-xl p-6 max-w-[240px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{govSolutions[1].icon}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">{govSolutions[1].title}</h4>
                    <p className="text-sm text-mutedLight">{govSolutions[1].description}</p>
                    <a href={govSolutions[1].href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Enterprise leaf cards */}
          <div
            ref={entLeafARef as any}
            className="absolute transform -translate-x-1/2"
            style={nodeCoords ? { left: `${nodeCoords.entLeafA.x}px`, top: `${nodeCoords.entLeafA.y}px` } : { left: nodePositions.entLeafA.left, top: nodePositions.entLeafA.top }}
          >
            {entSolutions[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                style={{ opacity: leafC as any, scale: leafC as any }}
                className="bg-white border border-[#EAEFE8] rounded-xl p-6 max-w-[240px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{entSolutions[0].icon}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">{entSolutions[0].title}</h4>
                    <p className="text-sm text-mutedLight">{entSolutions[0].description}</p>
                    <a href={entSolutions[0].href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div
            ref={entLeafBRef as any}
            className="absolute transform -translate-x-1/2"
            style={nodeCoords ? { left: `${nodeCoords.entLeafB.x}px`, top: `${nodeCoords.entLeafB.y}px` } : { left: nodePositions.entLeafB.left, top: nodePositions.entLeafB.top }}
          >
            {entSolutions[1] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                style={{ opacity: leafD as any, scale: leafD as any }}
                className="bg-white border border-[#EAEFE8] rounded-xl p-6 max-w-[240px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F8F5] flex items-center justify-center">{entSolutions[1].icon}</div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg">{entSolutions[1].title}</h4>
                    <p className="text-sm text-mutedLight">{entSolutions[1].description}</p>
                    <a href={entSolutions[1].href} className="text-primary inline-flex items-center gap-2 mt-2">Learn more →</a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthTree
