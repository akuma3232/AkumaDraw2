import "./AkumadrawLogo.scss";

/** Emblem lives in the app's public folder (`public/logo.png`). */
const LOGO_SRC = "/logo.png";

const LogoIcon = () => (
  <img
    src={LOGO_SRC}
    alt="AkumaDraw"
    className="AkumadrawLogo-icon"
    draggable={false}
  />
);

const LogoText = () => <span className="AkumadrawLogo-text">AkumaDraw</span>;

type LogoSize = "xs" | "small" | "normal" | "large" | "custom" | "mobile";

interface LogoProps {
  size?: LogoSize;
  withText?: boolean;
  style?: React.CSSProperties;
  /**
   * If true, the logo will not be wrapped in a Link component.
   * The link prop will be ignored as well.
   * It will merely be a plain div.
   */
  isNotLink?: boolean;
}

export const AkumadrawLogo = ({
  style,
  size = "small",
  withText,
}: LogoProps) => {
  return (
    <div className={`AkumadrawLogo is-${size}`} style={style}>
      <LogoIcon />
      {withText && <LogoText />}
    </div>
  );
};
