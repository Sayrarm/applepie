import { useEffect, useState } from "react";
import { getSlot } from "@localstorage";

const ACTIVE_SLOT_KEY = "activeAccountSlot";
export const ACTIVE_ACCOUNT_CHANGED = "active-account-changed";
export const SLOT_UPDATED = "account-slot-updated";

export const notifyActiveAccountChanged = () => {
    window.dispatchEvent(new Event(ACTIVE_ACCOUNT_CHANGED));
};

export const notifySlotUpdated = (slotId) => {
    window.dispatchEvent(
        new CustomEvent(SLOT_UPDATED, { detail: { slotId } }),
    );
};

export function useActiveAccount() {
    const [account, setAccount] = useState(() => {
        const slotId = localStorage.getItem(ACTIVE_SLOT_KEY);
        return slotId ? { slotId, name: slotId, fileName: null } : null;
    });

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const slotId = localStorage.getItem(ACTIVE_SLOT_KEY);
            if (!slotId) {
                if (!cancelled) setAccount(null);
                return;
            }

            const slot = await getSlot(slotId);
            if (cancelled) return;

            if (!slot) {
                setAccount({ slotId, name: slotId, fileName: null });
                return;
            }

            setAccount({
                slotId,
                name: slot.name || slotId,
                fileName: slot.fileName || null,
            });
        };

        load();

        const onChange = () => load();
        const onStorage = (e) => {
            if (!e.key || e.key === ACTIVE_SLOT_KEY) load();
        };
        const onSlotUpdated = (e) => {
            const current = localStorage.getItem(ACTIVE_SLOT_KEY);
            if (!e.detail || e.detail.slotId === current) load();
        };

        window.addEventListener(ACTIVE_ACCOUNT_CHANGED, onChange);
        window.addEventListener(SLOT_UPDATED, onSlotUpdated);
        window.addEventListener("storage", onStorage);

        return () => {
            cancelled = true;
            window.removeEventListener(ACTIVE_ACCOUNT_CHANGED, onChange);
            window.removeEventListener(SLOT_UPDATED, onSlotUpdated);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    return account;
}