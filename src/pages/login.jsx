import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Header,
  Page,
  Box,
  Input,
  Button,
  Avatar,
  useNavigate,
  useSnackbar,
} from "zmp-ui";
import { profileChat } from "../state";
import { apiUrl, botId } from "../utils/getEnv";

const Auth = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email, setImail] = useState("");
  const [otp, setOtp] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loaderComfirm, setLoaderComfirm] = useState(false);
  const [isPersional, setIspersional] = useState(true);
  const [isOtpSending, setIsOptSending] = useState(false);
  const [profile, setProfile] = useRecoilState(profileChat);
  const router = useNavigate();
  const snackbar = useSnackbar();

  const handleLogin = async () => {
    const inputEmail = document.getElementById("email-id");
    if (!email) return inputEmail.focus();
    if (otp?.length < 6 && otp?.length > 6) return;

    setLoaderComfirm(true);
    const payload = {
      otp_code: otp,
      bot_id: botId,
      email: email,
    };

    try {
      const res = await fetch(`${apiUrl}/api/auth/otp-v2/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();

        const userInfo = {
          fullName: "",
          email: email,
          phone: "",
          is_email_existed: result?.is_email_existed,
          isSend: false,
          data_id: result?.user_info_id,
          conversation_id: result?.conversation_id,
          isLogin: true,
          isUpdate: false,
          styleChat: null,
          age: null,
        };

        setLoaderComfirm(false);
        setProfile(userInfo);
        router("/user");
        return userInfo;
      } else {
        setLoaderComfirm(false);
        snackbar.openSnackbar({
          duration: 3000,
          text: "Verify is not success!!!",
          type: "error",
        });
        throw new Error("Request failed");
      }
    } catch (error) {
      setLoaderComfirm(false);
      snackbar.openSnackbar({
        duration: 3000,
        text: "Tiếp tục thất bại",
        type: "error",
      });
      if (error instanceof SyntaxError) {
        // Handle JSON parsing error
        console.error("Error parsing JSON:", error);
      } else {
        // Handle other errors
        console.error("Error:", error);
      }
    }
  };

  const onSubmit = async () => {
    const inputEmail = document.getElementById("email-id");
    if (!email) return inputEmail.focus();

    setLoader(true);

    const payload = {
      bot_id: botId,
      email: email,
    };

    try {
      const res = await fetch(`${apiUrl}/api/auth/otp-v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setIsOptSending(true);
        setMinutes(1);
        setSeconds(59);
        setLoader(false);
        snackbar.openSnackbar({
          duration: 3000,
          text: "Đã gửi mã tới email",
          type: "success",
        });
        return result;
      } else {
        setLoader(false);
        snackbar.openSnackbar({
          duration: 3000,
          text: "Gửi lẫy mã không thành công",
          type: "error",
        });
        throw new Error("Request failed");
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        // Handle JSON parsing error
        snackbar.openSnackbar({
          duration: 3000,
          text: "Gửi lẫy mã không thành công",
          type: "error",
        });
        setLoader(false);
        console.error("Error parsing JSON:", error);
      } else {
        // Handle other errors
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setIsOptSending(false);
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
    //eslint-disable-next-line
  }, [seconds]);

  const getBotInfor = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/embed/bot/${botId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      });

      if (res.ok) {
        const data = await res.json();
        setIspersional(data.is_personal_mode);
      } else {
        throw new Error(`Failed to fetch. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getBotInfor();
  }, []);

  return (
    <Page className="page">
      <Header
        backgroundColor="#2483ff"
        textColor="white"
        showBackIcon={false}
        style={{
          paddingBottom: "1.6rem",
          paddingTop: "4.6rem",
          marginBottom: "0px",
          background: "#2483ff",
          textAlgin: "center",
        }}
        title="Đang nhập"
      />
      {isPersional ? (
        <div className="mt-24 section-container">
          <div className="border-b pb-3 text-lg">Thông tin</div>
          <Box my={6}>
            <Input
              id="email-id"
              onChange={(e) => setImail(e.target.value)}
              type="email"
              label="Email"
              helperText="Nhập email có dạng @gmail.com"
              placeholder="Nhập thông tin"
            />
          </Box>
          <Box mt={6}>
            <div className="flex justify-between mb-1">
              <p className="zaui-input-label">Mã OTP</p>
              {(seconds > 0 || minutes > 0) && isOtpSending && (
                <p className="text-sm text-center text-gray-500">
                  Hiệu lực: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              )}
            </div>

            <Input.OTP
              otpLength={6}
              onChange={(e) => setOtp(e.target.value)}
              helperText="Nhập email có dạng @gmail.com"
              show={false}
            />
            <span className="zaui-input-helper-text">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="zaui-input-helper-text-icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.09961 7.99961C1.09961 4.18884 4.18884 1.09961 7.99961 1.09961C11.8104 1.09961 14.8996 4.18884 14.8996 7.99961C14.8996 11.8104 11.8104 14.8996 7.99961 14.8996C4.18884 14.8996 1.09961 11.8104 1.09961 7.99961ZM7.9996 5.99963C8.55189 5.99963 8.9996 5.55192 8.9996 4.99963C8.9996 4.44735 8.55189 3.99963 7.9996 3.99963C7.44732 3.99963 6.9996 4.44735 6.9996 4.99963C6.9996 5.55192 7.44732 5.99963 7.9996 5.99963ZM7.9996 6.89966C8.44143 6.89966 8.7996 7.25783 8.7996 7.69966V11.2997C8.7996 11.7415 8.44143 12.0997 7.9996 12.0997C7.55778 12.0997 7.1996 11.7415 7.1996 11.2997V7.69966C7.1996 7.25783 7.55778 6.89966 7.9996 6.89966Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="zaui-input-helper-text-content">
                Nhập mã otp được gửi về email của bạn
              </span>
            </span>
          </Box>
          <Box mt={6}>
            {!otp ? (
              <Button
                loading={loader}
                onClick={() => !isOtpSending && onSubmit()}
                fullWidth
              >
                {isOtpSending ? "Đã gửi" : "Lấy mã"}
              </Button>
            ) : (
              <Button
                loading={loaderComfirm}
                onClick={() => handleLogin()}
                fullWidth
              >
                Tiếp tục
              </Button>
            )}
          </Box>
        </div>
      ) : (
        <div className="mt-28 section-container">
          <div className="border-b pb-3 text-lg">Thông báo</div>
          <p>
            Chủ sở hưu chưa bật tính năng cá nhân hoá. Vui lòng bật tính năng cá
            nhân hoá.
          </p>
          <p>Nếu là chủ sở hữu vùi lòng bật tính năng tại</p>
          <a
            className="text-blue-500 border-b"
            href="https://mindmaid.ai/"
            targer="_blank"
          >
            https://mindmaid.ai/
          </a>
        </div>
      )}
    </Page>
  );
};

export default Auth;
