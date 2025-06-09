"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Trainee {
  id: string
  name: string
  email: string
  progress: number
  installation: string
  phoneNumber: string
  department: string
  trainingType: string
}

interface EditTraineeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainee: Trainee | null
  onSave: (updatedTrainee: Trainee) => void
}

export function EditTraineeDialog({ open, onOpenChange, trainee, onSave }: EditTraineeDialogProps) {
  const [formData, setFormData] = useState<Trainee | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const installations = [
    "Offa Garage",
    "Kwasu",
    "Unilorin",
    "Tanke",
    "FUTA",
    "Lagos",
    "Global",
    "FUOYE",
    "COHS",
    "Kwarapoly",
    "Zaria",
    "Ibadan",
    "Abuja",
    "Elizade",
    "Gospel Empire",
    "Unijos",
    "Uniabuja",
    "Unilag",
    "Lekki",
    "USA",
  ]

  const departments = ["Power and Sound", "Choir", "Ushering", "Finance", "Media", "SID"]

  const trainingTypes = ["Executive Assistant", "Assistant HOD", "HOD", "Minister", "Pastor"]

  useEffect(() => {
    if (trainee) {
      setFormData({ ...trainee })
    }
  }, [trainee])

  const handleInputChange = (field: keyof Trainee, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSave(formData)
      toast({
        title: "Trainee updated",
        description: "Trainee information has been updated successfully",
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the trainee information",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Trainee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="installation">Installation</Label>
            <select
              id="installation"
              value={formData.installation}
              onChange={(e) => handleInputChange("installation", e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              {installations.map((installation) => (
                <option key={installation} value={installation}>
                  {installation}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainingType">Training Type</Label>
            <select
              id="trainingType"
              value={formData.trainingType}
              onChange={(e) => handleInputChange("trainingType", e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              {trainingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => handleInputChange("progress", Number.parseInt(e.target.value) || 0)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
