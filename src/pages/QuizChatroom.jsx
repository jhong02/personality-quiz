import React, { useState, useEffect, useRef, useCallback } from 'react';
import introData from '../data/introData';
import quizQuestions from '../data/quizData';
import outroData from '../data/outroData';
import quizBotResponses from '../data/quizResponses';
import bugs from '../data/bugs';
import bugImages from '../data/bugImageMap';
import bugDownloadMap from '../data/bugDownloadMap';
import messageSentSound from '../assets/sounds/message-sent.wav';
import messageReceivedSound from '../assets/sounds/message-received.wav';
import quizResultSound from '../assets/sounds/quiz-result.wav';
import tempBugImage from '../assets/images/tempbugs.webp';
import '../styles/chatroom.css';
import '../styles/bugcard.css';

export default function QuizChatroom({ username }) {
  const [chats, setChats] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mbtiScores, setMbtiScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [showResult, setShowResult] = useState(false);
  const [matchedBug, setMatchedBug] = useState(null);
  const [typing, setTyping] = useState(false);
  const [loadingFinal, setLoadingFinal] = useState(false);
  const [dotCount, setDotCount] = useState(0);

  const sentSound = useRef(new Audio(messageSentSound));
  const receivedSound = useRef(new Audio(messageReceivedSound));
  const resultSound = useRef(new Audio(quizResultSound));
  const chatEndRef = useRef(null);
  const hasStartedRef = useRef(false);

  const fullChatData = [...introData, ...quizQuestions, ...outroData];
  const currentQuestion = currentQuestionIndex < fullChatData.length ? fullChatData[currentQuestionIndex] : null;
  const quizProgress = Math.max(0, Math.min((currentQuestionIndex - introData.length) / quizQuestions.length, 1)) * 100;
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const scrollToBottom = useCallback(() => {
    if (!showResult) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResult]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, typing, loadingFinal, scrollToBottom]);

  const showTyping = useCallback(async () => {
    setTyping(true);
    await delay(1300);
    setTyping(false);
  }, []);

  const showQuestionInParts = useCallback(async (questionText) => {
    const parts = questionText.split('\n\n');
    for (const part of parts) {
      setChats(prev => [...prev, { sender: 'mysterious_bug', text: part.trim() }]);
      receivedSound.current.play();
      await showTyping();
    }
  }, [showTyping]);

  const startIntro = useCallback(async () => {
    await showTyping();
    await showQuestionInParts(introData[0].question);
    hasStartedRef.current = true;
    setCurrentQuestionIndex(0);
  }, [showQuestionInParts, showTyping]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      startIntro();
    }
  }, [startIntro]);

  useEffect(() => {
    if (!loadingFinal) return;
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, [loadingFinal]);

  const calculateMBTI = (scores) => (
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  );

  const handleAnswer = async (answer) => {
    sentSound.current.play();
    const updatedChats = [...chats, { sender: 'You', text: answer.text }];
    let updatedScores = { ...mbtiScores };

    if (answer.type && answer.type !== "none" && currentQuestionIndex >= introData.length && currentQuestionIndex < introData.length + quizQuestions.length) {
      updatedScores[answer.type] += 1;
    }

    setChats(updatedChats);
    setMbtiScores(updatedScores);
    await showTyping();

    if (currentQuestionIndex >= introData.length && currentQuestionIndex < introData.length + quizQuestions.length) {
      const quizIndex = currentQuestionIndex - introData.length;
      const randomResponse = quizBotResponses[quizIndex]
        ? quizBotResponses[quizIndex][Math.floor(Math.random() * quizBotResponses[quizIndex].length)]
        : "Hmmm... interesting choice.";
      setChats(prev => [...prev, { sender: 'mysterious_bug', text: randomResponse }]);
      receivedSound.current.play();
      await showTyping();
    }

    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < fullChatData.length && (!fullChatData[nextIndex].answers || fullChatData[nextIndex].answers.length === 0)) {
      nextIndex++;
    }

    if (nextIndex < fullChatData.length) {
      await showQuestionInParts(fullChatData[nextIndex].question);
      setCurrentQuestionIndex(nextIndex);
    } else {
      setLoadingFinal(true);
      await delay(3000);
      setLoadingFinal(false);

      const mbti = calculateMBTI(updatedScores);
      const result = bugs.find(bug => bug.mbti === mbti);
      setMatchedBug(result);
      resultSound.current.play();
      setShowResult(true);
      setChats(prev => [...prev, { sender: 'mysterious_bug', text: `🌟 Personality Quiz Complete! 🌟` }]);
      receivedSound.current.play();

      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleRestart = () => {
    setChats([]);
    setCurrentQuestionIndex(0);
    setMbtiScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setShowResult(false);
    setMatchedBug(null);
    setLoadingFinal(false);
    hasStartedRef.current = false;
    startIntro();
  };

  const handleDownload = () => {
    if (!matchedBug || !bugDownloadMap[matchedBug.name]) return;

    const link = document.createElement('a');
    link.href = bugDownloadMap[matchedBug.name];
    link.download = `${matchedBug.name}-bug-profile.png`;
    link.click();
  };

  return (
    <>
      <div className="chat-messages">
        {chats.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.sender === 'You' ? 'right-wrapper' : 'left-wrapper'} slide-up`}>
            <div className={`message ${msg.sender === 'You' ? 'right' : 'left'}`}>{msg.text}</div>
          </div>
        ))}

        {typing && (
          <div className="message-wrapper left-wrapper slide-up">
            <div className="message left typing-indicator">
              mysterious_bug is typing<span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          </div>
        )}

        {loadingFinal && (
          <div className="message-wrapper left-wrapper slide-up">
            <div className="message left">
              Calculating your bug type{'.'.repeat(dotCount)}
            </div>
          </div>
        )}

        {!showResult && !typing && !loadingFinal && currentQuestion?.answers?.length > 0 && (
          <div className="answer-buttons">
            {currentQuestion.answers.map((answer, i) => (
              <button key={i} className="answer-btn" onClick={() => handleAnswer(answer)}>
                {answer.text}
              </button>
            ))}
          </div>
        )}

        {showResult && matchedBug && (
          <div className="result-card-wrapper">
            <div className="bug-modal-card slide-up">
              <h2 className="bug-name-title">{matchedBug.name} – <em>{matchedBug.title}</em></h2>
              <img className="bug-img" src={bugImages[matchedBug.image] || tempBugImage} alt={matchedBug.name} />
              <p className="desc"><strong>Description:</strong> {matchedBug.description}</p>

              <div className="traits-flex">
                <div className="trait-box strengths-box">
                  <p><strong>Strengths:</strong></p>
                  <ul>{matchedBug.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
                <div className="trait-box weaknesses-box">
                  <p><strong>Weaknesses:</strong></p>
                  <ul>{matchedBug.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
              </div>

              <div className="vibe-box">
                <p><strong>Vibes:</strong></p>
                <div className="vibe-lines">
                  {matchedBug.taglines.map((line, i) => (
                    <div key={i} className="vibe-line"><em>{line}</em></div>
                  ))}
                </div>
              </div>

              <div className="friend-grid">
                <p><strong>Besties:</strong></p>
                <div className="friend-icons">
                  {matchedBug.besties.map(name => {
                    const bug = bugs.find(b => b.name === name);
                    return (
                      <div className="friend-item" key={name}>
                        <img src={bug?.image ? bugImages[bug.image] || tempBugImage : tempBugImage} alt={name} className="friend-icon" />
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="friend-grid">
                <p><strong>Enemies:</strong></p>
                <div className="friend-icons">
                  {matchedBug.enemies.map(name => {
                    const bug = bugs.find(b => b.name === name);
                    return (
                      <div className="friend-item" key={name}>
                        <img src={bug?.image ? bugImages[bug.image] || tempBugImage : tempBugImage} alt={name} className="friend-icon" />
                        <span>{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="result-buttons">
                <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
                <button className="share-btn" onClick={handleDownload}>Share Your Results!</button>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${quizProgress}%` }} />
        </div>
      </div>
    </>
  );
}
