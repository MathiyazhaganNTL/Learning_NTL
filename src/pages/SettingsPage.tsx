
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  User, Lock, Bell, Shield, LogOut, Globe, Moon, Sun, Smartphone,
  MapPin, Briefcase, GraduationCap, Laptop, Eye, AlertCircle,
  CreditCard, CheckCircle2, RotateCcw, Camera, Mail, LayoutDashboard
} from 'lucide-react';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    displayName: user?.name || '',
    username: user?.name?.toLowerCase().replace(/\s/g, '') || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    bio: 'Passionate learner and explorer.',
    location: 'New York, USA',
    interests: 'React, Design, AI',
  });

  // Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'utc-5',
    emailNotifs: true,
    pushNotifs: false,
    marketingEmails: false,
    courseUpdates: true,
    securityAlerts: true,
  });

  // Handlers
  const handleProfileUpdate = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Profile updated successfully');
  };

  const handleSecurityUpdate = async () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success('Security settings updated');
    setSecurity(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  const location = useLocation();
  const isBackoffice = location.pathname.startsWith('/backoffice');

  return (
    <div className={cn(
      "container pb-8 max-w-6xl animate-in fade-in duration-500",
      isBackoffice ? "pt-8" : "pt-24"
    )}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information, security, and preferences.
          </p>
        </div>
        <div className="hidden md:block">
          <Badge variant="outline" className="px-3 py-1 text-sm bg-primary/5 border-primary/20 text-primary">
            {user?.role?.toUpperCase() || 'LEARNER'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-[800px] h-auto p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="profile" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm py-2.5">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm py-2.5">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm py-2.5">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm py-2.5">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <TabsTrigger value="role" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm py-2.5">
              <Briefcase className="h-4 w-4 mr-2" />
              Role
            </TabsTrigger>
          )}
        </TabsList>

        {/* PROFILE SECTION */}
        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
          <div className="grid gap-6 md:grid-cols-12">

            {/* Profile Sidebar Card */}
            <Card className="md:col-span-4 h-fit border-primary/10 shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/10" />
              <CardContent className="pt-12 flex flex-col items-center text-center relative">
                <div className="relative group cursor-pointer mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-70 blur group-hover:opacity-100 transition-opacity duration-300" />
                  <Avatar className="h-28 w-28 border-4 border-background relative">
                    <AvatarImage src={user?.avatar || `https://api.dicebear.com/9.x/notionists/svg?seed=${user?.name}&backgroundColor=transparent`} />
                    <AvatarFallback className="text-4xl">{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full border-2 border-background shadow-sm hover:scale-110 transition-transform">
                    <Camera className="h-4 w-4" />
                  </div>
                </div>

                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">@{profile.username}</p>

                <div className="w-full space-y-2 mt-2">
                  <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Role</span>
                    <Badge variant="secondary" className="uppercase text-[10px]">{user?.role || 'Learner'}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Joined</span>
                    <span className="font-medium">Feb 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Edit Form */}
            <Card className="md:col-span-8 border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.email}
                        disabled
                        className="pl-9 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="bg-background/50 min-h-[100px]"
                    placeholder="Tell us a little about yourself"
                  />
                  <p className="text-xs text-muted-foreground text-right">{profile.bio.length}/500 characters</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="pl-9 bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <Input
                      value={profile.interests}
                      onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                      placeholder="e.g. React, Design, Business"
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t bg-muted/20 px-6 py-4">
                <Button onClick={handleProfileUpdate} disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* SECURITY SECTION */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Password & Authentication</CardTitle>
              <CardDescription>Manage your password and 2-factor authentication settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={security.newPassword}
                      onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t bg-muted/20 px-6 py-4">
              <Button onClick={handleSecurityUpdate} disabled={isLoading}>Update Security</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Devices currently logged into your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Laptop className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Windows PC - Chrome</p>
                      <p className="text-xs text-muted-foreground">Active now • New York, USA</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5">Current</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">iPhone 14 - Safari</p>
                      <p className="text-xs text-muted-foreground">Last active 2 hours ago • New York, USA</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive h-8">Revoke</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PREFERENCES SECTION */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Appearance & Locale</CardTitle>
              <CardDescription>Customize how LearnSphere looks and behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={theme}
                    onValueChange={(val: any) => setTheme(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center"><Sun className="mr-2 h-4 w-4" /> Light</div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center"><Moon className="mr-2 h-4 w-4" /> Dark</div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center"><Laptop className="mr-2 h-4 w-4" /> System</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(val) => setPreferences({ ...preferences, language: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(val) => setPreferences({ ...preferences, timezone: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="utc-8">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Tailor your learning experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Course Recommendations</Label>
                  <p className="text-sm text-muted-foreground">Receive personalized course suggestions based on your interests.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your learning progress and badges.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS SECTION */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Course Updates</Label>
                  <p className="text-sm text-muted-foreground">Announcements and updates from courses you're enrolled in.</p>
                </div>
                <Switch
                  checked={preferences.courseUpdates}
                  onCheckedChange={(c) => setPreferences({ ...preferences, courseUpdates: c })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Important security notifications about your account.</p>
                </div>
                <Switch
                  checked={preferences.securityAlerts}
                  onCheckedChange={(c) => setPreferences({ ...preferences, securityAlerts: c })}
                  disabled
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Tips, trends, and promotional offers.</p>
                </div>
                <Switch
                  checked={preferences.marketingEmails}
                  onCheckedChange={(c) => setPreferences({ ...preferences, marketingEmails: c })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROLE SECTION (Conditional) */}
        {(user?.role === 'instructor' || user?.role === 'admin') && (
          <TabsContent value="role" className="space-y-6">
            <Card className="border-primary/10 shadow-sm bg-gradient-to-br from-background to-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Instructor Dashboard</CardTitle>
                    <CardDescription>Overview of your role permissions and status.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-background/60 rounded-xl border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Current Role</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="text-lg py-1 px-4">{user?.role?.toUpperCase()}</Badge>
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  </div>
                  <div className="p-4 bg-background/60 rounded-xl border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Verification Status</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-emerald-600">Verified</span>
                      <Shield className="h-5 w-5 text-emerald-500" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Permissions Active</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    {['Course Creation', 'Analytics Access', 'Student Management', 'Content Moderation'].map((perm) => (
                      <div key={perm} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        {perm}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

      </Tabs>
    </div>
  );
}
