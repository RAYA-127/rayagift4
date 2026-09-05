import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Cat,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Music2,
  RotateCcw,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const memories = [
  {
    image: 'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Where it all began',
    note: 'The world felt a little softer that day.',
  },
  {
    image: 'https://images.pexels.com/photos/5804012/pexels-photo-5804012.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Every little moment',
    note: 'You make the ordinary feel extraordinary.',
  },
  {
    image: 'https://images.pexels.com/photos/4241751/pexels-photo-4241751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Always us',
    note: 'And somehow, my favorite place is still beside you.',
  },
  {
    image: 'https://images.pexels.com/photos/1024980/pexels-photo-1024980.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'A little forever',
    note: 'Some promises are worth making again and again.',
  },
];

const questions = [
  {
    eyebrow: 'Be honest with me...',
    subcopy: 'This is important to me',
    question: 'Do you trust me?',
    yes: 'Yes, I do',
    no: 'No',
    icon: 'sad',
  },
  {
    eyebrow: 'One more thing...',
    subcopy: 'I need to know this',
    question: 'Do you also love me?',
    yes: 'Yes, I love you!',
    no: 'Not yet',
    icon: 'bow',
  },
  {
    eyebrow: 'Last question, I promise!',
    subcopy: 'This one is the most important',
    question: 'Will you be mine forever?',
    yes: 'Yes, forever!',
    no: 'Let me think...',
    icon: 'heart',
  },
] as const;

type Step = 1 | 2 | 3 | 4 | 5;

function Sticker({ variant = 'cat' }: { variant?: 'cat' | 'sad' | 'bow' | 'heart' }) {
  return (
    <div className={`sticker sticker-${variant}`} aria-hidden="true">
      <div className="sticker-glow" />
      <div className="sticker-face">
        <Cat size={variant === 'heart' ? 68 : 76} strokeWidth={1.5} />
        <span className="sticker-eye left" />
        <span className="sticker-eye right" />
        <span className="sticker-mouth" />
        {variant === 'bow' && <span className="bow">✦</span>}
        {variant === 'heart' && <Heart className="sticker-heart" fill="currentColor" size={30} />}
        {variant === 'sad' && <span className="tear" />}
      </div>
    </div>
  );
}

function FloatingLights() {
  const lights = useMemo(() => Array.from({ length: 22 }, (_, index) => index), []);
  return (
    <div className="floating-lights" aria-hidden="true">
      {lights.map((light) => (
        <span
          key={light}
          style={{
            '--x': `${(light * 43) % 100}%`,
            '--y': `${(light * 67) % 100}%`,
            '--delay': `${(light % 7) * -1.1}s`,
            '--size': `${3 + (light % 4)}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const bits = useMemo(() => Array.from({ length: 90 }, (_, index) => index), []);
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((bit) => (
        <i key={bit} style={{ '--i': bit } as CSSProperties} />
      ))}
    </div>
  );
}

function App() {
  const [step, setStep] = useState<Step>(1);
  const [question, setQuestion] = useState(0);
  const [music, setMusic] = useState(false);
  const [modal, setModal] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [memory, setMemory] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const currentQuestion = questions[question];

  useEffect(() => {
    setNoPosition({ x: 0, y: 0 });
  }, [question]);

  const goBack = () => {
    if (step === 2 && question > 0) {
      setQuestion((value) => value - 1);
    } else if (step > 1) {
      setStep((value) => (value - 1) as Step);
    }
  };

  const answerYes = () => {
    if (question < questions.length - 1) {
      setQuestion((value) => value + 1);
    } else {
      setStep(3);
    }
  };

  const moveNo = () => {
    if (question < 2) {
      setNoPosition({
        x: Math.round((Math.random() - 0.5) * 180),
        y: Math.round((Math.random() - 0.5) * 120),
      });
    } else {
      setModal(true);
    }
  };

  const restart = () => {
    setStep(1);
    setQuestion(0);
    setMemory(1);
    setModal(false);
    setEnvelopeOpen(false);
  };

  return (
    <main className="app-shell">
      <FloatingLights />
      {step === 5 && <Confetti />}
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <button className="music-toggle" onClick={() => setMusic((value) => !value)} aria-label={music ? 'Mute music' : 'Play music'}>
          {music ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{music ? 'on' : 'off'}</span>
        </button>
        {step > 1 && step < 5 && (
          <button className="back-button" onClick={goBack}>
            <ArrowLeft size={13} /> Back
          </button>
        )}
      </header>

      <div className="page-wrap">
        {step === 1 && (
          <section className="screen landing-screen fade-in">
            <Sticker />
            <p className="kicker">a tiny secret for you</p>
            <h1>I have something<br />special to tell you...</h1>
            <p className="subtitle">Something that will change everything <Heart size={12} fill="currentColor" /></p>
            <button className="primary-button" onClick={() => setStep(2)}>
              <Heart size={14} fill="currentColor" /> Tap to Begin
            </button>
            <span className="tiny-note">take a deep breath</span>
          </section>
        )}

        {step === 2 && (
          <section className="screen question-screen fade-in" key={question}>
            <Sticker variant={currentQuestion.icon} />
            <p className="kicker">{currentQuestion.subcopy}</p>
            <h1>{currentQuestion.eyebrow}</h1>
            <div className="question-rule" />
            <p className="question-copy">{currentQuestion.question}</p>
            <div className="answer-row">
              <button className="answer-button yes-button" onClick={answerYes}>
                {currentQuestion.yes} <Heart size={14} fill="currentColor" />
              </button>
              <button
                className={`answer-button no-button ${question === 2 ? 'thinking-button' : ''}`}
                onMouseEnter={moveNo}
                onClick={moveNo}
                style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
              >
                {currentQuestion.no} {question === 2 ? '⌁' : '×'}
              </button>
            </div>
            <div className="progress-dots" aria-label={`Question ${question + 1} of 3`}>
              {questions.map((_, index) => <span className={index === question ? 'active' : ''} key={index} />)}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="screen gallery-screen fade-in">
            <div className="section-heading">
              <p className="kicker">our little memories</p>
              <h1>From the first day I met you,<br /><em>life became brighter...</em></h1>
              <p className="subtitle">You've made every moment so special <Heart size={12} fill="currentColor" /></p>
            </div>
            <div className="carousel" aria-label="Memory gallery">
              <button className="circle-arrow left-arrow" onClick={() => setMemory((memory - 1 + memories.length) % memories.length)} aria-label="Previous memory"><ChevronLeft size={18} /></button>
              {memories.map((item, index) => {
                const offset = (index - memory + memories.length) % memories.length;
                const normalized = offset > 2 ? offset - memories.length : offset;
                return (
                  <article className={`memory-card position-${normalized}`} key={item.image}>
                    <img src={item.image} alt={item.title} />
                    <div className="memory-overlay"><span>{item.title}</span><small>{item.note}</small></div>
                  </article>
                );
              })}
              <button className="circle-arrow right-arrow" onClick={() => setMemory((memory + 1) % memories.length)} aria-label="Next memory"><ChevronRight size={18} /></button>
            </div>
            <div className="carousel-footer">
              <div className="carousel-dots">{memories.map((_, index) => <button key={index} className={index === memory ? 'active' : ''} onClick={() => setMemory(index)} aria-label={`Memory ${index + 1}`} />)}</div>
              <p>Now, for the most important part...</p>
              <button className="primary-button" onClick={() => setStep(4)}>See My Message <ArrowRight size={14} /></button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="screen letter-screen fade-in">
            {!envelopeOpen ? (
              <button className="envelope" onClick={() => setEnvelopeOpen(true)}>
                <div className="envelope-top" />
                <div className="envelope-cat"><Cat size={35} /><Heart size={13} fill="currentColor" /></div>
                <p className="kicker">hand-delivered with love</p>
                <h1>This is just for you...</h1>
                <p>Tap to see what's inside <Mail size={13} /></p>
                <span className="envelope-hint">open me</span>
              </button>
            ) : (
              <div className="letter-card">
                <button className="letter-close" onClick={() => setEnvelopeOpen(false)} aria-label="Close letter"><X size={15} /></button>
                <div className="letter-header"><div className="mini-cat"><Cat size={29} /></div><div><p className="kicker">a letter for you</p><h2>My Dearest Love,</h2></div></div>
                <div className="heart-divider"><span /> <Heart size={14} fill="currentColor" /> <span /></div>
                <div className="letter-body">
                  <p>There are so many things I want to say, but somehow the most important ones always feel too big for words.</p>
                  <p>You make the quiet days warmer, the loud days lighter, and every ordinary moment feel like something I should keep forever. With you, I have found a kind of happiness I never knew I was looking for.</p>
                  <p>Thank you for being exactly who you are. Thank you for every laugh, every little kindness, and for letting me be part of your world. I promise to show up, to listen, to choose you in all the small ways, every day.</p>
                  <p>So here is my whole heart, wrapped up in one simple question: will you stay with me for all the chapters still waiting to be written?</p>
                  <div className="letter-signature">Forever yours,<br /><em>With all my heart and soul</em> <Heart size={13} fill="currentColor" /></div>
                </div>
                <button className="primary-button letter-action" onClick={() => setStep(5)}>Yes, I'm Yours Forever! <Heart size={14} fill="currentColor" /></button>
              </div>
            )}
          </section>
        )}

        {step === 5 && (
          <section className="screen finale-screen fade-in">
            <div className="celebration-icons"><Sparkles size={19} /><Heart size={19} fill="currentColor" /><Sun size={17} /></div>
            <p className="kicker">a promise, sealed with a kiss</p>
            <h1>You made me the<br /><em>happiest!</em></h1>
            <p className="final-subtitle">Thank you for saying yes <Heart size={13} fill="currentColor" /></p>
            <p className="promise">I promise to love you forever and always...</p>
            <div className="final-heart"><Heart size={98} fill="currentColor" /></div>
            <button className="replay-button" onClick={restart}><RotateCcw size={13} /> Replay All <Heart size={12} fill="currentColor" /></button>
          </section>
        )}
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(false)} aria-label="Close"><X size={16} /></button>
            <Sticker variant="heart" />
            <p className="kicker">a small reminder</p>
            <h2>Just Say <em>YES!</em></h2>
            <p>I know thinking is important, but my heart has already made up its mind. It chose you a long time ago.</p>
            <button className="primary-button" onClick={() => { setModal(false); setStep(3); }}>Yes, I'll Say YES! <Sparkles size={14} /></button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
