import { Tooltip } from "@akumadraw/akumadraw/components/Tooltip";
import { shield } from "@akumadraw/akumadraw/components/icons";
import { useI18n } from "@akumadraw/akumadraw/i18n";

export const EncryptedIcon = () => {
  const { t } = useI18n();

  return (
    <span className="encrypted-icon tooltip" aria-label={t("encrypted.link")}>
      <Tooltip label={t("encrypted.tooltip")} long={true}>
        {shield}
      </Tooltip>
    </span>
  );
};
