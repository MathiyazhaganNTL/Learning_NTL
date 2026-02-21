
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
    return (
        <div className="space-y-6 p-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                            Customize how LearnFlow looks on your device.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="theme-toggle" className="flex flex-col space-y-1">
                                <span>Theme</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Select your preferred theme for the dashboard.
                                </span>
                            </Label>
                            <div id="theme-toggle">
                                <ModeToggle />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
