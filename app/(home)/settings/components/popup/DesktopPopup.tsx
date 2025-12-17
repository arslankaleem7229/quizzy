import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

type props = {
  open: boolean | undefined;
  onClose: (() => void) | undefined;
};

export function UsernameModal({ open, onClose }: props) {
  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>Change username</ModalHeader>
        <ModalBody>
          <p className="text-sm opacity-80">
            Your username can be changed only once. Our records indicate you
            have already changed it, so it cannot be changed again.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
