import { useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";

const GameLives = () => {
  const lives = useAppSelector((state) => state.game.lives);

  const Lives = useMemo(() => {
    const livesElements: JSX.Element[] = [];

    for (let i = 0; i < lives; i++) {
      livesElements.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#ef4444"
          style={{ width: "24px", height: "24px" }}
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    while (livesElements.length < 3) {
      livesElements.push(
        <svg
          key={livesElements.length}
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "24px", height: "24px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#171717"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    }
    return livesElements;
  }, [lives]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Lives}
    </div>
  );
};

export default GameLives;
