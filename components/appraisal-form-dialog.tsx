"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MentorForm } from "@/components/appraisal-forms/mentor-form"
import { HOIForm } from "@/components/appraisal-forms/hoi-form"
import { CentralForm } from "@/components/appraisal-forms/central-form"
import { useMobile } from "@/hooks/use-mobile"

interface AppraisalFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formType: "mentor" | "hoi" | "central" | "department"
  traineeName?: string
  mode?: "create" | "view" | "edit"
  formId?: string
}

export function AppraisalFormDialog({
  open,
  onOpenChange,
  formType,
  traineeName,
  mode = "create",
  formId,
}: AppraisalFormDialogProps) {
  const isMobile = useMobile()

  const handleClose = () => {
    onOpenChange(false)
  }

  const dialogContentClass = isMobile
    ? "sm:max-w-[95%] p-0 bg-transparent border-none shadow-none max-h-[90vh] overflow-y-auto"
    : "sm:max-w-md md:max-w-lg p-0 bg-transparent border-none shadow-none"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogContentClass}>
        {formType === "mentor" && (
          <MentorForm traineeName={traineeName} onClose={handleClose} mode={mode} formId={formId} />
        )}
        {formType === "hoi" && <HOIForm traineeName={traineeName} onClose={handleClose} mode={mode} formId={formId} />}
        {formType === "central" && (
          <CentralForm traineeName={traineeName} onClose={handleClose} mode={mode} formId={formId} />
        )}
        {formType === "department" && (
          <CentralForm traineeName={traineeName} onClose={handleClose} mode={mode} formId={formId} />
        )}
      </DialogContent>
    </Dialog>
  )
}
