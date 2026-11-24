import { useState, type FormEvent } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ArrowLeft, ArrowRight, Check, Lightbulb, RotateCcw, Volume2 } from "lucide-react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { VoiceButton } from "@/components/common/VoiceButton"
import { api } from "@/lib/api/client"
import { speak } from "@/lib/speak"
import type { components } from "@/lib/api/schema"

type InterviewQuestions = components["schemas"]["InterviewQuestions"]
type FeedbackRequest = components["schemas"]["FeedbackRequest"]

const CANDIDATE_ID = 1

function InterviewerPortrait() {
  return (
    <svg
      viewBox="0 0 112 112"
      role="img"
      aria-label="Ilustración fija de la entrevistadora"
      className="h-24 w-24 shrink-0 rounded-full border border-border"
    >
      <circle cx="56" cy="56" r="56" className="fill-secondary" />
      <path d="M17 101c4-17 18-26 39-26s35 9 39 26v11H17z" className="fill-primary" />
      <path d="M32 47c0-24 10-36 25-36s25 12 25 36v12H32z" className="fill-foreground" />
      <ellipse cx="57" cy="49" rx="19" ry="23" className="fill-card" />
      <path d="M38 45c4-15 12-21 23-21 8 0 15 4 20 12-5-2-10-5-15-9-6 8-16 13-28 14z" className="fill-foreground" />
      <path d="M48 51h1m15 0h1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-foreground" />
      <path d="M51 61c4 3 8 3 12 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
    </svg>
  )
}

function ListenButton({ text, label }: { text: string; label: string }) {
  return (
    <Button type="button" variant="outline" className="min-h-12 text-lg" onClick={() => void speak(text)}>
      <Volume2 aria-hidden />
      {label}
    </Button>
  )
}

export default function PracticePage() {
  const { id } = useParams()
  const parsedOfferId = Number(id)
  const offerId = Number.isFinite(parsedOfferId) && parsedOfferId > 0 ? parsedOfferId : 1
  const [answer, setAnswer] = useState("")
  const [answerError, setAnswerError] = useState("")
  const [questionIndex, setQuestionIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = useQuery<InterviewQuestions>({
    queryKey: ["interview", "questions", offerId, CANDIDATE_ID],
    queryFn: async ({ signal }) => {
      const { data, error } = await api.POST("/api/interview/questions", {
        body: { offer_id: offerId, candidate_id: CANDIDATE_ID },
        signal,
      })
      if (error || !data) throw new Error("No se pudieron cargar las preguntas. Vuelve a intentarlo.")
      return data
    },
  })

  const feedback = useMutation({
    mutationFn: async (body: FeedbackRequest) => {
      const { data, error } = await api.POST("/api/interview/feedback", { body })
      if (error || !data) throw new Error("No se pudo preparar el comentario. Vuelve a intentarlo.")
      return data
    },
  })

  const interview = questions.data
  const interviewQuestions = interview?.questions ?? []
  const currentQuestion = interviewQuestions[questionIndex]

  function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanAnswer = answer.trim()
    if (!cleanAnswer || !currentQuestion) {
      setAnswerError("Escribe o dicta tu respuesta antes de continuar.")
      return
    }
    setAnswerError("")
    feedback.mutate({ offer_id: offerId, question: currentQuestion.text, answer: cleanAnswer })
  }

  function continuePractice() {
    if (!interview) return
    if (questionIndex + 1 >= interview.questions.length) {
      setFinished(true)
      return
    }
    setQuestionIndex((index) => index + 1)
    setAnswer("")
    setAnswerError("")
    feedback.reset()
  }

  function restartPractice() {
    setQuestionIndex(0)
    setAnswer("")
    setAnswerError("")
    setFinished(false)
    feedback.reset()
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 text-foreground sm:px-6">
      <Button asChild variant="ghost" className="min-h-12 text-lg">
        <Link to={`/ofertas/${offerId}`}>
          <ArrowLeft aria-hidden />
          Volver a la oferta
        </Link>
      </Button>

      <header className="space-y-2">
        <p className="text-lg font-semibold text-primary">Práctica acompañada</p>
        <h1 className="font-display text-3xl">Entrevista para dependienta de perfumería</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Practica a tu ritmo. Puedes responder hablando o escribir tu respuesta.
        </p>
      </header>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <InterviewerPortrait />
        <div className="min-w-0 flex-1 space-y-3">
          <h2 className="font-display text-2xl">Tu entrevistadora</h2>
          <p className="text-lg leading-relaxed">
            {interview?.intro ?? "Hola, Pilar. Vamos a practicar para esta oferta. Tómate tu tiempo."}
          </p>
          {interview?.intro && <ListenButton text={interview.intro} label="Escuchar saludo" />}
        </div>
      </section>

      <p id="privacy-note" className="rounded-lg border border-border bg-secondary p-4 text-lg leading-relaxed">
        No se analiza tu cara, tu tono ni tus emociones. La transcripción sirve para comentar el contenido de tus respuestas.
      </p>

      {questions.isPending && (
        <p role="status" className="rounded-lg border border-border bg-card p-5 text-lg">
          Preparando las preguntas de la entrevista…
        </p>
      )}

      {questions.isError && (
        <section role="alert" className="space-y-4 rounded-lg border border-border bg-card p-5">
          <p className="text-lg">{questions.error.message}</p>
          <Button type="button" variant="outline" className="min-h-12 text-lg" onClick={() => void questions.refetch()}>
            Volver a intentarlo
          </Button>
        </section>
      )}

      {questions.isSuccess && interviewQuestions.length === 0 && (
        <section role="status" className="space-y-4 rounded-lg border border-border bg-card p-5">
          <p className="text-lg">Todavía no hay preguntas para esta entrevista.</p>
          <Button type="button" variant="outline" className="min-h-12 text-lg" onClick={() => void questions.refetch()}>
            Cargar preguntas
          </Button>
        </section>
      )}

      {questions.isSuccess && interviewQuestions.length > 0 && finished && (
        <section aria-live="polite" className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <Check aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div className="space-y-2">
              <h2 className="font-display text-2xl">Has terminado la práctica</h2>
              <p className="text-lg leading-relaxed">Has practicado las {interviewQuestions.length} preguntas. Puedes repetirlas cuando quieras.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" className="min-h-12 text-lg" onClick={restartPractice}>
              <RotateCcw aria-hidden />
              Practicar otra vez
            </Button>
            <Button asChild type="button" variant="outline" className="min-h-12 text-lg">
              <Link to={`/ofertas/${offerId}`}>Volver a la oferta</Link>
            </Button>
          </div>
        </section>
      )}

      {questions.isSuccess && currentQuestion && interview && !finished && (
        <section className="space-y-5 rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-primary">
              Pregunta {questionIndex + 1} de {interviewQuestions.length}
            </p>
            <ListenButton text={currentQuestion.text} label="Escuchar pregunta" />
          </div>

          <h2 className="font-display text-2xl leading-snug">{currentQuestion.text}</h2>

          {!feedback.data && (
            <form className="space-y-4" onSubmit={submitAnswer}>
              <div className="space-y-2">
                <label htmlFor="practice-answer" className="block text-lg font-semibold">Tu respuesta</label>
                <textarea
                  id="practice-answer"
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value)
                    if (answerError) setAnswerError("")
                  }}
                  aria-describedby="privacy-note"
                  placeholder="Escribe aquí lo que dirías en la entrevista"
                  className="min-h-32 w-full rounded-md border border-border bg-background px-3 py-2 text-lg leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="[&_button]:min-h-12 [&_button]:text-lg">
                  <VoiceButton label="Responder hablando" language="es" onText={setAnswer} />
                </div>
                <Button type="submit" className="min-h-12 text-lg" disabled={feedback.isPending}>
                  {feedback.isPending ? "Preparando comentario…" : "Ver mi comentario"}
                  {!feedback.isPending && <ArrowRight aria-hidden />}
                </Button>
              </div>
              {answerError && <p role="alert" className="text-lg text-destructive">{answerError}</p>}
              {feedback.isError && <p role="alert" className="text-lg text-destructive">{feedback.error.message}</p>}
            </form>
          )}

          {feedback.data && (
            <div aria-live="polite" className="space-y-4 border-t border-border pt-5">
              <h3 className="font-display text-2xl">Tu comentario</h3>
              <div className="space-y-3 rounded-lg bg-secondary p-4">
                <h4 className="text-lg font-semibold">Lo que hiciste bien</h4>
                <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed">
                  {feedback.data.good.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="space-y-3 rounded-lg border border-border p-4">
                <h4 className="text-lg font-semibold">Una idea para mejorar</h4>
                <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed">
                  {feedback.data.improve.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="flex gap-3 rounded-lg border border-border p-4">
                <Lightbulb aria-hidden className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">Consejo</h4>
                  <p className="text-lg leading-relaxed">{feedback.data.tip}</p>
                </div>
              </div>
              <Button type="button" className="min-h-12 text-lg" onClick={continuePractice}>
                {questionIndex + 1 < interviewQuestions.length ? "Siguiente pregunta" : "Terminar práctica"}
                <ArrowRight aria-hidden />
              </Button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
