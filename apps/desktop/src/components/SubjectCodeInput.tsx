// src/components/SubjectCodeInput.tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useState } from "react"

export function SubjectCodeInput() {
  const [code, setCode] = useState("")

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">código</p>
      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          {Array.from({ length: 4 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Ejemplo: 0612</p>
    </div>
  )
}

