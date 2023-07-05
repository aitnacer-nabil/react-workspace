import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  return (
    <div>
      <Steps />
      <Counter />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true);

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }
  function handlePrev() {
    if (step > 1) setStep(step - 1);
  }
  return (
    <div>
      <button className="close" onClick={() => setOpen(!isOpen)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">
            Step {step} : {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              className={`${step < 3 ? "btnActive" : ""}`}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              className={`${step < 3 ? "btnActive" : ""}`}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function Counter() {
  const [counter, seCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(() => `today is ${getDate(new Date())}`);

  function handleAddStep() {
    setStep(() => step + 1);
  }
  function handleSubStep() {
    if (step > 1) setStep(() => step - 1);
  }

  function handleAddCounter() {
    seCounter((c) => c + step);
   
  }
  function handleSubCounter() {
    seCounter((c) => c - step);

  }
  function getDate(date) {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

    // Get the month
    const month = date.toLocaleDateString("en-US", { month: "short" });

    // Get the day of the month
    const dayOfMonth = date.getDate();

    // Get the year
    const year = date.getFullYear();

    // Format the date string
    return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  }
  const d = new Date();
  d.setDate(d.getDate() + counter);

  return (
    <div>
      <div>
        <button onClick={handleSubStep}>-</button>
        <span>Step : {`${step}`} </span>
        <button onClick={handleAddStep}>+</button>
      </div>
      <div>
        <button onClick={handleSubCounter}>-</button>
        <span>Count : {`${counter}`} </span>
        <button onClick={handleAddCounter}>+</button>
      </div>
      <p >
      {counter === 0 && <span>Today is </span>}
      {counter > 0 && <span>{counter} days from today is </span>}
      {counter < 0 && <span>{counter} days ago was </span>}
      {getDate(d)}</p>
    </div>
  );
}
export default App;
