import React, { useState, useEffect, useRef, useMemo } from 'react';
import quizQuestions from '../data/quizData';
import quizBotResponses from '../data/quizResponses';
import bugs from '../data/bugs';
import messageSentSound from '../assets/sounds/message-sent.wav';
import messageReceivedSound from '../assets/sounds/message-received.wav';
import tempBugImage from '../assets/images/tempbugs.webp';
import '../styles/chatroom.css';
import '../styles/bugcard.css';

export default function QuizChatroom({ username, chats, setChats }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mbtiScores, setMbtiScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [showResult, setShowResult] = useState(false);
  const [matchedBug, setMatchedBug] = useState(null);
  const [typing, setTyping] = useState(false);
  const [loadingFinal, setLoadingFinal] = useState(false);
  const hasStartedRef = useRef(false);
  const chatEndRef = useRef(null);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const safeChats = useMemo(() => Array.isArray(chats) ? chats : [], [chats]);

  const sentSound = useRef(new Audio(messageSentSound));
  const receivedSound = useRef(new Audio(messageReceivedSound));

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, typing, loadingFinal]);

  useEffect(() => {
    if (hasStartedRef.current || safeChats.length > 0) return;

    const introSequence = async () => {
      setTyping(true);
      await delay(1500);
      setTyping(false);
      const firstMsg = { sender: 'mysterious_bug', text: `Oh hey ${username || 'buglet'}... mind if I ask you a few things?` };
      setChats([firstMsg]);
      receivedSound.current.play();

      setTyping(true);
      await delay(1500);
      setTyping(false);
      const secondMsg = { sender: 'mysterious_bug', text: quizQuestions[0].question };
      setChats([firstMsg, secondMsg]);
      receivedSound.current.play();

      hasStartedRef.current = true;
    };

    introSequence();
  }, [safeChats, setChats, username]);

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const calculateMBTI = (scores) => {
    return (
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P')
    );
  };

  const handleAnswer = async (answer) => {
    sentSound.current.currentTime = 0;
    sentSound.current.play();

    const updatedChats = [...chats, { sender: 'You', text: answer.text }];
    const updatedScores = {
      ...mbtiScores,
      [answer.type]: mbtiScores[answer.type] + 1
    };

    setChats(updatedChats);
    setMbtiScores(updatedScores);

    setTyping(true);
    await delay(1000);
    setTyping(false);

    const randomResponse = quizBotResponses[currentQuestionIndex]
      ? quizBotResponses[currentQuestionIndex][Math.floor(Math.random() * quizBotResponses[currentQuestionIndex].length)]
      : "Hmmm... interesting choice.";

    const afterResponse = [...updatedChats, { sender: 'mysterious_bug', text: randomResponse }];
    setChats(afterResponse);
    receivedSound.current.currentTime = 0;
    receivedSound.current.play();

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      setTyping(true);
      await delay(2000);
      setTyping(false);

      setChats([
        ...afterResponse,
        { sender: 'mysterious_bug', text: quizQuestions[nextIndex].question }
      ]);
      receivedSound.current.play();
    } else {
      setLoadingFinal(true);
      await delay(3000); // ⏳ longer delay
      setLoadingFinal(false);

      const mbti = calculateMBTI(updatedScores);
      const result = bugs.find(bug => bug.mbti === mbti);
      setMatchedBug(result);
      setShowResult(true);

      setChats([
        ...afterResponse,
        { sender: 'mysterious_bug', text: `🌟 Personality Quiz Complete! 🌟` }
      ]);
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
  };

  return (
    <div className="chat-messages">
      {safeChats.map((msg, index) => (
        <div
          key={index}
          className={`message-wrapper ${msg.sender === 'You' ? 'right-wrapper' : 'left-wrapper'} slide-up`}
        >
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
          <div className="message left">Calculating your bug type...</div>
        </div>
      )}

      {!showResult && !typing && !loadingFinal && (
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
        <div
          className="quiz-progress-fill"
          style={{ width: `${((currentQuestionIndex + (showResult ? 1 : 0)) / quizQuestions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
