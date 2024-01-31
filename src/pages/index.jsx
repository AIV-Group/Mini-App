import React from "react";
import { useRecoilValue } from "recoil";
import { List, Page, Icon, useNavigate, Header } from "zmp-ui";
import InforApp from "../components/infor-app";
import UserCard from "../components/user-card";
import { userState } from "../state";

const HomePage = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <Page className="page" hideScrollbar={true}>
      <div className="section-container">
        <UserCard user={user.userInfo} />
      </div>
      <div className="section-container">
        <InforApp />
      </div>
      <div className="section-container">
        <List>
          <List.Item
            onClick={() => navigate("/chat")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            Học ngay
          </List.Item>
          <List.Item
            onClick={() => navigate("/user")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            Tài khoản
          </List.Item>
        </List>
      </div>
    </Page>
  );
};

export default HomePage;
