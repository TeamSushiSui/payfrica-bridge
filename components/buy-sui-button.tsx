"use client";

import { type FC, Fragment, type ReactNode, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  cn,
  formatCurrency,
  getInitials,
  PACKAGE_ID,
  PAYFRICA_AGENTS,
  payfricaBridgeApi,
} from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { agents, paymentDetails } from "@/constants";
import queryString from "query-string";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ConversionFlowCard } from "./conversion-card";
import { ArrowUpDown, CircleAlert, CircleCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { IBestAgent } from "@/types/types";
import { Transaction } from "@mysten/sui/transactions";
import { useWallet } from "@suiet/wallet-kit";
import { useRouter, useSearchParams } from "next/navigation";

//Reference to chat GPT creatimer the timer function https://chatgpt.com

export interface IBuySuiButton {
  className?: string;
  amountToReceive: number;
  amountToSend: number;
  children?: ReactNode;
  inputCoinType: string;
  outputCoinType: string;
  rate: number;
  decimals: number;
}

export const BuySuiButton: FC<IBuySuiButton> = ({
  amountToSend,
  amountToReceive,
  ...props
}) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useState(false);
  const [agentAccount, setAgentAccount] = useState<IBestAgent>();
  const q = useSearchParams();
  const wallet = useWallet();
  const r = useRouter();

  const [clientActions, setClientActions] = useState({
    agentSelected: "",
    userClaimToHaveMadePayment: false,
  });

  const showFooter = false;

  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    // Start timer when step === 1
    if (step === 1) {
      setTimerActive(true);
    } else {
      setTimerActive(false);
      setTimeRemaining(25 * 60); // Reset timer when not on step 1

      if (step === 2) {
        timeOut = setTimeout(() => {
          const o = [2, 3];

          if (clientActions.userClaimToHaveMadePayment) {
            setStep(2);
          } else {
            setStep(Math.floor(Math.random() * o.length));
          }
        }, 5000);
      }
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerActive) {
      // Handle timer expiration
      setTimerActive(false);
      setStep(2);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeRemaining, setOpen]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClose = () => {
    if (step === 1) {
      setOpen(!confirm("Are you sure you want to abort this transaction?"));
      setStep(0);
      return;
    }

    const isPaymentPending = q.get("isPaymentPending");

    if (isPaymentPending === "true") {
      r.push("?isPaymentPending=false");
    }

    setOpen(false);
    setStep(0);
  };

  useEffect(() => {
    const isPaymentPending = q.get("isPaymentPending");

    if (isPaymentPending === "true") {
      setOpen(true);

      setAgentAccount({
        accountBank: q.get("accountBank")!,
        accountName: q.get("accountName")!,
        accountNumber: q.get("accountNumber")!,
        comment: q.get("comment")!,
        id: q.get("id")!,
      });
    }
  }, [q.get("isPaymentPending")]);

  const buy = async () => {
    startTransition(true);

    try {
      const q = queryString.stringify({
        amount: amountToSend,
        outputCoinType: props.outputCoinType,
        inputCoinType: props.inputCoinType,
      });
      const res = await payfricaBridgeApi.get<IBestAgent>(`/agents/best?${q}`);

      setAgentAccount(res.data);

      console.log(res.data.id);

      //setOpen(true);

      props.inputCoinType = `0x${props.inputCoinType}`;
      props.outputCoinType = `0x${props.outputCoinType}`;

      //Calling the smart contract
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::bridge_agents::deposit_requests`,
        arguments: [
          tx.object(PAYFRICA_AGENTS),
          tx.object(res.data.id),
          tx.pure.u64(amountToSend * 10 ** (props.decimals ?? 6)),
          tx.pure.u64(props.rate * 10 ** 6),
          tx.pure.u8(6),
          tx.pure.string(res.data.comment),
          tx.object("0x6"),
        ],
        typeArguments: [props.inputCoinType, props.outputCoinType],
      });

      const txResult = await wallet.signAndExecuteTransaction({
        transaction: tx,
      });

      if (txResult) {
        setOpen(true);

        const q = queryString.stringify({
          ...res.data,
          isPaymentPending: true,
        });
        r.push(`?${q}`);
      } else {
        //Notify the user
      }
    } catch (error) {
      console.log(error);
    } finally {
      startTransition(false);
    }
  };

  const makePayment = (
    <Fragment>
      <DialogHeader className="flex items-center flex-row justify-between">
        <Avatar>
          <AvatarImage
            src={`https://vercel.com/api/www/avatar/${agentAccount?.id}`}
          />
          <AvatarFallback>{getInitials("Lagos")}</AvatarFallback>
        </Avatar>
        <DialogTitle>Make Payment</DialogTitle>
        <div />
      </DialogHeader>
      <Separator />

      <div className="space-y-2 w-full max-w-full overflow-hidden relative  h-full">
        <ConversionFlowCard
          onAmountChange={() => {}}
          onCurrencySelect={() => {}}
          amount={5000}
          hideFooter
          disabled
          disableCurrency
          className="rounded-md w-full h-auto md:h-[8.5rem]"
        />
        <div className="absolute top-0 left-0 w-full flex h-full items-center justify-center pointer-events-none">
          <div className="p-2 bg-[#2C2F33] rounded-full">
            <div className="p-2 bg-[#FFFFFF1A] rounded-full">
              <ArrowUpDown />
            </div>
          </div>
        </div>
        <Separator />
        <ConversionFlowCard
          onAmountChange={() => {}}
          onCurrencySelect={() => {}}
          amount={2.47}
          hideFooter
          disabled
          disableCurrency
          className="rounded-md w-full h-auto md:h-[8.5rem]"
          decimals={0}
        />
      </div>
      <div className=" bg-accent max-w-full w-full space-y-2 p-4 rounded-lg">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h4 className="text-muted-foreground">Account Number</h4>
            <CircleAlert fill="#777777" size={15} className="border-[#777777" />
          </div>
          <p className="font-semibold text-green-500">
            {agentAccount?.accountNumber}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h4 className="text-muted-foreground">Bank Name</h4>
            <CircleAlert fill="#777777" size={15} className="border-[#777777" />
          </div>
          <p className="font-semibold">{agentAccount?.accountBank}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h4 className="text-muted-foreground">Account Name</h4>
            <CircleAlert fill="#777777" size={15} className="border-[#777777" />
          </div>
          <p className="font-semibold text-green-500">
            {agentAccount?.accountName}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h4 className="text-muted-foreground">Estimated Fees</h4>
          </div>
          <p className="font-semibold">
            {formatCurrency(paymentDetails[0].estimatedFees)}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h4 className="text-muted-foreground">Agent Id</h4>
          </div>
          <Link
            target="__blank"
            href={`https://suiscan.xyz/testnet/object/${agentAccount?.id}/`}
            className="font-semibold text-blue-500 underline"
          >
            {paymentDetails[0].destinationAddress}
          </Link>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            setClientActions({
              ...clientActions,
              userClaimToHaveMadePayment: true,
            });
            setStep(2);
          }}
          className="hover:bg-[#5865F2]/80 bg-[#443CC7] text-white w-full md:h-[53px] h-[48px] cursor-pointer"
        >
          I have made this transfer
        </Button>
        <p className="text-center max-w-2xl mx-auto mt-3 text-muted-foreground">
          This account is for this transaction only and expires in{" "}
          <span
            className={cn("text-green-500 font-semibold", {
              "text-red-500": timeRemaining < 300, // Turn red when less than 5 minutes remain
            })}
          >
            {formatTime(timeRemaining)}
          </span>
        </p>
      </div>
    </Fragment>
  );

  const confirmingPayment = (
    <Fragment>
      <DialogHeader className="flex items-center flex-row justify-between">
        <Avatar>
          <AvatarImage src={`https://vercel.com/api/www/avatar/s00laiman`} />
          <AvatarFallback>{getInitials("Lagos")}</AvatarFallback>
        </Avatar>
        <DialogTitle>Confirming Payment</DialogTitle>
        <div />
      </DialogHeader>
      <Separator />
      <div className="h-[20rem] flex items-center justify-center flex-col gap-3">
        <Loader2 size={150} className="animate-spin" />
        <p>Please wait your transaction is being confirmed</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogFooter>
    </Fragment>
  );

  const paymentConfirmed = (
    <Fragment>
      <DialogHeader className="flex items-center flex-row justify-between">
        <Avatar>
          <AvatarImage src={`https://vercel.com/api/www/avatar/s00laiman`} />
          <AvatarFallback>{getInitials("Lagos")}</AvatarFallback>
        </Avatar>
        <DialogTitle>Payment Confirmed</DialogTitle>
        <div />
      </DialogHeader>
      <Separator />
      <div className="h-[20rem] flex items-center justify-center flex-col gap-3">
        <CircleCheck
          //fill="#34D265"
          stroke="#34D265"
          color=""
          size={150}
          className="border-[#34D265]"
        />
        <h2>Payment Successful!</h2>
        <p className="text-muted-foreground">
          The payment was made successfully!
        </p>
      </div>
      <DialogFooter className="flex md:flex-col-reverse">
        <Link
          href={"/"}
          className="text-center underline text-[14px] font-semibold text-[#347DC1BA]"
        >
          View on SUI Vision
        </Link>
        <DialogClose asChild>
          <Button className="w-full">Ok</Button>
        </DialogClose>
      </DialogFooter>
    </Fragment>
  );

  const unableToVerifyPayment = (
    <Fragment>
      <DialogHeader className="flex items-center flex-row justify-between">
        <Avatar>
          <AvatarImage src={`https://vercel.com/api/www/avatar/s00laiman`} />
          <AvatarFallback>{getInitials("Lagos")}</AvatarFallback>
        </Avatar>
        <DialogTitle>Unable to verify payment</DialogTitle>
        <div />
      </DialogHeader>
      <Separator />
      <div className="h-[20rem] flex items-center justify-center flex-col gap-3">
        <CircleAlert
          //fill="#34D265"
          stroke="oklch(79.5% 0.184 86.047)"
          color=""
          size={150}
          className="border-[#34D265]"
        />
        <h2>Payment Failed</h2>
        <p className="text-muted-foreground text-center">
          We are unable to verify your payment, if you believe this is an error
          please contact the support team.
        </p>
      </div>
      <DialogFooter className="flex md:flex-col-reverse">
        <DialogClose asChild>
          <Button className="w-full">Ok</Button>
        </DialogClose>
        <Button variant="secondary" className="w-full">
          Contact support
        </Button>
      </DialogFooter>
    </Fragment>
  );

  const views = [
    makePayment,
    confirmingPayment,
    paymentConfirmed,
    unableToVerifyPayment,
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={async (e) => {
        if (e) {
          await buy();
        } else {
          handleClose();
        }
      }}
    >
      <DialogTrigger asChild>
        {props.children ? (
          props.children
        ) : (
          <Button
            disabled={isPending}
            className={cn("bg-[#5865F2]", props.className)}
          >
            Buy
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={cn("w-full sm:max-w-xl")}>
        {views[step]}
        {showFooter && (
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
