"use client";
import { useEffect, useState } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

export default function CEPInput(props: Omit<PatternFormatProps, "format">) {
  const [value, setValue] = useState("");
  const [cepInfo, setCEPInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (value.length === 8) {
          const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
          const data = await res.json();
          if (data.erro) {
            setCEPInfo(`CEP não encontrado`);
          } else {
            setCEPInfo(
              `${data.logradouro} ${data.complemento} - ${data.bairro} ${data.localidade} - ${data.uf}`,
            );
          }
        }
      } catch (error) {
        setCEPInfo("CEP Inválido");
      } finally {
        setLoading(false);
      }
    })();
  }, [value, props.defaultValue]);

  useEffect(() => {
    setValue(String(props.defaultValue));
  }, [props.defaultValue]);

  return (
    <div className="flex flex-col gap-2">
      <PatternFormat
        {...props}
        value={value}
        onValueChange={(values) => {
          setValue(values.value);
        }}
        format="#####-###"
        mask="_"
        customInput={Input}
        id="CEP"
      />
      {loading && <Skeleton className="h-8 w-[250px]" />}
      {!loading && !!cepInfo && <Label htmlFor="CEP">{cepInfo}</Label>}
    </div>
  );
}
