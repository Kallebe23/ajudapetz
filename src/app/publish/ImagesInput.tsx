import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

interface Props {
  selectedFiles: File[];
  onSelectedFilesChange: (newSelectedFiles: File[]) => void;
}

export default function ImagesInput({
  selectedFiles,
  onSelectedFilesChange,
}: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFiles) {
      setPreviews([]);
      return;
    }

    const newPreviews = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const objectUrl = URL.createObjectURL(selectedFiles[i]);
      newPreviews.push(objectUrl);
    }

    setPreviews(newPreviews);

    // free memory when ever this component is unmounted
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [selectedFiles]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onSelectedFilesChange([]);
      return;
    }

    const newSelectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (i > 5) {
        toast.error("Apenas 6 imagens podem ser adicionadas");
        break;
      }
      const f = files[i];
      newSelectedFiles.push(f);
    }

    onSelectedFilesChange(newSelectedFiles);
  };

  const handleRemoveImage = (index: number) => {
    setPreviews(previews.filter((p, i) => i !== index));
    onSelectedFilesChange(selectedFiles.filter((p, i) => i !== index));
  };

  return (
    <div>
      {!selectedFiles.length && (
        <div
          onClick={() => {
            inputRef.current?.click();
          }}
          className="px-2 py-4 rounded-md w-full border-dashed border-2 cursor-pointer"
        >
          <h5 className="text-center text-muted-foreground">
            Clique aqui para adicionar imagens
          </h5>
        </div>
      )}
      <Input
        ref={inputRef}
        multiple
        onChange={onSelectFile}
        id="file"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />
      <div className="flex gap-2 items-center p-2">
        {selectedFiles &&
          previews &&
          previews.map((preview, i) => (
            <div
              className="relative p-2 h-32 w-32 rounded-md overflow-hidden"
              key={preview}
            >
              <Image fill objectFit="cover" alt={preview} src={preview} />
              <Button
                onClick={() => handleRemoveImage(i)}
                className="absolute top-1 right-1 p-1 h-6 w-6"
                variant="outline"
              >
                <MdClose />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
