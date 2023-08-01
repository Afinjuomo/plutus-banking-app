import { useEffect, useState } from "react";
import verify from "./verifyImage/verify-image.png";
import "./Verify.css";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const sendOTP = () => {
    setMinutes(4);
    setSeconds(59);
  };

  const resendOTP = () => {
    setMinutes(4);
    setSeconds(59);
  };

  return (
    <body>
      <div className="container">
        <div className="imagediv">
          <img className="mainimage" src={verify} alt="" />
          <p className="white-text maintext">
            Plutus is personal <br /> finance, made simple
          </p>
          <p className="white-text">
            All your accounts,cards, savings and investments in <br /> one place
          </p>
        </div>
        <div className="verifycomponent">
          <div className="topright">
            <span className="plutus">Plutus</span>
            <p className="onlinebanking">Online banking</p>
          </div>
          <h2 className="h2">Verify your identity</h2>
          <p className="text-details">
            We've just sent a text message with your security code
          </p>
          <p className=" detail2">on the email example@gmail.com</p>
          <p className="text-details">
            Please enter the number in order to continue
          </p>
          {/* <div className="inputs">
            <input type="text" placeholder="0" />
            <input type="text" placeholder="0" />
            <input type="text" placeholder="0" />
            <input type="text" placeholder="0" />
          </div> */}

          <div className="otpInput">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="countdown-text">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes};
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>Didn't receive code?</p>
            )}
          </div>
          <Link to="/dashboard">
            <button className="button" onClick={sendOTP}>
              Verify
            </button>
          </Link>
          <button
            className="button2"
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#fff" : "#FF5630",
            }}
            onClick={resendOTP}>
            I didn't get the code
          </button>
          <p className="password">Forgot your password?</p>
        </div>
      </div>
    </body>
  );
}
