/** Browser TTS, explicitly in Spanish. A user starts the interview to unlock audio. */
let utterance: SpeechSynthesisUtterance | undefined
export function stopSpeaking() {
  window.speechSynthesis?.cancel()
  utterance = undefined
}
export function say(text: string, onError: (message: string) => void) {
  if (!window.speechSynthesis) {
    onError("Este navegador no puede leer en voz alta. Puedes leer las preguntas en pantalla.")
    return
  }
  stopSpeaking()
  utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "es-ES"
  const voice = window.speechSynthesis.getVoices().find((item) => item.lang.startsWith("es"))
  if (voice) utterance.voice = voice
  utterance.rate = 0.95
  utterance.onerror = (event) => {
    if (event.error !== "interrupted" && event.error !== "canceled") {
      onError("No se pudo reproducir la voz. Comprueba el volumen o vuelve a pulsar Escuchar.")
    }
  }
  window.speechSynthesis.speak(utterance)
}
