import { useRef, useState, useEffect } from "react";
import { USER_REGEX, PASSWORD_REGEX } from "../utils/loginRegex";
import { apiData } from "../api/apiData";

export const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPdw, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPdw;
    setValidMatch(match);
  }, [pwd, matchPdw]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPdw]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      username: user,
      password: pwd,
    };

    if (validName && validPwd && validMatch) {
      try {
        const response = await apiData.signIn(newUser);
        if (response.status === 200) {
          console.log("response:", JSON.stringify(response));
          setSuccess(true);
        }
      } catch (_error) {
        console.log("error:", _error);
      }
    } else {
      setErrMsg("Please fill all the fields");
      throw new Error("Please fill all the fields");
    }
  };

  return (
    <>
      {success ? (
        <div className="success">
          <p>User created successfully </p>
          {/*  <Link to="/login">Go to Login</Link> */}
        </div>
      ) : (
        <section className="form_container">
          <p
            ref={errorRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} className="form_box">
            {/* Username  */}
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instruction" : "offscreen"
              }
            >
              8 to 20 characters, letters and numbers only
            </p>

            {/* Password  */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instruction" : "offscreen"}
            >
              Minimun of 8 characters, at least one Mayus letter, minus letter,
              one number and one symbol,
            </p>

            {/* Confirm Password  */}
            <label htmlFor="password">Repeat Password:</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instruction" : "offscreen"
              }
            >
              Must Match the first password field
            </p>
            <button
              type="submit"
              className="submit_btn"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
            <span>
              {/*   <Link to="/login">Already have a password</Link> */}
            </span>
          </form>
        </section>
      )}
    </>
  );
};
