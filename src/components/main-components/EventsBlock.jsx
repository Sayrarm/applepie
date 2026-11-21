import { useRef, useState } from "react";
import styles from "@pages/main/Home.module.css";
import { FlexibleTimer, ModalWindow, BannerDetails } from "@components";
import { getImageUrl } from "@hooks";
import { useTranslation } from "react-i18next";

function EventsBlock({ events }) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const modalRef = useRef();

  if (!events || events.length === 0) {
    return <div className={styles.noEvents}>{t("EventsBlock.noEvents")}</div>;
  }

  const showEventModal = (event) => {
    setSelectedEvent(event);
    modalRef.current.showModal();
  };

  return (
    <>
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          className={styles.containerTitleTimerButton}
          onClick={() => showEventModal(event)}
        >
          <div className={styles.bannerTitle}>{event.name}</div>
          <FlexibleTimer
            startDateTime={event.startDate}
            endDateTime={event.endDate}
          />
          <img
            className={styles.imgBanner}
            src={getImageUrl(event.image)}
            alt={event.name}
            loading="lazy"
          />
        </button>
      ))}

      <ModalWindow
        ref={modalRef}
        title={selectedEvent?.name}
        tag={<BannerDetails banner={selectedEvent} />}
      />
    </>
  );
}

export default EventsBlock;
