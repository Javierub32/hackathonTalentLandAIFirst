import { useEffect, useRef } from "react"

/** Local preview only: frames are never uploaded, recorded or analysed. */
export function CandidatePreview({ onError }: { onError: (message: string) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const errorHandler = useRef(onError)
  errorHandler.current = onError
  useEffect(() => {
    let cancelled = false
    let stream: MediaStream | undefined
    async function open() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        if (cancelled) { stream.getTracks().forEach((track) => track.stop()); return }
        if (video.current) video.current.srcObject = stream
      } catch {
        if (!cancelled) errorHandler.current("No se pudo abrir la cámara. Seguimos con tu avatar; puedes responder igual.")
      }
    }
    void open()
    return () => { cancelled = true; stream?.getTracks().forEach((track) => track.stop()) }
  }, [])
  return <video ref={video} autoPlay muted playsInline aria-label="Tu cámara: vista previa local" />
}
