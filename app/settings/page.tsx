"use client"

import { useEffect, useState } from "react"
import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [userRole, setUserRole] = useState<string>("leadership")
  const { toast } = useToast()

  useEffect(() => {
    // Get user role from localStorage
    const storedUserRole = localStorage.getItem("userRole")
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [])

  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: "Pastor Temple Omolehin",
    email: "temple@wordsanctuary.org",
    phone: "+2348132286990",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assessmentReminders: true,
    resultNotifications: true,
    systemUpdates: false,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
  })

  // System settings (admin only)
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: "daily",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityToggle = (setting: keyof typeof securitySettings) => {
    if (typeof securitySettings[setting] === "boolean") {
      setSecuritySettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
    }
  }

  const handleSystemToggle = (setting: keyof typeof systemSettings) => {
    if (typeof systemSettings[setting] === "boolean") {
      setSystemSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
    }
  }

  const handleSystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSystemSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <RoleGuard allowedRoles={["leadership", "admin", "superadmin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole={userRole} />

        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <Tabs defaultValue="profile" className="mb-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                {(userRole === "admin" || userRole === "superadmin") && (
                  <TabsTrigger value="system">System</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="profile" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileSettings.name} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileSettings.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={profileSettings.phone} onChange={handleProfileChange} />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Assessment Reminders</p>
                        <p className="text-sm text-gray-500">Get reminders about upcoming assessments</p>
                      </div>
                      <Switch
                        checked={notificationSettings.assessmentReminders}
                        onCheckedChange={() => handleNotificationToggle("assessmentReminders")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Result Notifications</p>
                        <p className="text-sm text-gray-500">Be notified when new results are available</p>
                      </div>
                      <Switch
                        checked={notificationSettings.resultNotifications}
                        onCheckedChange={() => handleNotificationToggle("resultNotifications")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Updates</p>
                        <p className="text-sm text-gray-500">Receive notifications about system updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={() => handleNotificationToggle("systemUpdates")}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <select
                        id="sessionTimeout"
                        name="sessionTimeout"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="120">120 minutes</option>
                      </select>
                    </div>
                    <div className="pt-4 space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {(userRole === "admin" || userRole === "superadmin") && (
                <TabsContent value="system" className="pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                      <CardDescription>Manage system-wide settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Maintenance Mode</p>
                          <p className="text-sm text-gray-500">
                            Put the system in maintenance mode (only admins can access)
                          </p>
                        </div>
                        <Switch
                          checked={systemSettings.maintenanceMode}
                          onCheckedChange={() => handleSystemToggle("maintenanceMode")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Debug Mode</p>
                          <p className="text-sm text-gray-500">Enable detailed error messages and logging</p>
                        </div>
                        <Switch
                          checked={systemSettings.debugMode}
                          onCheckedChange={() => handleSystemToggle("debugMode")}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Automatic Backups</p>
                          <p className="text-sm text-gray-500">Automatically backup system data</p>
                        </div>
                        <Switch
                          checked={systemSettings.autoBackup}
                          onCheckedChange={() => handleSystemToggle("autoBackup")}
                        />
                      </div>
                      {systemSettings.autoBackup && (
                        <div className="space-y-2 ml-6">
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <select
                            id="backupFrequency"
                            name="backupFrequency"
                            value={systemSettings.backupFrequency}
                            onChange={handleSystemChange}
                            className="w-full p-2 border rounded"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>

            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">Settings content will be available soon.</p>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
