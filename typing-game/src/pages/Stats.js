const Stats = () => {
    const highscore = localStorage.getItem('highscore');

    return (
        <div className="stats-container">
            <p className="stats-label">Your best score: {highscore}</p>
        </div>
    )
}

export default Stats;