import React, {useEffect, useState, useCallback} from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";


/** List of jokes. Functional version. */
function JokeList ({numJokesToGet=5}) {
    const [jokes, setJokes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /** Retrieve jokes from API. */
    const getJokes = useCallback(async () => {

        try {
            // Load jokes one at a time, adding not-yet-seen jokes
            let jokes = [];
            let seenJokes = new Set();

            while (jokes.length < numJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                });

                let { ...joke } = res.data;

                if (!seenJokes.has(joke.id)) {
                    seenJokes.add(joke.id);
                    jokes.push({ ...joke, votes: 0 });
                } else {
                    console.log("duplicate found!");
                }
            }

            setJokes(jokes);
            setIsLoading(false);

        } catch (err) {
            console.error(err);
        }
    }, [numJokesToGet]);

    useEffect(() => {
        getJokes();
    }, [getJokes]);

    /**
     * Empty joke list, set to loading state, and get new jokes.
     */
    const generateNewJokes = () => {
        setJokes([]);
        setIsLoading(true);
        getJokes();
    }

    /**
     * Change vote for joke with this ID by delta (+1 or -1).
     */
    const vote = (id, delta) => {
        setJokes(jokes =>
            jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
        );
    };

    /**
     * Either render the loading spinner or the list of sorted jokes.
     */
    let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    if (isLoading) {
        return (
            <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
        );
    }

    return (
        <div className="JokeList">
            <button
                className="JokeList-getmore"
                onClick={generateNewJokes}
            >
                Get New Jokes
            </button>

            {sortedJokes.map(j => (
                <Joke
                    text={j.joke}
                    key={j.id}
                    id={j.id}
                    votes={j.votes}
                    vote={vote}
                />
            ))}
        </div>
    );
}


export default JokeList;
