import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";

type props = {
  open: boolean | undefined;
  onClose: (() => void) | undefined;
};

export function UsernameDrawer({ open, onClose }: props) {
  return (
    <Drawer isOpen={open} placement="bottom" onClose={onClose} size="full">
      <DrawerContent>
        <DrawerHeader>Change username</DrawerHeader>

        <DrawerBody>
          <p className="text-sm opacity-80">
            Your username can be changed only once. Our records indicate you
            have already changed it, so it cannot be changed again.
          </p>
        </DrawerBody>

        <DrawerFooter>
          <Button color="primary" fullWidth onPress={onClose}>
            OK
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
