import React, { useState } from 'react';
import './Game.css'; // Nous allons créer ce fichier

const Game = () => {
  // États pour gérer les choix et le résultat
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  // Options du jeu
  const choices = ['Pierre', 'Papier', 'Ciseaux'];

  // Fonction pour générer le choix de l'ordinateur
  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  // Fonction pour déterminer le gagnant
  const determineWinner = (user, computer) => {
    if (user === computer) return 'Égalité !';

    if (
      (user === 'Pierre' && computer === 'Ciseaux') ||
      (user === 'Papier' && computer === 'Pierre') ||
      (user === 'Ciseaux' && computer === 'Papier')
    ) {
      return 'Vous avez gagné ! 🎉';
    } else {
      return 'Vous avez perdu ! 😢';
    }
  };

  // Fonction pour mettre à jour le score
  const updateScore = (result) => {
    if (result === 'Vous avez gagné ! 🎉') {
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else if (result === 'Vous avez perdu ! 😢') {
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    } else {
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  // Gestionnaire de clic sur les boutons
  const handleChoice = (choice) => {
    const computer = generateComputerChoice();
    const gameResult = determineWinner(choice, computer);
    
    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);
    updateScore(gameResult);
  };

  // Fonction pour réinitialiser le jeu
  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  // Fonction pour obtenir l'emoji correspondant au choix
  const getChoiceEmoji = (choice) => {
    switch(choice) {
      case 'Pierre': return '✊';
      case 'Papier': return '✋';
      case 'Ciseaux': return '✌️';
      default: return '';
    }
  };

  return (
    <div className="game-container">
      <h1>Pierre - Papier - Ciseaux</h1>
      
      {/* Affichage du score */}
      <div className="score-board">
        <div className="score-item">
          <span className="score-label">Victoires</span>
          <span className="score-value wins">{score.wins}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Défaites</span>
          <span className="score-value losses">{score.losses}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Égalités</span>
          <span className="score-value draws">{score.draws}</span>
        </div>
      </div>

      {/* Boutons de choix */}
      <div className="choices-buttons">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`choice-btn ${choice.toLowerCase()}`}
          >
            <span className="emoji">{getChoiceEmoji(choice)}</span>
            <span className="choice-text">{choice}</span>
          </button>
        ))}
      </div>

      {/* Affichage des choix et résultat */}
      {(userChoice || computerChoice) && (
        <div className="game-result">
          <div className="choices-display">
            <div className="choice-display">
              <span className="choice-label">Vous</span>
              <div className="choice-icon">
                {userChoice && (
                  <>
                    <span className="emoji-large">{getChoiceEmoji(userChoice)}</span>
                    <span className="choice-name">{userChoice}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="vs">VS</div>
            
            <div className="choice-display">
              <span className="choice-label">Ordinateur</span>
              <div className="choice-icon">
                {computerChoice && (
                  <>
                    <span className="emoji-large">{getChoiceEmoji(computerChoice)}</span>
                    <span className="choice-name">{computerChoice}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {result && (
            <div className={`result-message ${result.includes('gagné') ? 'win' : result.includes('perdu') ? 'lose' : 'draw'}`}>
              {result}
            </div>
          )}
        </div>
      )}

      {/* Bouton de réinitialisation */}
      <button onClick={resetGame} className="reset-btn">
        Nouvelle partie
      </button>
    </div>
  );
};

export default Game;