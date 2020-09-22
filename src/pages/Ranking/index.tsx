import React, { useState, useEffect, useCallback } from 'react';
import { AiFillCaretLeft, AiFillCaretDown } from 'react-icons/ai';

import ranking from '../../data/matchboxbrasil.json';

import Logo from '../../assets/logo.png';

import './styles.scss';

interface Ranked {
  __id: string;
  name: string;
  description: string;
  picture: string;
  like: number;
  deslike: number;
  rank: number;
}

const Ranking: React.FC = () => {
  const [placings, setPlacings] = useState<Ranked[]>([]);

  const calculatePlacing = useCallback(() => {
    const newPlacing: Ranked[] = [];

    ranking.data.forEach(data => {
      const { __id, description, name, picture, positive, negative } = data;

      if (positive !== null) {
        const likes = Math.round((positive / (positive + negative)) * 100);
        const deslikes = Math.round((negative / (positive + negative)) * 100);

        const id = ranking.data.findIndex(ranked => ranked.__id === data.__id);

        newPlacing[id] = {
          __id,
          description,
          name,
          picture,
          like: likes,
          deslike: deslikes,
          rank: 0,
        };
      } else {
        const likes = Math.round((0 / (0 + negative)) * 100);
        const deslikes = Math.round((negative / (0 + negative)) * 100);

        const id = ranking.data.findIndex(ranked => ranked.__id === data.__id);

        newPlacing[id] = {
          __id,
          description,
          name,
          picture,
          like: likes,
          deslike: deslikes,
          rank: 0,
        };
      }
    });

    newPlacing.sort((a, b) => {
      return b.like - a.like;
    });

    for (let i = 0; i < newPlacing.length; i++) {
      newPlacing[i].rank = i + 1;
    }

    setPlacings(newPlacing);
  }, []);

  useEffect(() => {
    calculatePlacing();
  }, [calculatePlacing]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__content">
          <img src={Logo} alt="logo" className="dashboard__img" />
          <div className="dashboard__header">
            <h1 className="dashboard__title">rancking</h1>
          </div>
          <div className="dashboard__ranking">
            {placings.map(rankeds => (
              <div className="dashboard__ranked" key={rankeds.__id}>
                <div className="dashboard__avatar">
                  <img
                    src={rankeds.picture}
                    className="dashboard__avatar-picture"
                    alt="Avatar"
                  />
                  <span className="dashboard__avatar-placing">
                    {rankeds.rank}
                  </span>
                </div>

                <input
                  className="dashboard__check"
                  type="checkbox"
                  id={rankeds.__id}
                />

                <label htmlFor={rankeds.__id}>
                  <div className="dashboard__ranked-owner">
                    <strong className="dashboard__ranked-name">
                      {rankeds.name}
                    </strong>
                    <p className="dashboard__ranked-description">
                      {rankeds.description}
                    </p>
                  </div>
                </label>

                <div className="dashboard__survey" key={rankeds.__id}>
                  <div className="dashboard__survey-item">
                    <AiFillCaretLeft
                      size={18}
                      color=" #f8f7f5"
                      className="dashboard__icon-left"
                    />
                    <AiFillCaretDown
                      size={18}
                      color=" #f8f7f5"
                      className="dashboard__icon-down"
                    />
                    <span className="dashboard__text">Gostam</span>
                    <h3 className="dashboard__percentage">
                      {`${rankeds.like}%`}
                    </h3>
                  </div>
                  <div className="dashboard__survey-item">
                    <span className="dashboard__text">Não gostam</span>
                    <h3 className="dashboard__percentage">
                      {`${rankeds.deslike}%`}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
