import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  ChevronRight,
  RefreshCw,
  Star
} from 'lucide-react';

// --- Emoji Fallback Map ---
const EMOJI_MAP = {
  'apple': '🍎',
  'banana': '🍌',
  'cat': '🐱',
  'dog': '🐶',
  'ball': '⚽',
  'water': '💧',
  'home': '🏠',
  'sun': '☀️',
  'khana': '🍱',
  'palam': '🍎',
  'thanni': '🚰',
  'namaste': '🙏'
};

const pcmToWav = (pcmData, sampleRate) => {
  const buffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 32 + pcmData.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, pcmData.length * 2, true);
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(44 + i * 2, pcmData[i], true);
  }
  return new Blob([buffer], { type: 'audio/wav' });
};

const App = () => {
  // --- Mock Assessment Data (Would come from your Firestore) ---
  const [items] = useState([
    { id: 1, target: 'Apple', regionalTarget: 'सेब', language: 'hi-IN', image: '' },
    { id: 2, target: 'Water', regionalTarget: 'தண்ணீர்', language: 'ta-IN', image: '' },
    { id: 3, target: 'Banana', regionalTarget: 'केला', language: 'hi-IN', image: '' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playingTTS, setPlayingTTS] = useState(false);
  
  const currentItem = items[currentIndex];
  const recognitionRef = useRef(null);

  // --- Initialize Speech Recognition ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        runAIAnalysis(text);
      };
      
      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onerror = (err) => {
        console.error("Speech Error:", err);
        setIsRecording(false);
      };
    }
  }, []);

  // --- Start/Stop Recording ---
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setAnalysis(null);
      setIsRecording(true);
      if (recognitionRef.current) {
        recognitionRef.current.lang = currentItem.language;
        recognitionRef.current.start();
      }
    }
  };

  // --- AI Analysis (Mistake Detection) ---
  const runAIAnalysis = async (userSpeech) => {
    setIsLoading(true);
    const apiKey = ""; // Runtime provides this
    const systemPrompt = `You are an AI Speech-Language Pathology expert. 
    Analyze the patient's speech against the target word: "${currentItem.regionalTarget}" in ${currentItem.language}.
    Patient said: "${userSpeech}".
    1. Identify errors (substitution, omission, distortion).
    2. Score intelligibility (0-100).
    3. Provide simple, encouraging feedback for a child.
    Return JSON: { "score": number, "errors": [], "feedback": "string" }`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Target: ${currentItem.regionalTarget}, Actual: ${userSpeech}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await response.json();
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      setAnalysis(result);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Right Output (Correct Pronunciation TTS) ---
  const playCorrectOutput = async () => {
    setPlayingTTS(true);
    const apiKey = "";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Say this clearly: ${currentItem.regionalTarget}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } }
          },
          model: "gemini-2.5-flash-preview-tts"
        })
      });
      const result = await response.json();
      const pcmBase64 = result.candidates[0].content.parts[0].inlineData.data;
      const sampleRate = parseInt(result.candidates[0].content.parts[0].inlineData.mimeType.split('rate=')[1]);
      const pcmData = Int16Array.from(atob(pcmBase64), c => c.charCodeAt(0) + (c.charCodeAt(1) << 8));
      const wavBlob = pcmToWav(pcmData, sampleRate);
      const audio = new Audio(URL.createObjectURL(wavBlob));
      audio.onended = () => setPlayingTTS(false);
      audio.play();
    } catch (err) {
      console.error("TTS Error:", err);
      setPlayingTTS(false);
    }
  };

  const getEmoji = (target) => {
    const key = target.toLowerCase();
    return EMOJI_MAP[key] || '⭐';
  };

  return (
    <div className="min-h-screen bg-[#F0F4FF] p-6 flex items-center justify-center font-sans">
      <div className="max-w-xl w-full">
        {/* Progress Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <div key={i} className={`h-3 w-12 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-indigo-500' : 'bg-white border border-indigo-100'}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-indigo-400">QUEST {currentIndex + 1}/3</span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-indigo-100 overflow-hidden border-8 border-white p-8">
          <div className="text-center mb-8">
            <div className="text-[120px] mb-4 animate-bounce duration-[2000ms]">
              {currentItem.image ? (
                <img src={currentItem.image} alt="" className="w-32 h-32 mx-auto object-contain" />
              ) : (
                getEmoji(currentItem.target)
              )}
            </div>
            <h1 className="text-5xl font-black text-slate-800 mb-2">{currentItem.regionalTarget}</h1>
            <p className="text-indigo-400 font-bold tracking-widest uppercase text-sm">Target Word</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              {/* Record Button */}
              <button 
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                  ? 'bg-red-500 scale-110 shadow-xl shadow-red-200 ring-8 ring-red-50' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100'
                }`}
              >
                {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
              </button>

              {/* Correct Pronunciation (Right Output) */}
              <button 
                onClick={playCorrectOutput}
                disabled={playingTTS}
                className="w-24 h-24 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center hover:border-indigo-400 transition-all group"
              >
                <Volume2 className={`w-10 h-10 text-indigo-400 group-hover:text-indigo-600 ${playingTTS ? 'animate-pulse' : ''}`} />
              </button>
            </div>

            <p className="font-bold text-slate-400">
              {isRecording ? 'Listening...' : transcript || 'Tap the Mic to speak!'}
            </p>

            {/* Analysis Result */}
            {isLoading && (
              <div className="flex items-center gap-2 text-indigo-500 font-bold animate-pulse">
                <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing mistakes...
              </div>
            )}

            {analysis && (
              <div className={`w-full p-6 rounded-3xl animate-in zoom-in-95 duration-300 border-2 ${analysis.score > 70 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    {analysis.score > 70 ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-orange-500" />}
                    <span className="font-black text-xl text-slate-800">{analysis.score}% Match</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(s => <Star key={s} className={`w-5 h-5 ${s <= (analysis.score / 33) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />)}
                  </div>
                </div>
                
                <p className="text-slate-700 font-medium mb-4 leading-relaxed italic">"{analysis.feedback}"</p>

                {analysis.errors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {analysis.errors.map((e, i) => (
                      <span key={i} className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-red-500 border border-red-50 shadow-sm">{e}</span>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => {
                    if (currentIndex < items.length - 1) {
                      setCurrentIndex(currentIndex + 1);
                      setAnalysis(null);
                      setTranscript('');
                    } else {
                      alert("Quest Complete! Great Job!");
                      setCurrentIndex(0);
                    }
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition"
                >
                  Next Challenge <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
