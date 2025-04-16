import { agents } from "@/constants";
import React, { FC } from "react";
import { Card, CardContent } from "./ui/card";
import { User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

export const AvailableAgentCard: FC<
  (typeof agents)[0] & { onAgentSelect: (agent: (typeof agents)[0]) => void }
> = ({ onAgentSelect, ...props }) => {
  return (
    <Card
      onClick={() => onAgentSelect(props)}
      className="rounded-sm py-4 cursor-pointer"
    >
      <CardContent className="flex gap-3">
        <Avatar>
          <AvatarImage src={`https://vercel.com/api/www/avatar/s00laiman`} />
          <AvatarFallback>{getInitials(props.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="font-semibold">{props.name}</h2>
          <p>{props.amountRange}</p>
          <div className="space-x-2">
            {props.badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="rounded-sm font-bold"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
