import "./Mail.scss";
import React, { FC, useState } from "react";
import MailForm from "./MailForm";
import { MailSuccess } from "./MailSuccess";
import { Page } from "../../ui/Page/Page";
import { useBrowser } from "../../hooks/useBrowser";
import ThirdWord from "../Three/ThreeContainer";
import { useBrowserHook } from "../../types/types";

const Mail: FC = React.memo(() => {
  const [modelChanger, setModelChanger] = useState<boolean>(false);
  const { name, version }: useBrowserHook = useBrowser();
  return (
    <Page className="mail__content">
      <div
        style={{
          display: name == "Safari" && +version <= 15 ? "none" : undefined,
        }}
        className="mail_threeModel"
      >
        <ThirdWord modelChanger={modelChanger} />
      </div>

      {modelChanger ? (
        <MailSuccess setModelChanger={setModelChanger} />
      ) : (
        <MailForm
          modelChanger={modelChanger}
          setModelChanger={setModelChanger}
        />
      )}
    </Page>
  );
});

export default Mail;
