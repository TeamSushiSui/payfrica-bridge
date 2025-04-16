import React, { FC, ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { MessageSquareDot, Twitter } from "lucide-react";

export const PoolDetails: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pool Details</DialogTitle>
        </DialogHeader>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          praesentium illo facilis provident ducimus dignissimos quidem quaerat
          dolor quos sed, sequi possimus ipsa. Vitae accusamus vel eum nemo
          veritatis voluptatibus?
          <div>
            <h2 className="text-right text-muted-foreground font-bold">
              By BlockChain Bard
            </h2>
          </div>
        </div>
        <DialogFooter className="flex sm:flex-col-reverse gap-3">
          <div className="flex w-full items-center justify-center gap-3">
            <Button size="icon" variant="outline" className="rounded-full">
              <Twitter absoluteStrokeWidth />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <MessageSquareDot absoluteStrokeWidth />
            </Button>
          </div>
          <DialogClose asChild>
            <Button className="w-full">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
