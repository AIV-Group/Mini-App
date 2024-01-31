import React, { useEffect, useState } from "react";
import { Avatar, Box, Text } from "zmp-ui";
import logo from "../../assets-src/logo.jpeg";
import { apiUrl, botId } from "../utils/getEnv";
import RenderMarkdown from "./renderMarkdown";

const InforApp = () => {
  const [inforSeting, setInforSeting] = useState(null);

  const getProfileBot = async () => {
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
        setInforSeting(data);
      } else {
        throw new Error(`Failed to fetch. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getProfileBot();
  }, []);
  return (
    <Box className="flex flex-col py-5">
      <div className="flex justify-center w-full">
        <Avatar story="default" src={inforSeting?.preview_logo} size={100} />
      </div>
      <Box ml={4} mt={2}>
        <Text.Title className="text-center">
          {inforSeting?.boxChat_title}
        </Text.Title>
        <p className="font-light text-sm mt-1 text-center">
          <RenderMarkdown childrenRender={inforSeting?.isMessage} />
        </p>
      </Box>
    </Box>
  );
};

export default InforApp;
