import React from "react";
import { Button, Input, Box, Page, useSnackbar, Header } from "zmp-ui";
import { useRecoilState } from "recoil";
import { displayNameState } from "../state";
import { useNavigate } from "react-router";

const FormPage = () => {
  const [displayName, setDisplayName] = useRecoilState(displayNameState);
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = () => {
    snackbar.openSnackbar({
      duration: 3000,
      text: "Display name updated!",
      type: "success",
    });
    navigate(-1);
  };

  return (
    <Page className="page">
      <Header
        backgroundColor="#2483ff"
        textColor="white"
        style={{
          paddingBottom: "1.6rem",
          paddingTop: "4.4rem",
          marginBottom: "0px",
          background: "#2483ff",
        }}
        title="Smart Study"
      />
      <div className="section-container mt-28">
        <Box>
          <Input
            label="Họ và tên"
            type="text"
            placeholder="Nhập thông tin"
            value={displayName}
            helperText="Nhập đầy đủ thông tin họ và tên của bạn"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Box mt={4}>
            <Button fullWidth variant="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </Box>
        </Box>
      </div>
    </Page>
  );
};

export default FormPage;
