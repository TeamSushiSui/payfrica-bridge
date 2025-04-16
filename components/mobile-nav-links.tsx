import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden flex">
        <Button variant="secondary">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only" />
        NavLinks
      </SheetContent>
    </Sheet>
  );
};
