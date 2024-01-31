import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
  Select,
  Input,
  useSnackbar,
  Header,
} from "zmp-ui";

import { useRecoilValue } from "recoil";
import { displayNameState, profileChat, userState } from "../state";
import { apiUrl, botId } from "../utils/getEnv";

const UserPage = () => {
  // const { userInfo: user } = useRecoilValue(userState);
  // const displayName = useRecoilValue(displayNameState);
  const [loaderComfirm, setLoaderComfirm] = useState(false);

  const profile = useRecoilValue(profileChat);
  const [inforSeting, setInforSeting] = useState(null);
  const [dataForm, setDataForm] = useState(null);

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const getInfoUser = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/api/v3/user-preference?bot_id=${botId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const stylesArray = Object.values(data.style);
        setInforSeting({ ...data, style: stylesArray });
      } else {
        throw new Error(`Failed to fetch. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!dataForm?.name || !dataForm?.pronoun || !dataForm?.style)
      return snackbar.openSnackbar({
        duration: 2000,
        text: "Vui lòng điền thông tin",
        type: "warning",
      });

    setLoaderComfirm(true);
    const payload = {
      form: inforSeting?.id,
      bot: botId,
      user_contact_info: {
        email: profile?.email,
        phone_number: "",
      },
      user_preference_info: {
        detail_preferences: inforSeting?.detail_preferences,
        pronoun: dataForm?.pronoun,
        style: dataForm?.style,
      },
    };

    const isUrl = profile?.is_email_existed
      ? `${apiUrl}/api/v3/personal-data?id=${inforSeting?.id}&bot_id=${botId}&email=${profile?.email}`
      : `${apiUrl}/api/v3/personal-preference${apiUrl}/api/v3/personal-preference`;

    try {
      const res = await fetch(isUrl, {
        method: profile?.is_email_existed ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setLoaderComfirm(false);
        navigate("/chat");
        return result;
      } else {
        setLoaderComfirm(false);
        snackbar.openSnackbar({
          duration: 3000,
          text: "Diền thiếu thông tin",
          type: "error",
        });
        throw new Error("Request failed");
      }
    } catch (error) {
      setLoaderComfirm(false);
      snackbar.openSnackbar({
        duration: 3000,
        text: "Hệ thống đang bảo trì",
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

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <Page className="page">
      <Header
        backgroundColor="#2483ff"
        textColor="white"
        style={{
          paddingBottom: "1.6rem",
          paddingTop: "4.6rem",
          marginBottom: "0px",
          background: "#2483ff",
        }}
        title="Thông tin cá nhân hoá"
      />

      <Box m={0} p={0}>
        <div className="section-container mt-24">
          <div className="border-b pb-3 text-lg">Thông tin</div>
          <Box mt={6}>
            <Input
              defaultValue={profile?.fullName}
              onChange={(e) =>
                setDataForm((data) => ({ ...data, name: e.target.value }))
              }
              type="text"
              label="Họ và tên"
              helperText="Nhập họ và tên đầy đủ của bạn"
              placeholder="Họ và tên"
            />
          </Box>

          <Box mt={6}>
            <Input
              value={profile?.email}
              type="email"
              disabled
              onChange={(e) =>
                setDataForm((data) => ({ ...data, email: e.target.value }))
              }
              label="Email"
              helperText="Nhập email có dạng @gmail.com"
              placeholder="Nhập thông tin"
            />
          </Box>

          <Box mt={6}>
            <Select
              label="Giới tính"
              helperText="Chọn giới tính của bạn"
              placeholder="Chọn giới tính"
              onChange={(selected) =>
                setDataForm((data) => ({ ...data, pronoun: selected }))
              }
            >
              {inforSeting?.pronoun?.map((sex, index) => (
                <Option key={index} value={sex} title={sex} />
              ))}
            </Select>
          </Box>
          <Box mt={6}>
            <Select
              onChange={(selected) =>
                setDataForm((data) => ({ ...data, style: selected }))
              }
              label="Phong cách"
              helperText="Chọn phong cách giao tiếp mà bạn muốn"
              placeholder="Chọn phong cách"
            >
              {inforSeting?.style?.map((title, index) => (
                <Option key={index} value={title} title={title} />
              ))}
            </Select>
          </Box>

          <Box mt={6} className="w-full">
            <Button
              loading={loaderComfirm}
              onClick={() => handleSubmit()}
              variant="primary"
              fullWidth
              size="large"
            >
              {!profile?.isUpdate ? "Bắt đầu chat" : "Cập nhật"}
            </Button>
          </Box>
        </div>
      </Box>
    </Page>
  );
};

export default UserPage;
