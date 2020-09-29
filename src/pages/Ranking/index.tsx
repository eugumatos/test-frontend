import React, { useState, useEffect, useCallback } from 'react';
import { AiFillCaretLeft, AiFillCaretDown } from 'react-icons/ai';

import rankingJSON from '../../data/matchboxbrasil.json';

import Logo from '../../assets/logo.png';

import './styles.scss';

interface Rating {
  __id: string;
  name: string;
  description: string;
  picture: string;
  like: number;
  dislike: number;
}

const Ranking: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  const calculateRating = useCallback(() => {
    const newRating: Rating[] = [];

    rankingJSON.data.forEach((data, key) => {
      const {
        __id, description, name, picture, positive, negative,
      } = data;

      if (positive !== null) {
        const likes = Math.round((positive / (positive + negative)) * 100);
        const dislikes = Math.round((negative / (positive + negative)) * 100);

        newRating[key] = {
          __id,
          description,
          name,
          picture,
          like: likes,
          dislike: dislikes,
        };
      } else {
        const likes = Math.round((0 / (0 + negative)) * 100);
        const dislikes = Math.round((negative / (0 + negative)) * 100);

        newRating[key] = {
          __id,
          description,
          name,
          picture,
          like: likes,
          dislike: dislikes,
        };
      }
    });

    newRating.sort((a, b) => b.like - a.like);

    setRatings(newRating);
  }, []);

  useEffect(() => {
    calculateRating();
  }, [calculateRating]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__content">
          <img src={Logo} alt="logo" className="dashboard__img" />
          <div className="dashboard__header">
            <h1 className="dashboard__title">rancking</h1>
          </div>
          <div className="dashboard__ranking">
            {ratings.map((ranked, key) => (
              <div className="dashboard__ranked" key={ranked.__id}>
                <div className="dashboard__avatar">
                  <img
                    src={ranked.picture}
                    className="dashboard__avatar-picture"
                    alt="Avatar"
                  />
                  <span className="dashboard__avatar-placing">
                    {key + 1}
                  </span>
                </div>

                <input
                  className="dashboard__check"
                  type="checkbox"
                  id={ranked.__id}
                />

                <label htmlFor={ranked.__id}>
                  <div className="dashboard__ranked-owner">
                    <strong className="dashboard__ranked-name">
                      {ranked.name}
                    </strong>
                    <p className="dashboard__ranked-description">
                      {ranked.description}
                    </p>
                  </div>
                </label>

                <div className="dashboard__survey" key={ranked.__id}>
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
                      {`${ranked.like}%`}
                    </h3>
                  </div>
                  <div className="dashboard__survey-item">
                    <span className="dashboard__text">Não gostam</span>
                    <h3 className="dashboard__percentage">
                      {`${ranked.dislike}%`}
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
