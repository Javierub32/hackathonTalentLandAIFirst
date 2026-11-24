import { useEffect, useRef, useState } from "react"
import { Mic, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api/client"
import { stopSpeaking } from "./audio"

export function PracticeRecorder({ onText, onBusy, disabled = false }: { disabled?: boolean; onText: (text: string) => void; onBusy: (busy: boolean) => void }) {
  const [state, setState] = useState<"idle" | "opening" | "recording" | "transcribing">("idle")
  const [error, setError] = useState("")
  const recorder = useRef<MediaRecorder | null>(null)
  const mounted = useRef(true)
  const abort = useRef<AbortController | null>(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      abort.current?.abort()
      if (recorder.current) {
        recorder.current.onstop = null
        if (recorder.current.state !== "inactive") recorder.current.stop()
        recorder.current.stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  async function start() {
    setError("")
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Tu navegador no permite grabar aquí. Abre la página en localhost o por HTTPS, o escribe tu respuesta.")
      return
    }
    stopSpeaking()
    setState("opening")
    onBusy(true)
    let stream: MediaStream | undefined
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!mounted.current) { stream.getTracks().forEach((track) => track.stop()); return }
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus"].find((type) => MediaRecorder.isTypeSupported(type))
      const clip = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
      recorder.current = clip
      const chunks: Blob[] = []
      clip.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data) }
      clip.onerror = () => {
        clip.onstop = null
        clip.stream.getTracks().forEach((track) => track.stop())
        setError("La grabación se ha interrumpido. Vuelve a intentarlo o escribe tu respuesta.")
        setState("idle"); onBusy(false)
      }
      clip.onstop = async () => {
        clip.stream.getTracks().forEach((track) => track.stop())
        setState("transcribing")
        try {
          const blob = new Blob(chunks, { type: clip.mimeType })
          if (!blob.size) throw new Error("empty")
          const body = new FormData()
          body.append("file", blob, clip.mimeType.includes("mp4") ? "respuesta.mp4" : clip.mimeType.includes("ogg") ? "respuesta.ogg" : "respuesta.webm")
          abort.current = new AbortController()
          const { data, error } = await api.POST("/api/llm/transcribe", { body: body as never, params: { query: { language: "es" } }, signal: abort.current.signal })
          if (error || !data?.text.trim()) throw new Error("transcription")
          if (mounted.current) onText(data.text)
        } catch {
          if (mounted.current) setError("No se pudo transcribir el audio. Comprueba la conexión con el servidor y vuelve a grabar, o escribe tu respuesta.")
        } finally {
          if (mounted.current) { setState("idle"); onBusy(false) }
        }
      }
      clip.start()
      setState("recording")
    } catch {
      stream?.getTracks().forEach((track) => track.stop())
      if (mounted.current) {
        setError("No se pudo abrir el micrófono. Permite su uso en el navegador y comprueba que hay un micrófono conectado.")
        setState("idle"); onBusy(false)
      }
    }
  }
  return <div className="space-y-2">
    <Button type="button" variant="outline" className="min-h-12 text-lg" disabled={disabled || state === "opening" || state === "transcribing"} aria-pressed={state === "recording"} onClick={() => state === "recording" ? recorder.current?.stop() : void start()}>
      {state === "recording" ? <Square aria-hidden /> : <Mic aria-hidden />}
      {state === "recording" ? "Terminar grabación" : state === "transcribing" ? "Transcribiendo…" : state === "opening" ? "Abriendo micrófono…" : "Responder"}
    </Button>
    <p role="status" className="text-lg">{state === "recording" ? "Te estoy grabando. Pulsa Terminar grabación cuando acabes." : state === "transcribing" ? "Espera mientras pasamos tu voz a texto." : "Después de grabar podrás revisar y corregir la transcripción."}</p>
    {error && <p role="alert" className="text-lg text-destructive">{error}</p>}
  </div>
}
