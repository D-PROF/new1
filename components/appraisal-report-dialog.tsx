"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Download, FileText, Edit3, Save, X, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { TraineeAppraisalViewDialog } from "./trainee-appraisal-view-dialog"

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

interface AppraisalReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainee: Trainee | null
  userRole: string
}

export function AppraisalReportDialog({ open, onOpenChange, trainee, userRole }: AppraisalReportDialogProps) {
  const [isEditingRecommendation, setIsEditingRecommendation] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [tempRecommendation, setTempRecommendation] = useState("")
  const { toast } = useToast()
  const [viewingFormType, setViewingFormType] = useState<string | null>(null)
  const [formViewDialogOpen, setFormViewDialogOpen] = useState(false)

  // Load existing recommendation when dialog opens
  useEffect(() => {
    if (open && trainee && typeof window !== "undefined") {
      // In a real app, this would fetch from an API
      const existingRecommendation = localStorage.getItem(`recommendation_${trainee.id}`) || ""
      setRecommendation(existingRecommendation)
      setTempRecommendation(existingRecommendation)
    }
  }, [open, trainee])

  if (!trainee) return null

  const handleDownloadReport = () => {
    console.log("Downloading appraisal report for:", trainee.name)
    toast({
      title: "Report download started",
      description: "Your report is being prepared for download.",
    })
  }

  const handleSaveRecommendation = () => {
    // In a real app, this would save to an API
    if (typeof window !== "undefined") {
      localStorage.setItem(`recommendation_${trainee.id}`, tempRecommendation)
    }
    setRecommendation(tempRecommendation)
    setIsEditingRecommendation(false)
    toast({
      title: "Recommendation saved",
      description: "The recommendation has been saved successfully.",
    })
  }

  const handleCancelEdit = () => {
    setTempRecommendation(recommendation)
    setIsEditingRecommendation(false)
  }

  const handleViewForm = (formType: string) => {
    setViewingFormType(formType)
    setFormViewDialogOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Appraisal Report - {trainee.name}</span>
              </DialogTitle>
              <Button onClick={handleDownloadReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Individual Appraisal Forms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>Mentor Appraisal</span>
                    <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleViewForm("mentor")}>
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>Submitted by: Pastor Temple Omolehin</p>
                      <p className="text-gray-500">Date: 2024-01-15</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>HOI Appraisal</span>
                    <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleViewForm("hoi")}>
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>Submitted by: Pastor Omolara Omolehin</p>
                      <p className="text-gray-500">Date: 2024-01-18</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>Central Appraisal</span>
                    <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={() => handleViewForm("central")}>
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>Submitted by: Pastor Micheal Jackson</p>
                      <p className="text-gray-500">Date: 2024-01-20</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>Department Appraisal</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={() => handleViewForm("department")}
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p>Submitted by: Pastor Temple Omolehin</p>
                      <p className="text-gray-500">Date: 2024-01-22</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SuperAdmin Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>SuperAdmin Recommendations</span>
                  {userRole === "superadmin" && !isEditingRecommendation && (
                    <Button onClick={() => setIsEditingRecommendation(true)} variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-2" />
                      {recommendation ? "Edit" : "Add"} Recommendation
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userRole === "admin" ? (
                  // Admin view - read-only
                  <div className="space-y-2">
                    {recommendation ? (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{recommendation}</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">No recommendations provided by SuperAdmin yet.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // SuperAdmin view - editable
                  <div className="space-y-4">
                    {isEditingRecommendation ? (
                      <div className="space-y-4">
                        <Textarea
                          value={tempRecommendation}
                          onChange={(e) => setTempRecommendation(e.target.value)}
                          placeholder="Enter your recommendations for this trainee..."
                          className="min-h-[120px]"
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveRecommendation} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Recommendation
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {recommendation ? (
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{recommendation}</p>
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg text-center">
                            <p className="text-sm text-gray-500">No recommendations added yet.</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Click "Add Recommendation" to provide guidance for this trainee.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Form View Dialog */}
      {trainee && (
        <TraineeAppraisalViewDialog
          open={formViewDialogOpen}
          onOpenChange={setFormViewDialogOpen}
          trainee={trainee}
          initialTab={viewingFormType || undefined}
        />
      )}
    </>
  )
}
