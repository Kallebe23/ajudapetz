"use client";
import { useEffect, useState } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { MdCheck } from "react-icons/md";
// import { FaCheck } from "react-icons/fa";

interface Props extends Omit<PatternFormatProps, "format"> {
  isPhoneVerified: Boolean;
  userPhone: string | null;
}

export default function PhoneInput({
  isPhoneVerified,
  userPhone,
  ...props
}: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (userPhone) {
      setValue(userPhone);
    }
  }, [userPhone]);
  return (
    <div>
      <div className="flex gap-2 items-center">
        <PatternFormat
          {...props}
          value={value}
          onValueChange={(values) => setValue(values.value)}
          format="(##) #####-####"
          mask="_"
          customInput={Input}
          id="phone"
        />
        {/* {userPhone?.replace(/\D/g, "") === value.replace(/\D/g, "") &&
          !isPhoneVerified && (
            <Button variant="outline" asChild>
              <a href={`/verify-phone`}>Verificar</a>
            </Button>
          )} */}
      </div>
      {/* {userPhone?.replace(/\D/g, "") === value.replace(/\D/g, "") &&
        isPhoneVerified && (
          <div className="flex items-center gap-2 mt-1">
            <FaCheck className="h-4 w-4" color="green" />
            <p className="text-sm text-green-700">Telefone validado</p>
          </div>
        )} */}
    </div>
  );
}
