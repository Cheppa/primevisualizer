import { useEffect, useState } from "react";

const isPrime = (number: number) => {
  if (number <= 1) {
    return false;
  }

  // looping through 2 to number-1
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

// const findNextPrime = (from: number) => {
//   let newPrime = from;
//   while (!isPrime(newPrime)) {
//     newPrime++;
//   }
//   return newPrime;
// };

function App() {
  const [primes, setPrimes] = useState([2]);
  const maxprime = Math.max(...primes);

  const [loop, setLoop] = useState(false);

  useEffect(() => {
    if (loop) {
      setInterval(() => {
        if (loop) {
          //   const newPrime = findNextPrime(primes[primes.length - 1] + 1);
          setPrimes((primes) => {
            let newPrime = primes[primes.length - 1] + 1;
            while (!isPrime(newPrime)) {
              newPrime++;
            }
            return [...primes, newPrime];
          });
        }
      }, 100);
    }
  }, [loop]);

  //   const handleRunner = () => {
  //     const newPrime = findNextPrime(primes[primes.length - 1] + 1);
  //     setPrimes((primes) => [...primes, newPrime]);
  //   };
  const handleLoop = () => {
    setLoop((loop) => !loop);
  };

  return (
    <div>
      <div>
        <button onClick={handleLoop}>{loop ? "STOP" : "START"}</button>
      </div>
      <div>Max: {primes[primes.length - 1]}</div>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {primes.map((prime) => (
          <div
            key={prime}
            style={{
              width: `${(100 / primes.length) * 1}%`,
              height: "100%",
            }}
          >
            <div
              style={{
                height: `${(prime / maxprime) * 100}%`,
                backgroundColor: "#F00",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
