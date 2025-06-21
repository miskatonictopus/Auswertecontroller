// src/components/SubjectCodeInput.tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp"
import { useState, useEffect } from "react"

export function SubjectCodeInput({ onCodigoChange }: { onCodigoChange: (codigo: string) => void }) {
  const [code, setCode] = useState("")

  useEffect(() => {
    onCodigoChange(code)
  }, [code])

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">Código</label>
      <InputOTP maxLength={4} value={code} onChange={setCode}>
        <InputOTPGroup>
          {Array.from({ length: 4 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="font-extralight text-xs text-zinc-400">Introduce el código de asignatura</p>
    </div>
  )
}
