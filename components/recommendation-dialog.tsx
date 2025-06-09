"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X, Edit3, Eye, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

interface Trainee {
  id: string
  name: string
  email: string
  progress: number
  installation: string
  phoneNumber: string
  department: string
  trainingType: string
  status?: "pending" | "approved" | "denied"
}

interface RecommendationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainee: Trainee | null
  userRole: string
}

export function RecommendationDialog({ open, onOpenChange, trainee, userRole }: RecommendationDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [recommendation, setRecommendation] = useState("")
  const [tempRecommendation, setTempRecommendation] = useState("")
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const { toast } = useToast()

  // Load existing recommendation when dialog opens
  useEffect(() => {
    if (open && trainee && typeof window !== "undefined") {
      const existingRecommendation = localStorage.getItem(`recommendation_${trainee.id}`) || ""
      const lastUpdate = localStorage.getItem(`recommendation_date_${trainee.id}`)
      setRecommendation(existingRecommendation)
      setTempRecommendation(existingRecommendation)
      setLastUpdated(lastUpdate)

      // If SuperAdmin and no recommendation exists, start in edit mode
      if (userRole === "superadmin" && !existingRecommendation) {
        setIsEditing(true)
      }
    }
  }, [open, trainee, userRole])

  if (!trainee) return null

  const handleSave = () => {
    // Save to localStorage (in real app, this would be an API call)
    if (typeof window !== "undefined") {
      localStorage.setItem(`recommendation_${trainee.id}`, tempRecommendation)
      localStorage.setItem(`recommendation_date_${trainee.id}`, new Date().toISOString())
    }

    setRecommendation(tempRecommendation)
    setLastUpdated(new Date().toISOString())
    setIsEditing(false)

    toast({
      title: "Recommendation saved",
      description: "The recommendation has been saved successfully.",
    })
  }

  const handleCancel = () => {
    setTempRecommendation(recommendation)
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRecommendationStatus = () => {
    if (!recommendation) return "No recommendation"
    if (recommendation.length < 50) return "Brief recommendation"
    if (recommendation.length < 200) return "Detailed recommendation"
    return "Comprehensive recommendation"
  }

  const getStatusColor = () => {
    if (!recommendation) return "bg-gray-100 text-gray-800"
    if (recommendation.length < 50) return "bg-yellow-100 text-yellow-800"
    if (recommendation.length < 200) return "bg-blue-100 text-blue-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>SuperAdmin Recommendation - {trainee.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trainee Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Image
                  className="h-12 w-12 rounded-full"
                  src="/placeholder.svg?height=48&width=48"
                  alt={trainee.name}
                  width={48}
                  height={48}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{trainee.name}</h3>
                  <div className="text-sm text-gray-500">
                    {trainee.installation} • {trainee.trainingType}
                  </div>
                </div>
                <Badge className={getStatusColor()}>{getRecommendationStatus()}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recommendation</span>
                {userRole === "superadmin" && !isEditing && (
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit3 className="h-4 w-4 mr-2" />
                    {recommendation ? "Edit" : "Add"} Recommendation
                  </Button>
                )}
                {userRole === "admin" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    <Eye className="h-3 w-3 mr-1" />
                    View Only
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRole === "superadmin" && isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={tempRecommendation}
                    onChange={(e) => setTempRecommendation(e.target.value)}
                    placeholder="Enter your recommendation for this trainee. Consider their performance, character, readiness for advancement, areas for improvement, and any specific guidance you would like to provide..."
                    className="min-h-[200px]"
                  />
                  <div className="text-sm text-gray-500">Character count: {tempRecommendation.length}</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendation ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{recommendation}</p>
                    </div>
                  ) : (
                    <div className="p-8 bg-gray-50 rounded-lg text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">No recommendation provided yet</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {userRole === "superadmin"
                          ? "Click 'Add Recommendation' to provide guidance for this trainee."
                          : "The SuperAdmin has not provided a recommendation for this trainee yet."}
                      </p>
                    </div>
                  )}

                  {lastUpdated && recommendation && (
                    <div className="text-xs text-gray-500 border-t pt-3">Last updated: {formatDate(lastUpdated)}</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {recommendation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recommendation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{recommendation.split(" ").length}</div>
                    <div className="text-xs text-gray-500">Words</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{recommendation.length}</div>
                    <div className="text-xs text-gray-500">Characters</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {recommendation.split("\n").filter((line) => line.trim()).length}
                    </div>
                    <div className="text-xs text-gray-500">Paragraphs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {userRole === "superadmin" && isEditing && (
          <DialogFooter>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!tempRecommendation.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Save Recommendation
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
