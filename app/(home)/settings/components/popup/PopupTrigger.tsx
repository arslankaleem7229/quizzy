import { UsernameModal } from "./DesktopPopup";
import { UsernameDrawer } from "./MobileBottomDrawer";
import { useIsMobile } from "@/app/hooks/useIsMobile";

type props = {
  open: boolean | undefined;
  onClose: (() => void) | undefined;
};

export default function ChangeUsernamePopup({ open, onClose }: props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <UsernameDrawer open={open} onClose={onClose} />;
  }

  return <UsernameModal open={open} onClose={onClose} />;
}
