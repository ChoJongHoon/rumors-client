import React, { Component } from "react";
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink,
  AuthError
} from "components/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "redux/modules/auth";
import * as userActions from "redux/modules/user";
import storage from "lib/storage";
import { isEmail, isLength } from "validator";
import debounce from "lodash/debounce";
import randomCodeGenerator from "lib/randomCodeGenerator";
import * as MailAPI from "lib/api/mail";

class Register extends Component {
  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: "register",
      message
    });
  };

  setEmailConfirm = code => {
    const { AuthActions } = this.props;
    AuthActions.setEmailConfirm({
      form: "register",
      code
    });
  };

  sendMail = async () => {
    const { AuthActions, form } = this.props;
    const { email } = form.toJS();
    const { validate } = this;

    try {
      await AuthActions.checkIdExists(email);
      console.log(this.props.exists.get("email"));
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.");
        return false;
      } else if (!validate["email"](email)) {
        return false;
      } else {
        const code = randomCodeGenerator();
        this.setError(null);
        this.setEmailConfirm(code);
        MailAPI.sendCode({ id: email, code });
      }
    } catch (e) {
      console.log(e);
    }
  };

  validate = {
    email: value => {
      if (!isEmail(value)) {
        this.setError("잘못된 이메일 형식 입니다.");
        return false;
      }
      // this.setError(null);
      return true;
    },
    code: value => {
      const { emailConfirm } = this.props;
      if (value !== emailConfirm) {
        this.setError("인증번호가 틀렸습니다.");
        return false;
      }
      this.setError(null);
      return true;
    },
    username: value => {
      if (!isLength(value, { min: 2, max: 10 })) {
        this.setError("이름은 2~10 글자로 이뤄져야 합니다.");
        return false;
      }
      this.setError(null);
      return true;
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.setError("비밀번호를 6자 이상 입력하세요.");
        return false;
      }
      this.setError(null);
      return true;
    },
    passwordConfirm: value => {
      if (this.props.form.get("password") !== value) {
        this.setError("비밀번호확인이 일치하지 않습니다.");
        return false;
      }
      this.setError(null);
      return true;
    }
  };
  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm("register");
  }

  checkIdExists = debounce(async email => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkIdExists(email);
      console.log(this.props.exists.get("email"));
      if (this.props.exists.get("email")) {
        this.setError("이미 존재하는 이메일입니다.");
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  handleChange = e => {
    const { AuthActions, emailConfirm } = this.props;
    const { name, value } = e.target;

    if (name === "email" && emailConfirm) {
      this.setError("이메일을 수정하실 수 없습니다.");
      return;
    }

    AuthActions.changeInput({
      name,
      value,
      form: "register"
    });

    // 검증작업 진행
    const validation = this.validate[name](value);
    if (name.indexOf("password") > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침
    if (name === "email") this.checkIdExists(value);
  };

  handleRegister = async () => {
    const { form, AuthActions, UserActions, error, history } = this.props;
    const { email, code, username, password, passwordConfirm } = form.toJS();

    const { validate } = this;

    if (error) return; // 현재 에러가 있는 상태라면 진행하지 않음
    if (
      !validate["email"](email) ||
      !validate["code"](code) ||
      !validate["username"](username) ||
      !validate["password"](password) ||
      !validate["passwordConfirm"](passwordConfirm)
    ) {
      // 하나라도 실패하면 진행하지 않음
      return;
    }

    try {
      await AuthActions.register({
        userId: email,
        userName: username,
        userPw: password
      });
      const loggedInfo = this.props.result.toJS();

      storage.set("loggedInfo", loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      console.log(loggedInfo);
      history.push("/"); // 회원가입 성공시 홈페이지로 이동
    } catch (e) {
      // 에러 처리하기
      console.log(e);
      if (e.response.status === 409) {
        const { key } = e.response.data;
        const message =
          key === "email"
            ? "이미 존재하는 이메일입니다."
            : "이미 존재하는 아이디입니다.";
        return this.setError(message);
      }
      this.setError("알 수 없는 에러가 발생했습니다.");
    }
  };

  render() {
    const { error, emailConfirm } = this.props;
    const {
      email,
      code,
      username,
      password,
      passwordConfirm
    } = this.props.form.toJS();
    const { handleChange, handleRegister, sendMail } = this;

    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
          readOnly={emailConfirm}
        />
        {!emailConfirm ? (
          <AuthButton onClick={sendMail}>이메일 인증</AuthButton>
        ) : (
          <InputWithLabel
            label="인증번호"
            name="code"
            placeholder="인증번호"
            value={code}
            onChange={handleChange}
          />
        )}
        <InputWithLabel
          label="이름"
          name="username"
          placeholder="이름"
          value={username}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <AuthButton onClick={handleRegister}>회원가입</AuthButton>
        {error && <AuthError>{error}</AuthError>}
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(
  state => ({
    form: state.auth.getIn(["register", "form"]),
    error: state.auth.getIn(["register", "error"]),
    exists: state.auth.getIn(["register", "exists"]),
    result: state.auth.get("result"),
    emailConfirm: state.auth.getIn(["register", "emailConfirm"])
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Register);
