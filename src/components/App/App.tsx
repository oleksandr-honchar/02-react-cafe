import { useState } from 'react';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import type { Votes } from '../../types/votes';
import Notification from '../Notification/Notification';


export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  const handleVote = (vote: 'good' | 'neutral' | 'bad') => {
    setVotes(prev => ({
      ...prev,
      [vote]: prev[vote] + 1,
    }));
  };

  const handleReset = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

 return (
  <div className={css.app}>
    <CafeInfo />
    <VoteOptions
      onVote={handleVote}
      onReset={handleReset}
      canReset={totalVotes > 0}
    />

    {totalVotes > 0 ? (
      <VoteStats
        votes={votes}
        totalVotes={totalVotes}
        positiveRate={positiveRate}
      />
    ) : (
      <Notification />
    )}
  </div>
);
}
