import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  // All states
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  // BMI calculation
  const calcBmi = (e) => {
    e.preventDefault();

    const numWeight = parseFloat(weight);
    const numHeight = parseFloat(height);

    if (!numWeight || numWeight <= 0 || !numHeight || numHeight <= 0) {
      toast.error("Enter valid weight and height values!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    let calculatedBmi = (numWeight / (numHeight * numHeight)) * 703;
    const finalBmi = calculatedBmi.toFixed(1);
    setBmi(finalBmi);

    if (calculatedBmi < 18.5) {
      setMessage("You are underweight");
      toast.info("BMI calculated: Underweight", {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      setMessage("You are at a healthy weight");
      toast.success("BMI calculated: Healthy weight!", {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      setMessage("You are overweight");
      toast.warning("BMI calculated: Overweight", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      setMessage("You are in the obese range");
      toast.error("BMI calculated: Obese range", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Reset/Reload State
  const reload = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setMessage("");
    toast.info("Calculator reset", { position: "top-center", autoClose: 2000 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* React Toastify Container */}
      <ToastContainer />

      <div className="card w-full max-w-md bg-gray-200 shadow-2xl border border-base-300">
        <div className="card-body p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-green-800">
              BMI Calculator
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              Check your body mass index quickly and easily
            </p>
          </div>

          {/* Form */}
          <form onSubmit={calcBmi} className="space-y-5">
            {/* Weight Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Weight (lbs)</span>
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 150"
                className="input outline-none w-full "
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Height Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Height (in)</span>
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g. 68"
                className="input input-bordered outline-none  w-full "
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="btn bg-green-700 flex-1 text-gray-200"
              >
                Calculate BMI
              </button>
              <button
                type="button"
                onClick={reload}
                className="btn bg-green-700  text-gray-200 flex-1"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Result & Message Display */}
          {bmi && (
            <div className="mt-6 p-4 rounded-xl bg-base-200/60 text-center border border-base-300 animate-fadeIn">
              <h3 className="text-lg font-semibold text-base-content">
                Your BMI is: <span className="text-green-800">{bmi}</span>
              </h3>
              <p className="text-sm font-medium mt-1 text-base-content/80">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
