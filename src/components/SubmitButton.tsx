"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending}>
      {props.children}
    </Button>
  );
}
