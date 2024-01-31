import React from "react";
import { Page } from "zmp-ui";

const NotFoundPage = () => (
  <Page>
    <div mt={2}>
      <div className="text-center bg-white p-5 rounded-b-md">
        <h3 className="text-xl font-medium mt-2">Sorry</h3>
        <p>Requested page not found.</p>
      </div>
    </div>
  </Page>
);

export default NotFoundPage;
