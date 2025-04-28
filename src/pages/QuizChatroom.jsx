import React, { useState, useEffect, useRef } from 'react';
import introData from '../data/introData';
import quizQuestions from '../data/quizData';
import outroData from '../data/outroData';
import quizBotResponses from '../data/quizResponses';
import bugs from '../data/bugs';
import messageSentSound from '../assets/sounds/message-sent.wav';
import messageReceivedSound from '../assets/sounds/message-received.wav';
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
  const chatEndRef = useRef(null);
  const hasStartedRef = useRef(false);

  const fullChatData = [...introData, ...quizQuestions, ...outroData];
  const currentQuestion = currentQuestionIndex < fullChatData.length ? fullChatData[currentQuestionIndex] : null;

  const quizProgress = Math.max(0, Math.min((currentQuestionIndex - introData.length) / quizQuestions.length, 1)) * 100;

  const delay = (ms) => new Promise(res => setTimeout(res, ms));
  const showTyping = async (ms) => {
    setTyping(true);
    await delay(ms);
    setTyping(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const showQuestionInParts = async (questionText) => {
    const parts = questionText.split('\n\n');
    for (const part of parts) {
      setChats(prev => [...prev, { sender: 'mysterious_bug', text: part.trim() }]);
      receivedSound.current.play();
      await showTyping(1000);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, typing, loadingFinal]);

  const startIntro = async () => {
    await showTyping(1500);
    await showQuestionInParts(introData[0].question);
    hasStartedRef.current = true;
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    if (hasStartedRef.current) return;
    startIntro();
  }, [username]);

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
    sentSound.current.currentTime = 0;
    sentSound.current.play();

    const updatedChats = [...chats, { sender: 'You', text: answer.text }];
    let updatedScores = { ...mbtiScores };

    if (answer.type && answer.type !== "none" && currentQuestionIndex >= introData.length && currentQuestionIndex < introData.length + quizQuestions.length) {
      updatedScores[answer.type] += 1;
    }

    setChats(updatedChats);
    setMbtiScores(updatedScores);

    await showTyping(1000);

    if (currentQuestionIndex >= introData.length && currentQuestionIndex < introData.length + quizQuestions.length) {
      const quizIndex = currentQuestionIndex - introData.length;
      const randomResponse = quizBotResponses[quizIndex]
        ? quizBotResponses[quizIndex][Math.floor(Math.random() * quizBotResponses[quizIndex].length)]
        : "Hmmm... interesting choice.";
      setChats(prev => [...prev, { sender: 'mysterious_bug', text: randomResponse }]);
      receivedSound.current.currentTime = 0;
      receivedSound.current.play();
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
      setShowResult(true);

      setChats(prev => [...prev, { sender: 'mysterious_bug', text: `🌟 Personality Quiz Complete! 🌟` }]);
      receivedSound.current.play();
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

  if (!currentQuestion && !showResult) return null;

  return (
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
        <div className="bug-card slide-up">
          <img className="bug-img" src={tempBugImage} alt={matchedBug.name} />
          <h2>{matchedBug.name} — <em>{matchedBug.title}</em></h2>
          <p><strong>MBTI:</strong> {matchedBug.mbti}</p>
          <p className="desc"><strong>Description:</strong> {matchedBug.description}</p>
          <p><strong>Best Bug Friends:</strong> {matchedBug.compatible.join(', ')}</p>
          <p><strong>Bug Clashes:</strong> {matchedBug.incompatible.join(', ')}</p>
          <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      )}

      <div ref={chatEndRef} />

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${quizProgress}%` }} />
      </div>
    </div>
  );
}
