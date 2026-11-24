import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router"
import { ArrowLeft, Volume2, RotateCcw, Camera, CameraOff, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Etiqueta } from "@/components/brand/Etiqueta"
import { Decoracion } from "@/components/brand/Decoracion"
import { API_MODE, api } from "@/lib/api/client"
import type { components } from "@/lib/api/schema"
import { PracticeRecorder } from "../PracticeRecorder"
import { InterviewerPortrait } from "../InterviewerPortrait"
import { CandidatePreview } from "../CandidatePreview"
import { say, stopSpeaking } from "../audio"
import "../practice.css"

type Feedback = components["schemas"]["InterviewFeedback"]
type Result = { question: string; answer: string; feedback: Feedback }

export default function PracticePage() {
  const { id } = useParams()
  const offerId = Number(id)
  if (!id || !/^\d+$/.test(id) || !Number.isSafeInteger(offerId) || offerId < 1) return <p>Oferta no válida. <Link to="/ofertas">Volver a ofertas</Link></p>
  return <Session key={offerId} offerId={offerId} />
}

function Session({ offerId }: { offerId: number }) {
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [busy, setBusy] = useState(false)
  const [audioError, setAudioError] = useState("")
  const [results, setResults] = useState<Result[]>([])
  const [finished, setFinished] = useState(false)
  const [camera, setCamera] = useState(false)
  const [cameraError, setCameraError] = useState("")
  useEffect(() => () => stopSpeaking(), [])
  const offer = useQuery({ queryKey: ["offers", offerId], queryFn: async ({ signal }) => {
    const { data } = await api.GET("/api/offers/{offer_id}", { params: { path: { offer_id: offerId } }, signal })
    if (!data) throw new Error("No se pudo cargar la oferta.")
    return data
  } })
  const questions = useQuery({ queryKey: ["interview", "questions", offerId, 1], staleTime: Infinity, refetchOnWindowFocus: false, queryFn: async ({ signal }) => {
    const { data } = await api.POST("/api/interview/questions", { body: { offer_id: offerId, candidate_id: 1 }, signal })
    if (!data) throw new Error("No se pudieron preparar las preguntas.")
    return data
  } })
  const current = questions.data?.questions[index]
  const total = questions.data?.questions.length ?? 0
  const feedback = useMutation({ mutationFn: async (submitted: string) => {
    if (!current) throw new Error("Pregunta no disponible")
    const { data } = await api.POST("/api/interview/feedback", { body: { offer_id: offerId, question: current.text, answer: submitted } })
    if (!data) throw new Error("No se pudo preparar el comentario. Vuelve a intentarlo.")
    return { question: current.text, answer: submitted, feedback: data }
  }, onSuccess: (result) => setResults((previous) => [...previous, result]) })
  function read(text: string) { setAudioError(""); say(text, setAudioError) }
  function next() {
    stopSpeaking()
    if (index + 1 === total) { setFinished(true); return }
    setIndex(index + 1); setAnswer(""); feedback.reset()
    read(questions.data!.questions[index + 1].text)
  }
  function restart() {
    stopSpeaking(); setStarted(false); setIndex(0); setAnswer(""); feedback.reset(); setResults([]); setFinished(false); setAudioError("")
  }
  const subtitle = finished ? "Has terminado. Tu experiencia cuenta." : !started ? questions.data?.intro ?? "Preparando tu entrevista…" : current?.text
  const shownFeedback = feedback.data?.feedback
  return <div className="practice-call">
    <header className="call-heading">
      <Link className="call-back" to={`/ofertas/${offerId}`}><ArrowLeft aria-hidden /> Volver a la oferta</Link>
      <div className="call-title"><h1>Practica tu entrevista</h1><p className="call-offer">{offer.data?.title ?? "Cargando oferta…"}</p></div>
      <Etiqueta>Sin prisa, a tu ritmo</Etiqueta>
    </header>
    {API_MODE === "fixtures" && <p className="call-notice" role="status">Demostración: preguntas, transcripción y comentarios de ejemplo. Usa el modo live para practicar con tu voz real.</p>}
    <div className={`call-body ${shownFeedback || finished ? "has-feedback" : ""}`}>
      <section className="call-stage" aria-label="Videollamada simulada con la entrevistadora IA">
        <Decoracion />
        <div className="interviewer-name"><span className="call-presence" aria-hidden /><span>Tu entrevistadora<small>Práctica con inteligencia artificial</small></span></div>
        <InterviewerPortrait />
        <div className="candidate-tile">
          {camera ? <CandidatePreview onError={(message) => { setCameraError(message); setCamera(false) }} /> : <UserRound aria-hidden className="candidate-avatar" />}
          <span>Pilar · Tú</span>
        </div>
        <div className="call-subtitles" aria-live="polite">
          <span>{started && !finished ? `Pregunta ${index + 1} de ${total}` : finished ? "Práctica completada" : "A tu ritmo"}</span>
          <p>{subtitle}</p>
        </div>
      </section>
      {(shownFeedback || finished) && <aside className="call-feedback" aria-label="Comentarios de tu entrevista" aria-live="polite">
        <h2>{finished ? "Tu práctica" : "Tu comentario"}</h2>
        {finished ? <><p>Has respondido {results.length} preguntas.</p>{results.map((result, i) => <details key={i}><summary>Pregunta {i + 1}</summary><p>{result.question}</p><p><strong>Tu respuesta:</strong> {result.answer}</p><p>{result.feedback.tip}</p></details>)}<Button className="call-button" onClick={restart}><RotateCcw aria-hidden /> Practicar otra vez</Button></> : shownFeedback && <>
          <h3>Lo que hiciste bien</h3><ul>{shownFeedback.good.map((text, i) => <li key={i}>{text}</li>)}</ul>
          <h3>Qué puedes mejorar</h3><ul>{shownFeedback.improve.map((text, i) => <li key={i}>{text}</li>)}</ul>
          <h3>Consejo</h3><p>{shownFeedback.tip}</p>
          <Button variant="outline" className="call-button" onClick={() => read([...shownFeedback.good, ...shownFeedback.improve, shownFeedback.tip].join(". "))}><Volume2 aria-hidden /> Escuchar comentario</Button>
        </>}
      </aside>}
    </div>
    <div className="call-controls">
      <div className="call-toolbar">
      {!started && current && <Button className="call-button" onClick={() => { setStarted(true); read(`${questions.data!.intro} ${current.text}`) }}>Empezar entrevista con audio</Button>}
      {questions.isPending && <p role="status">Preparando las preguntas…</p>}
      {(questions.isError || (questions.isSuccess && !total)) && <Button className="call-button" onClick={() => void questions.refetch()}>Reintentar cargar preguntas</Button>}
      {started && !finished && !shownFeedback && <>
        <PracticeRecorder disabled={feedback.isPending} onBusy={setBusy} onText={setAnswer} />

      </>}
      {shownFeedback && !finished && <Button className="call-button" onClick={next}>{index + 1 < total ? "Siguiente pregunta" : "Terminar entrevista"}</Button>}
      {started && !finished && <Button variant="outline" className="call-button" disabled={busy} onClick={() => read(current?.text ?? "")}><Volume2 aria-hidden /> Repetir pregunta</Button>}
      <Button variant="outline" className="call-button camera-control" onClick={() => { setCameraError(""); setCamera(!camera) }}>{camera ? <CameraOff aria-hidden /> : <Camera aria-hidden />}{camera ? "Apagar cámara" : "Activar cámara"}</Button>
      </div>
      {started && !finished && !shownFeedback && <div className="answer-row">
        <div className="answer-composer"><label htmlFor="practice-answer">Tu respuesta <span>Habla o escribe; podrás corregirla antes de continuar.</span></label><textarea id="practice-answer" rows={2} placeholder="Tu respuesta aparecerá aquí…" value={answer} disabled={busy || feedback.isPending} onChange={(event) => setAnswer(event.target.value)} /></div>
        <Button className="call-button submit-answer" disabled={busy || feedback.isPending || !answer.trim()} onClick={() => feedback.mutate(answer.trim())}>{feedback.isPending ? "Preparando comentario…" : "Ver mi comentario"}</Button>
      </div>}
    </div>
    <div className="call-status" role="status">{audioError || cameraError || (feedback.isError ? feedback.error.message : "")}</div>
    <p className="call-privacy">Tu cámara es privada. Solo comentamos tus respuestas; nunca tu cara, tono o emociones.</p>
  </div>
}
