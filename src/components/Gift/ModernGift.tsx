import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import "./modern-gift.css";
import GiftBox from "./GiftBox.tsx";

export enum Colors {
  red = "#9f3b46",
  green = "#a8cc61",
  blue = "#99c3d1",
  yellow = "#efba50",
  olive = "#459d8b",
  brown = "#9b7d7a",
  white = "#fff",
}

interface Props {
  label: number;
  color?: Colors;
  bgColor: Colors;
  bgImageSrc?: string;
  labelPos?: "center" | "tr" | "tl" | "br" | "bl";
  children?: ReactNode;
}

export default function ModernGift({
  label,
  color = Colors.white,
  bgColor,
  bgImageSrc,
  labelPos = "center",
  children,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isModalOpen && !modal.open) modal.showModal();
    else if (!isModalOpen && modal.open) modal.close();
  }, [isModalOpen]);

  const handleModalClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) setIsModalOpen(false);
  };

  return (
    <>
      <article
        className={`gift pos-${labelPos}`}
        style={
          {
            "--box": bgColor,
            color,
            backgroundImage: bgImageSrc ? `url("${bgImageSrc}")` : undefined,
          } as React.CSSProperties
        }
      >
        <button
          className="gift-trigger"
          type="button"
          aria-haspopup="dialog"
          aria-controls={`modal${label}`}
          aria-label={`Abrir regalo ${label}`}
          onClick={() => setIsModalOpen(true)}
        >
          <span>{label}</span>
        </button>
      </article>
      <dialog
        ref={modalRef}
        id={`modal${label}`}
        className="gift-modal"
        aria-label={`Regalo ${label}`}
        onClose={() => setIsModalOpen(false)}
        onClick={handleModalClick}
      >
        <GiftBox color="blue" label={1} width="10rem" />
      </dialog>
    </>
  );
}
