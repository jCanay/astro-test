import "./gift.css";
import Lid from "./Gift.astro";
import Counter from "../../lib/counter.ts";

interface Props {
  width: string;
  label: number;
  color: "red" | "green" | "blue" | "yellow" | "pink" | "orange";
}

interface Config {
  colors: {
    red: {
      base: string;
      ribbon: string;
    };
    green: {
      base: string;
      ribbon: string;
    };
    blue: {
      base: string;
      ribbon: string;
    };
    yellow: {
      base: string;
      ribbon: string;
    };
    pink: {
      base: string;
      ribbon: string;
    };
    orange: {
      base: string;
      ribbon: string;
    };
  };
}

const config: Config = {
  colors: {
    red: {
      base: "#dd4a43",
      ribbon: "#7ea82d",
    },
    green: {
      base: "#7ea82d",
      ribbon: "#dd4a43",
    },
    blue: {
      base: "#439ddd",
      ribbon: "#dcc919",
    },
    yellow: {
      base: "#dcc919",
      ribbon: "#dd4a43",
    },
    pink: {
      base: "#c646d2",
      ribbon: "#48c25b",
    },
    orange: {
      base: "#dc7a3a",
      ribbon: "#6965da",
    },
  },
};

export default function Gift({ width, label, color = "green" }: Props) {
  return (
    <article
      className="gift"
      style={
        {
          "--box": config.colors[color].base,
          "--ribbon": config.colors[color].ribbon,
        } as React.CSSProperties
      }
    >
      <svg className="lid" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g id="flat">
          <rect height="12" className="box-base" width="58" x="3" y="15" />
          <rect height="12" className="ribbon-base" width="12" x="26" y="15" />
          <path
            d="M27.658,6.317A6,6,0,0,0,22.292,3H14a6,6,0,0,0,0,12H32Z"
            className="ribbon-base"
          />
          <path
            d="M32,15H22a6,6,0,0,1-6-6h0a6,6,0,0,1,6-6h.292a6,6,0,0,1,5.366,3.317Z"
            className="ribbon-darker"
          />
          <path
            d="M36.342,6.317A6,6,0,0,1,41.708,3H50a6,6,0,0,1,0,12H32Z"
            className="ribbon-base"
          />
          <path
            d="M32,15H42a6,6,0,0,0,6-6h0a6,6,0,0,0-6-6h-.292a6,6,0,0,0-5.366,3.317Z"
            className="ribbon-darker"
          />
          <polygon points="38 27 38 15 26 15 26 27 30 27 32 22 34 27" className="ribbon-dark" />
          <polygon points="21 42 17 37 10 39 20 15 32 15 21 42" className="ribbon-base" />
          <polygon points="43 42 47 37 54 39 44 15 32 15 43 42" className="ribbon-base" />
          <rect
            height="2"
            className="ribbon-light"
            transform="translate(-14.645 35.51) rotate(-68.547)"
            width="9.642"
            x="13.91"
            y="27.5"
          />
          <rect
            height="2"
            className="ribbon-light"
            transform="translate(-5.742 33.641) rotate(-68.973)"
            width="2.143"
            x="20.544"
            y="20"
          />
        </g>
      </svg>
      <svg className="base" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g id="flat">
          <rect height="34" className="box-base" width="52" x="6" y="27" />
          <rect height="4" className="box-dark" width="52" x="6" y="27" />
          <rect height="34" className="ribbon-base" width="12" x="26" y="27" />
          <polygon points="38 36 38 27 26 27 26 37 30 27 34 27 38 36" className="ribbon-dark" />
          <rect height="9" className="box-light" width="2" x="9" y="49" />
          <rect height="2" className="box-light" width="2" x="9" y="45" />
        </g>
      </svg>
    </article>
  );
}
